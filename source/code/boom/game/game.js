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
        var component = entity.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
        if ( component ){
          this.scene.add( component.object );
        }
        entity.__addToScene = false;
      }

      if ( entity.__dispose ){
        var component = entity.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
        if ( component ){
          entity.dispose();
          this.scene.remove( component.object );
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
    try{
      //Player
      var p = new Boom.Player( this.camera );

      //World
      this.world = new Boom.World();

      //Build world
      this.world.build(this.scene);
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Game.load()');
    }

  }

});