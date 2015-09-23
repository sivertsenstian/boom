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
      case Boom.Constants.Actors.HOSTILE.HOVERBOT:
        entity = new Boom.HoverBot( params );
        Boom.GameGrid.addActor( entity.id, entity.position );
        break;
      case Boom.Constants.Actors.HOSTILE.DRAGON:
        entity = new Boom.Dragon( params );
        Boom.GameGrid.addActor( entity.id, entity.position );
        break;
      case Boom.Constants.Actors.FRIENDLY.PLAYER:
        entity = new Boom.Player( params );
        Boom.GameGrid.addActor( entity.id, entity.position );
        break;

      ///////////// ITEMS /////////////////////
      case Boom.Constants.Items.POWERUP.COMPUTAS:
        entity = new Boom.ComputasPowerup(params);
        Boom.GameGrid.addItem(entity.id, entity.position);
        break;
      case Boom.Constants.Items.POWERUP.HEALTH:
        entity = new Boom.HealthpackPowerup( params );
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;
      case Boom.Constants.Items.POWERUP.BULLET:
      case Boom.Constants.Items.POWERUP.BULLET_LARGE:
        entity = new Boom.BulletPowerup( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;
      case Boom.Constants.Items.POWERUP.PISTOL:
        entity = new Boom.PistolPowerup( params );
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;
      case Boom.Constants.Items.POWERUP.SHELL:
        entity = new Boom.ShellPowerup( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;
      case Boom.Constants.Items.POWERUP.SHOTGUN:
        entity = new Boom.ShotgunPowerup( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;
      case Boom.Constants.Items.POWERUP.RIFLE:
        entity = new Boom.RiflePowerup( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;
      case Boom.Constants.Items.POWERUP.ROCKETLAUNCHER:
        entity = new Boom.RocketLauncherPowerup( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;   
      case Boom.Constants.Items.POWERUP.ROCKET:
        entity = new Boom.RocketPowerup( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
        break;        
      case Boom.Constants.Items.OTHER.END_GOAL:
        entity = new Boom.EndGoal( params ); 
        Boom.GameGrid.addItem( entity.id, entity.position );
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
      case Boom.Constants.Weapon.RIFLE:
        return new Boom.Rifle( params );
      case Boom.Constants.Weapon.ROCKETLAUNCHER:
        return new Boom.RocketLauncher( params );        
      case Boom.Constants.Weapon.HOVERBOTGUN:
        return new Boom.HoverBotGun(params);
      case Boom.Constants.Weapon.DRAGONMOUTH:
        return new Boom.DragonMouth(params);

      ///////////// AMMUNITION /////////////////////
      case Boom.Constants.Ammunition.BULLET:
        return new Boom.Bullet( params );
      case Boom.Constants.Ammunition.SHELL:
        return new Boom.Shell( params );
      case Boom.Constants.Ammunition.ROCKET:
        return new Boom.Rocket( params );        
      case Boom.Constants.Ammunition.HOVERBOTGUNLASER:
        return new Boom.HoverBotGunLaser(params);
      case Boom.Constants.Ammunition.DRAGONFIRE:
        return new Boom.DragonFire(params); 

      ////////////// TRIGGERS /////////////////////
      case Boom.Constants.Triggers.DOOR:
        params.interactable = properties['Boom.INTERACTABLE'] === Boom.Constants.TRUE;
        entity = new Boom.DoorTrigger( params );
        Boom.GameGrid.addTrigger( entity.id, entity.position );
        break;
      case Boom.Constants.Triggers.ENTITY_SPAWN:
        params.interactable = properties['Boom.INTERACTABLE'] === Boom.Constants.TRUE;
        params.entity = properties['Boom.ENTITY'];
        params.quantity = properties['Boom.QUANTITY'];
        entity = new Boom.EntitySpawnTrigger(params);
        Boom.GameGrid.addTrigger( entity.id, entity.position );
        break;
      case Boom.Constants.Triggers.SECRET:
        entity = new Boom.SecretTrigger(params);
        Boom.GameGrid.addTrigger( entity.id, entity.position );
        break;
     case Boom.Constants.Triggers.DOOR_INSTRUCTIONS:
        entity = new Boom.DoorInstructionsTrigger(params);
        Boom.GameGrid.addTrigger(entity.id, entity.position);
        break;

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