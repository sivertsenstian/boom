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
      case Boom.Constants.Actors.ALIEN:
        return new Boom.Alien( params );
        break;
      case Boom.Constants.Actors.PLAYER:
        return new Boom.Player( params );
        break;
      default:
        console.error( 'Actor of type "' + type + '" does not exist!');
        break;
    }
  }
};