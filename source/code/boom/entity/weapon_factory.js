Boom.WeaponFactory = function(){
  this.init();
};

Boom.WeaponFactory.prototype = {
  constructor: Boom.WeaponFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnWeapon: function( type, params ){
    switch( type ){
      case Boom.Constants.Weapon.PISTOL:
        return new Boom.Pistol( params );
      case Boom.Constants.Weapon.SHOTGUN:
        return new Boom.Shotgun( params );
      default:
        console.error( 'Weapon of type "' + type + '" does not exist!');
        break;
    }
  }
};