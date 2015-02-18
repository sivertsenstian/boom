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
    var item = null;
    switch( type ){
      case Boom.Constants.Items.POWERUP.HEALTH:
        item = new Boom.HealthpackPowerup( params );
        break;
      case Boom.Constants.Items.POWERUP.BULLET:
        item = new Boom.BulletPowerup( params ); 
        break;
      case Boom.Constants.Items.POWERUP.PISTOL:
        item = new Boom.PistolPowerup( params );
        break;
      case Boom.Constants.Items.POWERUP.SHELL:
        item = new Boom.ShellPowerup( params ); 
        break;
      case Boom.Constants.Items.POWERUP.SHOTGUN:
        item = new Boom.ShotgunPowerup( params ); 
        break;
      case Boom.Constants.Items.OTHER.END_GOAL:
        item = new Boom.EndGoal( params ); 
        break;
      default:
        console.error( 'Item of type "' + type + '" does not exist!');
        break;
    }
    if(item !== null){
      item.register();
      return item;
    }
    throw Boom.Exceptions.FactoryObjectNotDefinedException;
  }
};