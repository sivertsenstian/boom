Boom.Bullet = function( direction, spawn ){
  this.spawn = spawn;
  this.direction = direction;
  this.size = 1;
  Boom.Entity.call(this, {name: 'AMMO_BulletEntity', is_static: false});
};

Boom.Bullet.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Bullet,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    this.speed = 5;
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

   /* var collision = new Boom.CollisionActionComponent(
      {
        name: 'bullet_collision',
        distance: this.size,
        owner: this
      }
    );
    this.components[collision.name] = collision;*/

    var audio_hit = new Boom.AudioComponent(
      {
        name: 'HIT',
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
    /*var collision = this.getComponent( 'bullet_collision' );
    var velocity = new THREE.Vector3(this.direction.x * this.speed,this.direction.y * this.speed,this.direction.z * this.speed);
    var collision_action_msg = { receiver: Boom.Constants.Component.TYPE.ACTION, data: velocity, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type };
    this.send( collision_action_msg );*/
    this.components['bullet_physics'].velocity.set(this.direction.x * this.speed,this.direction.y * this.speed,this.direction.z * this.speed);
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
    this.components.HIT.play();
  }


});
