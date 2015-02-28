Boom.Rocket = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.spawn = params.spawn;
  this.direction = params.direction;
  this.size = 2;
  this.speed = 15;
  this.damage = 50;
  this.velocity = new THREE.Vector3(0, 0, 0);
  this.msg = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: null, type: Boom.Constants.Message.Action.VELOCITY, sender: this.name });
  
  Boom.Entity.call(this, {name: 'AMMO_RocketEntity', is_static: false, faction: params.faction, score: 0});
};

Boom.Rocket.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Rocket,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var physics = new Boom.PhysicalComponent(
       {
        name:'rocket_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.spawn,
        color: 0xFF6600,
        size: this.size,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var collision = new Boom.AreaActorCollisionActionComponent(
      {
        name: 'ROCKET_COLLISION',
        owner: this
      }
    );
    this.components[collision.name] = collision;

    var rocket_hit = new Boom.DisposeHitComponent(
      {
        name: 'ROCKET_HIT',
        owner: this
      }
    );
    this.components[rocket_hit.name] = rocket_hit;

    var audio_hit = new Boom.AudioComponent(
      {
        name: 'ROCKET_HIT_AUDIO',
        sound: Boom.Assets.sounds.ammunition.rocket.hit,
        owner: this
      }
    );
    this.components[audio_hit.name] = audio_hit;

    this.load();
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    this.velocity.set(this.direction.x * this.speed, this.direction.y * this.speed, this.direction.z * this.speed);
    if( this.velocity.length() !== 0 ){
      this.msg.data = this.velocity;
      this.send( this.msg );
    }
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
    this.components.ROCKET_HIT_AUDIO.play();
  }


});
