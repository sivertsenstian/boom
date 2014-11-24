Boom.Game = function() {
  Boom.Base.call(this);

  this.updated = false;
  this.firstLoad = true;
  this.firstPlay = true;
  this.mapWon = false;
  this.restartedLevel = false;
  
  this.antialias = true;
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
    var player = new Boom.Player( this.camera, this.scene );
    player.object.position.set(32, 0, 32);

    //World
    this.world = new Boom.World();

    //Add Actors to world
    this.world.addActor( player );

    //Build world
    this.world.build(this.scene);

  }

});