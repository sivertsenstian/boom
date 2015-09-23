Boom.Dragon = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.size = 6;
  this.height = 0;
  this.onGround = Boom.Constants.FALSE;
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  
  Boom.Entity.call(this, {name: 'ENEMY_DRAGON_Entity', is_static: false, boundingBox: new THREE.Vector3(24, 36, 24), score: 500});
};

Boom.Dragon.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Dragon,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
        
    var health = new Boom.HealthActionComponent({
      name: 'dragon_health',
      value: Boom.randomIntFromInterval(200, 300),
      limit: 300,
      owner: this
        });
    this.components[health.name] = health;

    var death = new Boom.DeathActionComponent({
      name: 'dragon_death',
      owner: this
    });
    this.components[death.name] = death;

    var physics = new Boom.PhysicalComponent(
       {
        name: 'dragon_physics',
        update_collision: true,
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.enemies.dragon,
        position: this.position,
        height: this.height,
        gravity: true,
        owner: this,
        selfShadow: false
      }
    );
    this.components[physics.name] = physics;

    var ai_controls = new Boom.AIInputActionComponent( 
      { 
        object: physics.object, 
        name: 'ai_controls', 
        owner: this 
      } 
    );
    this.components[ai_controls.name] = ai_controls;

    var basic_movement = new Boom.AIMovementActionComponent( 
      { 
        name: 'ai_movement', 
        owner: this, 
        speed: 2.5
      } 
    );
    this.components[basic_movement.name] = basic_movement;

    var collision = new Boom.NeighbourCollisionActionComponent(
      {
        name: 'dragon_collision',
        owner: this
      }
    );
    this.components[collision.name] = collision;

    var gravity = new Boom.GravityActionComponent(
      {
        name: 'dragon_gravity',
        owner: this
      }
    );
    this.components[gravity.name] = gravity;

    var inventory = new Boom.InventoryComponent({
      name: 'dragon_inventory',
      weapon: Boom.Assets.world.ENTITY.DRAGONMOUTH,
      ammo: Boom.Assets.world.ENTITY.DRAGONFIRE,
      weapon_position: new THREE.Vector3(0, 20, 0),
      weapon_rotation: new THREE.Vector3(0 , Math.PI/2, 0),
      weapon_scale: new THREE.Vector3(1 , 1, 1),
      owner: this
    });
    this.components[inventory.name] = inventory;

    var animation_death = new Boom.AnimationComponent( 
      {
        name: "ANIMATION_DEATH",
        object: physics.object,
        position: new THREE.Vector3(0, -10, 0), 
        rotation: new THREE.Vector3(0, -Math.PI, 0), 
        ms: 500,
        permanent: true,
        yoyo: false,
        owner: this
      }
    );
    this.components[animation_death.name] = animation_death;

    var animation_pain = new Boom.AnimationComponent( 
      {
        name: "ANIMATION_PAIN",
        object: physics.object,
        rotation: new THREE.Vector3(0, 0.5, 0),
        permanent: true,
        ms: 100,
        owner: this
      }
    );
    this.components[animation_pain.name] = animation_pain;

    var audio_pain = new Boom.AudioComponent(
      {
        name: 'AUDIO_PAIN',
        sound: Boom.Assets.sounds.hostile.dragon.pain,
        owner: this
      }
    );
    this.components[audio_pain.name] = audio_pain;

    var audio_chase = new Boom.AudioComponent(
      {
        name: 'AUDIO_CHASE',
        sound: Boom.Assets.sounds.hostile.dragon.chase,
        owner: this
      }
    );
    this.components[audio_chase.name] = audio_chase;

    var audio_death = new Boom.AudioComponent(
      {
        name: 'AUDIO_DEATH',
        sound: Boom.Assets.sounds.hostile.dragon.death,
        owner: this
      }
    );
    this.components[audio_death.name] = audio_death;

    this.load();
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    //Call super
    Boom.Entity.prototype.update.call(this);  
  },

  dispose: function(){
    window.setTimeout(function( entity ){ 
      Boom.Entity.prototype.dispose.call(entity);
    }, 
    this.components.ANIMATION_DEATH.ms, this);    
  },

  //Registers the entity as a player-used entity
  process: function(){
    Boom.Constants.UI.PLAYER.STATS.ENEMIES++;
    //Call super
    Boom.Entity.prototype.process.call(this);
  },

  //Adds entity to world-total in statistics
  register: function(){
    Boom.Constants.World.STATS.ENEMIES++;
    //Call super
    Boom.Entity.prototype.register.call(this);
  },

  wakeup: function(){
   this.components.AUDIO_CHASE.play(); 
  }

});
