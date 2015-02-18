Boom.ActorFactory = function(){
  this.init();
};

Boom.ActorFactory.prototype = {
  constructor: Boom.ActorFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnActor: function( type, params ){
    var actor = null;
    switch( type ){
      case Boom.Constants.Actors.HOSTILE.ALIEN:
        actor = new Boom.Alien( params );
        break;
      case Boom.Constants.Actors.FRIENDLY.PLAYER:
        actor = new Boom.Player( params );
        break;
      default:
        console.error( 'Actor of type "' + type + '" does not exist!');
        break;
    }
    if(actor !== null){
      actor.register();
      return actor;
    }
    throw Boom.Exceptions.FactoryObjectNotDefinedException;
  }
};