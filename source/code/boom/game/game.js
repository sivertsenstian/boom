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

    //Update entities
    for (id in Boom.Entities) {
      if (!Boom.Entities.hasOwnProperty(id)) {
          continue;
      }
      var entity = Boom.Entities[id];
      entity.update();

      if( entity.__addToScene ){
        var entObj = entity.getObject();
        if ( entObj ){
          this.scene.add( entObj );
        }
        entity.__addToScene = false;
      }

      if ( entity.__dispose ){
        var entObj = entity.getObject();
        if ( entObj ){
          entity.dispose();
          this.scene.remove( entObj );
          delete Boom.Entities[id];
        }
      }
      
      //console.log(entity);
      //console.log(" ------------- ");
    }

    //Update world
    this.world.update();
  },

  load: function(){
    //Call super
    Boom.Base.prototype.load.call(this);
    
    //Player
    var player = new Boom.Player( this.camera, this.scene );
    
    /*var arrow = this.debug.createHelperArrow(player.object, 2, true);
    player.object.add( arrow );*/

    player.object.position.set(64, 0, 64);

    //World
    this.world = new Boom.World();

    //Add Actors to world
    this.world.addActor( player );

    //Build world
    this.world.build(this.scene);

  }

});