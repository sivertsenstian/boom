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
    switch( type ){
      case Boom.Constants.Entities.ALIEN:
        return new Boom.Alien( params );
        break;
      case Boom.Constants.Entities.PLAYER:
        return new Boom.Player( params );
        break;
      default:
        console.error( 'Entity of type "' + type + '" does not exist!');
        break;
    }
  }
};