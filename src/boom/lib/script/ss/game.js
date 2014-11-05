var Boom;

Boom = Boom || {};

Boom.Game = function() {
  Boom.Base.call(this);

  this.updated = false;
  this.firstLoad = true;
  this.firstPlay = true;
  this.mapWon = false;
  this.restartedLevel = false;
  
  this.antialias = false;
  this.cameraFov = 75;
  this.cameraFar = 2048;
  
  this.showFPS = true;
};

Boom.Game.prototype = Boom.inherit(Boom.Base, {
  constructor: Boom.Game,

  init: function() {
    //Call super
    Boom.Base.prototype.init.call(this);

    //TODO SETUP DEBUG with log, visual debug (x,y,z and GRID and colors etc.)
    // Boom.DebugUI.init();
    //Boom.DebugUI.visible = false;
  },

  update: function(){
    //Call super
    Boom.Base.prototype.update.call(this);

    this.controls.update(this.accumulator);
  },

  load: function(){
    //Call super
    Boom.Base.prototype.load.call(this);

    this.controls = new THREE.FirstPersonControls( this.camera );
    this.controls.movementSpeed = 100;
    this.controls.lookSpeed = 0.20;

    this.scene.add (this.controls.item);

    //World
    var world = new Boom.World();
    world.build(this.scene);
  }

});