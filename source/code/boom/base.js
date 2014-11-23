Boom.Base = function() {
  this.clearColor = Boom.Constants.Colors.CLEAR;
  this.antialias = Boom.Constants.Base.ANTIALIAS;

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  this.cameraFov = Boom.Constants.Base.FOV;
  this.cameraNear = Boom.Constants.Base.NEAR;
  this.cameraFar = Boom.Constants.Base.FAR;
  this.timeStep = Boom.Constants.Base.TIMESTEP;
  this.test
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
    if (this.requestAnimationFrameId !== null) {
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

    //Update tween!
    TWEEN.update();

    this.requestAnimationFrameId = requestAnimationFrame(function() { self.gameLoop(); });
  },

  onResize: function(){
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
};

