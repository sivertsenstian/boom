Boom.Base = function() {
  this.clearColor = Boom.Constants.Colors.CLEAR;
  this.antialias = Boom.Constants.Base.ANTIALIAS;

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  this.cameraFov = Boom.Constants.Base.FOV;
  this.cameraNear = Boom.Constants.Base.NEAR;
  this.cameraFar = Boom.Constants.Base.FAR;
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
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
  
    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.width / this.height, this.cameraNear, this.cameraFar);
    this.camera.name = Boom.Constants.Objects.CAMERA;

    this.scene = new THREE.Scene();
    this.scene.name = Boom.Constants.Objects.SCENE;
    
    //this.debug = new Boom.Debug(this.scene);
    //this.debug.init();

    window.addEventListener("resize", function() { self.onResize(); }, false);
    this.onResize();

    document.body.appendChild(this.renderer.domElement);

    this.renderStats = new Stats();
    this.renderStats.domElement.style.position = 'absolute';
    this.renderStats.domElement.style.left = '0px';
    this.renderStats.domElement.style.top = '0px';
    this.renderStats.domElement.style.border = 'green 1px solid';

    this.updateStats = new Stats();
    this.updateStats.domElement.style.position = 'absolute';
    this.updateStats.domElement.style.left = '85px';
    this.updateStats.domElement.style.top = '0px';
    this.updateStats.domElement.style.border = '1px solid red';

    document.body.appendChild( this.renderStats.domElement );
    document.body.appendChild( this.updateStats.domElement );

    this.load();
  },

  load: function(){
    if (this.requestAnimationFrameId !== null) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }

    this.currentTime = Boom.getCurrentTime();
    this.accumulator = 0.0;

    this.requestAnimationFrameId = 1;
    this.gameLoop();
  },

  update: function(){
    TWEEN.update(); //Update tween!
    this.updateStats.update();
  },

  draw: function(){
    this.renderer.render(this.scene, this.camera);
    this.renderStats.update();
  },

  gameLoop: (function(){
    var loops = 0, skipTicks = 1000 / Boom.Constants.Base.FPS,
        maxFrameSkip = 10,
        nextGameTick = Boom.getCurrentTime();
    return function() {
      if(this.requestAnimationFrameId !== null){
        var self = this;
        loops = 0;
        while (Boom.getCurrentTime() > nextGameTick) {
          this.update();
          nextGameTick += skipTicks;
          loops++;
        }
        if(loops){
          this.draw();
        }
        
        this.requestAnimationFrameId = requestAnimationFrame( function(){ self.gameLoop() });
      }
    }
  })(),

  onResize: function(){
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
};

