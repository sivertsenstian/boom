Boom.EntityFactory = function(){
  this.init();
};

Boom.EntityFactory.prototype = {
  constructor: Boom.EntityFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnEntity: function( type, params ){
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