Boom.AmmunitionFactory = function(){
  this.init();
};

Boom.AmmunitionFactory.prototype = {
  constructor: Boom.AmmunitionFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnAmmunition: function( type, params ){
    switch( type ){
      case Boom.Constants.Ammunition.BULLET:
        return new Boom.Bullet( params );
        break;
      default:
        console.error( 'Ammunition of type "' + type + '" does not exist!');
        break;
    }
  }
};