Boom.ItemFactory = function(){
  this.init();
};

Boom.ItemFactory.prototype = {
  constructor: Boom.ItemFactory,

  init: function(){
  },

  load: function(){

  },

  update: function(){
    
  },

  spawnItem: function( type, params ){
    switch( type ){
      case Boom.Constants.Items.HEALTHPACK_POWERUP:
        return new Boom.HealthpackPowerup( params );
      case Boom.Constants.Items.BULLET_POWERUP:
        return new Boom.BulletPowerup( params ); 
      case Boom.Constants.Items.PISTOL_POWERUP:
        return new Boom.PistolPowerup( params );
      case Boom.Constants.Items.SHELL_POWERUP:
        return new Boom.ShellPowerup( params ); 
      case Boom.Constants.Items.SHOTGUN_POWERUP:
        return new Boom.ShotgunPowerup( params ); 
      case Boom.Constants.Items.END_GOAL:
        return new Boom.EndGoal( params ); 
      default:
        console.error( 'Item of type "' + type + '" does not exist!');
        break;
    }
  }
};