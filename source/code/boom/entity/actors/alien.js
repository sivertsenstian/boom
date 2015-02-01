Boom.Alien = function( params ){
  this.size = 6;
  this.height = 24;
  this.onGround = Boom.Constants.FALSE;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  Boom.Entity.call(this, {name: 'ENEMY_ALIEN_Entity', is_static: false, boundingBox: new THREE.Vector3(24, 48, 24)});
};

Boom.Alien.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Alien,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var health = new Boom.HealthActionComponent({
      name: 'alien_health',
      owner: this
    });
    this.components[health.name] = health;

    var death = new Boom.DeathActionComponent({
      name: 'alien_death',
      owner: this
    });
    this.components[death.name] = death;

    var physics = new Boom.PhysicalComponent(
       {
        name: 'alien_physics',
        shape: Boom.Constants.Component.MODEL, 
        model: Boom.Assets.enemies.alien,
        position: this.position,
        height: this.height,
        gravity: true,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var collision = new Boom.NeighbourCollisionActionComponent(
      {
        name: 'alien_collision',
        distance: this.size,
        owner: this
      }
    );
    this.components[collision.name] = collision;

    var gravity = new Boom.GravityActionComponent(
      {
        name: 'alien_gravity',
        owner: this
      }
    );
    this.components[gravity.name] = gravity;

    var weapon = new Boom.WeaponActionComponent({
      name: 'alien__weapon',
      owner: this
    });
    this.components[weapon.name] = weapon;

    var audio_death = new Boom.AudioComponent(
      {
        name: 'AUDIO_DEATH',
        sound: Boom.Assets.sounds.hostile.death,
        volume: 0.15,
        owner: this
      }
    );
    this.components[audio_death.name] = audio_death;

    var audio_pain = new Boom.AudioComponent(
      {
        name: 'AUDIO_PAIN',
        sound: Boom.Assets.sounds.hostile.pain,
        volume: 0.05,
        owner: this
      }
    );
    this.components[audio_pain.name] = audio_pain;

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
    this.components.AUDIO_DEATH.play();
    //Call super
    Boom.Entity.prototype.dispose.call(this);
  }


});
