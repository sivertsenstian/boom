Boom.Bullet = function( direction, spawn ){
  this.spawn = spawn;
  this.direction = direction;
  this.size = .25;
  this.speed = 10;
  this.velocity = new THREE.Vector3(0, 0, 0);
  this.msg = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: null, type: Boom.Constants.Message.Action.VELOCITY, sender: this.name });

  Boom.Entity.call(this, {name: 'AMMO_BulletEntity', is_static: false});
};

Boom.Bullet.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Bullet,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var physics = new Boom.PhysicalComponent(
       {
        name:'bullet_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.spawn,
        color: 0x00FF00,
        size: this.size,
        mass: 1,
        friction: 0,
        restitution: 0,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var collision = new Boom.CollisionActionComponent(
      {
        name: 'BULLET_COLLISION',
        distance: this.size,
        owner: this
      }
    );
    this.components[collision.name] = collision;

    var collision_hit = new Boom.HitActionComponent(
      {
        name: 'BULLET_HIT_COLLISION',
        owner: this
      }
    );
    this.components[collision_hit.name] = collision_hit;

    var audio_hit = new Boom.AudioComponent(
      {
        name: 'BULLET_HIT_AUDIO',
        sound: Boom.Assets.sounds.weapons.gun.hit,
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
    this.components.BULLET_HIT_AUDIO.play();
  }


});
