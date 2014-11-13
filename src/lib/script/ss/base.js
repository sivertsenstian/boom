var Boom;

Boom = Boom || {};

Boom.Constants = {
  World:{
    WIDTH: 32,
    HEIGHT: 32,
    SIZE: 24,
    GRAVITY: new THREE.Vector3(0, -100, 0)

  },
  
  Objects:{
    FLOOR: 0,
    SKYBOX: 1,
    WALL: 2,
    COLLECTION: 3,
    FOG: 66,
    GRAVITY: 77,
    LIGHT: 88,
    DEBUG: 99,
    RENDERER: 198,
    CAMERA: 199,
    SCENE: 200

  },

  Debug:{
    FLOOR: function(){ 
      var t = new THREE.ImageUtils.loadTexture( '/boom/lib/resources/DEBUG/floor.png' );
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set( Boom.Constants.World.WIDTH, Boom.Constants.World.HEIGHT );
      return new THREE.MeshBasicMaterial( { map: t, side: THREE.DoubleSide });
    },
    WALL: function(){ return new THREE.MeshBasicMaterial({color: 0xFF00FF, wireframe: true})},
    SKYBOX: function(){ return new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe: true})}
  },

  Colors:{
    DEFAULT: 0x00FF00,
    X: 0xFF0000,
    Y: 0x00FF00,
    Z: 0x0000FF,
  },


};

Boom.inherit = function(classObj, members) {
  var base = Object.create(classObj.prototype);

  Object.getOwnPropertyNames(members).forEach(function(prop) {
    var desc = Object.getOwnPropertyDescriptor(members, prop);

    if (desc.get !== undefined) {
      base.__defineGetter__(prop, desc.get);
    } else {
      base[prop] = members[prop];
    }

    if (desc.set !== undefined) {
      base.__defineSetter__(prop, desc.set);
    }
  });
  
  return base;
};

Boom.bind = function( scope, fn ) {

  return function () {

    fn.apply( scope, arguments );

  };

};

Boom.getCurrentTime = function(){
  return Date.now();
};

Boom.msToFrames = function(ms) {
  return Math.round(ms / 16.66);
};

Boom.Base = function() {
  this.clearColor = 0x000000;
  this.antialias = true;

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  this.cameraFov = 90;
  this.cameraNear = 0.1;
  this.cameraFar = 1000;
  this.timeStep = 0.01666;

  this.requestAnimationFrameId = null;
};

Boom.Base.prototype = {
  constructor: Boom.Base,
  
  init: function(){
    var self = this;

    $(document).on("contextmenu", function(){
      return false;
    });

    this.renderer = new THREE.WebGLRenderer({ antialias: this.antialias });
    this.renderer.setClearColor(this.clearColor, 1);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.id = "game-canvas";
  
    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.width / this.height, this.cameraNear, this.cameraFar);
    this.camera.name = Boom.Constants.Objects.CAMERA;

    this.scene = new Physijs.Scene();
    this.scene.name = Boom.Constants.Objects.SCENE;

    this.debug = new Boom.Debug(this.scene);
    this.debug.init();

    window.addEventListener("resize", function() { self.onResize(); }, false);
    this.onResize();

    document.body.appendChild(this.renderer.domElement);

    this.load();
  },

  load: function(){
    if (this.requestAnimationFrameId != null) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }

    this.currentTime = Boom.getCurrentTime();
    this.accumulator = 0.0;

    this.gameLoop();
  },

  update: function(){
    this.scene.simulate(); // run physics
  },

  draw: function(){
    this.renderer.render(this.scene, this.camera);
  },

  gameLoop: function(){
    var self = this;

    var newTime = Boom.getCurrentTime();
    var frameTime = (newTime - this.currentTime) / 1000;
    if (frameTime > 0.33) {
      frameTime = 0.33;
    }
    this.currentTime = newTime;
    this.accumulator += frameTime;

    while (this.accumulator >= this.timeStep) {
      this.update();
      this.debug.fpsCounter.updates++;

      this.accumulator -= this.timeStep;
    }
    this.draw();
    this.debug.fpsCounter.frames++;

    if (newTime - this.debug.fpsCounter.currentTime >= 1000) {
      this.debug.fpsCounter.updateRate = this.debug.fpsCounter.updates;
      this.debug.fpsCounter.frameRate = this.debug.fpsCounter.frames;
      this.debug.fpsCounter.updates = 0;
      this.debug.fpsCounter.frames = 0;
      this.debug.fpsCounter.currentTime = newTime;

      this.debug.update();
    }

    this.requestAnimationFrameId = requestAnimationFrame(function() { self.gameLoop(); });
  },

  onResize: function(){
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
};

