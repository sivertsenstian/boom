var Boom;

Boom = Boom || {};

Boom.Constants = {
  World:{
    WIDTH: 32,
    HEIGHT: 32,
    SIZE: 24,

  },

  Colors:{
    DEFAULT: 0x00FF00
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

  this.fpsCounter = {
    updateRate: 0,
    frameRate: 0,
    updates: 0,
    frames: 0,
    currentTime: this.getCurrentTime(),
  };

  this.requestAnimationFrameId = null;

  Physijs.scripts.worker = '/boom/lib/script/vendor/physijs_worker.js';
  Physijs.scripts.ammo = '/boom/lib/script/vendor/ammo.js';
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
    this.scene = new Physijs.Scene();

    window.addEventListener("resize", function() { self.onResize(); }, false);
    this.onResize();

    document.body.appendChild(this.renderer.domElement);

    this.load();
  },

  load: function(){
    if (this.requestAnimationFrameId != null) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }

    this.currentTime = this.getCurrentTime();
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
    this.stats.begin();

    var newTime = this.getCurrentTime();
    var frameTime = (newTime - this.currentTime) / 1000;
    if (frameTime > 0.33) {
      frameTime = 0.33;
    }
    this.currentTime = newTime;
    this.accumulator += frameTime;

    while (this.accumulator >= this.timeStep) {
      this.update();
      this.fpsCounter.updates++;

      this.accumulator -= this.timeStep;
    }
    this.draw();
    this.fpsCounter.frames++;

    if (newTime - this.fpsCounter.currentTime >= 1000) {
      this.fpsCounter.updateRate = this.fpsCounter.updates;
      this.fpsCounter.frameRate = this.fpsCounter.frames;
      this.fpsCounter.updates = 0;
      this.fpsCounter.frames = 0;
      this.fpsCounter.currentTime = newTime;

      //Boom.DebugUI.trackNumericValue("fps", this.fpsCounter.frameRate);
    }

    this.stats.end();
    this.requestAnimationFrameId = requestAnimationFrame(function() { self.gameLoop(); });
  },

  onResize: function(){
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  },

  getCurrentTime: function(){
    return Date.now();
  },

  set showFPS(value){
    //Boom.DebugUI.setStaticLineVisibility("fps", value);
  },

  get showFPS(){
    //return Boom.DebugUI.getStaticLineVisibility("fps");
  }

};

