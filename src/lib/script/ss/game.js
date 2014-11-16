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

  //Game Components
  this.world;
};

Boom.Game.prototype = Boom.inherit(Boom.Base, {
  constructor: Boom.Game,

  init: function() {
    //Call super
    Boom.Base.prototype.init.call(this);
  },

  update: function(){
    //Call super
    Boom.Base.prototype.update.call(this);

    //Update world
    this.world.update();
  },

  load: function(){
    //Call super
    Boom.Base.prototype.load.call(this);
    
    //Player
    var player = new Boom.Player( this.camera );
    player.entity.position.set(200, 10, 200);

    //World
    this.world = new Boom.World();

    //Add Actors to world
    this.world.addActor( player );

    //Build world
    this.world.build(this.scene);
  }

});