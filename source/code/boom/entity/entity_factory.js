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

  spawn: function( type, params, properties ){
    var entity = null;
    switch( type ){
      ///////////// ACTORS /////////////////////
      case Boom.Constants.Actors.HOSTILE.ALIEN:
        entity = new Boom.Alien( params );
        break;
      case Boom.Constants.Actors.FRIENDLY.PLAYER:
        entity = new Boom.Player( params );
        break;

      ///////////// ITEMS /////////////////////
      case Boom.Constants.Items.POWERUP.HEALTH:
        entity = new Boom.HealthpackPowerup( params );
        break;
      case Boom.Constants.Items.POWERUP.BULLET:
        entity = new Boom.BulletPowerup( params ); 
        break;
      case Boom.Constants.Items.POWERUP.PISTOL:
        entity = new Boom.PistolPowerup( params );
        break;
      case Boom.Constants.Items.POWERUP.SHELL:
        entity = new Boom.ShellPowerup( params ); 
        break;
      case Boom.Constants.Items.POWERUP.SHOTGUN:
        entity = new Boom.ShotgunPowerup( params ); 
        break;
      case Boom.Constants.Items.OTHER.END_GOAL:
        entity = new Boom.EndGoal( params ); 
        break;

      ///////////// LIGHTS /////////////////////
      case Boom.Constants.Lights.AMBIENT:
        params.color = properties['Boom.COLOR'];
        return new Boom.AmbientLight( params );
      case Boom.Constants.Lights.DIRECTIONAL:
        params.color = properties['Boom.COLOR'];
        params.intensity = properties['Boom.INTENSITY'];
        return new Boom.DirectionalLight( params );
      case Boom.Constants.Lights.HEMISPHERE:
        params.color_ground = properties['Boom.COLOR_GROUND'];
        params.color_sky = properties['Boom.COLOR_SKY'];
        params.intensity = properties['Boom.INTENSITY'];
        return new Boom.HemisphereLight( params );
      case Boom.Constants.Lights.POINT:
        params.color = properties['Boom.COLOR'];
        params.intensity = properties['Boom.INTENSITY'];
        params.distance = properties['Boom.DISTANCE'];
        return new Boom.PointLight( params );

      ///////////// WEAPONS /////////////////////
      case Boom.Constants.Weapon.PISTOL:
        return new Boom.Pistol( params );
      case Boom.Constants.Weapon.SHOTGUN:
        return new Boom.Shotgun( params );

      ///////////// AMMUNITION /////////////////////
      case Boom.Constants.Ammunition.BULLET:
        return new Boom.Bullet( params );
      case Boom.Constants.Ammunition.SHELL:
        return new Boom.Shell( params ); 


      default:
        console.error( 'Entity of type "' + type + '" does not exist!');
        break;
    }

    //Try to register entity
    if(entity !== null){
      entity.register();
      return entity;
    }
    throw Boom.Exceptions.FactoryObjectNotDefinedException;
  }
};