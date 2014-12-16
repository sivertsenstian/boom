Boom.Bullet = function( direction, spawn ){
  this.spawn = spawn;
  this.direction = direction;
  Boom.Entity.call(this, {name: 'AMMO_BulletEntity'});
};

Boom.Bullet.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Bullet,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var scope = this;
    this.speed = 200;
    var physics = new Boom.PhysicalComponent(
       {
        name:'bullet_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.spawn,
        color: 0x00FF00,
        size: .25,
        mass: 1,
        friction: 0,
        restitution: 0,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    //TODO: MAKE THIS INTO COLLISIONACTIONCOMPONENT
    physics.object.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      if( other_object.name !== 'pistol_physics_OBJECT' && other_object.name !== 'player_physics_OBJECT' && other_object.name !== 'bullet_physics_OBJECT'){
        scope.__dispose = true;
      }
    });

    var audio_hit = new Boom.AudioComponent(
      {
        name: 'HIT',
        sound: Boom.Assets.sounds.weapons.gun.hit,
        owner: this
      }
    );
    this.components[audio_hit.name] = audio_hit;
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    var obj = this.getComponent( Boom.Constants.Component.TYPE.PHYSICAL ).object;
    obj.setLinearVelocity({ x: (this.direction.x * this.speed), y: (this.direction.y * this.speed), z: (this.direction.z * this.speed)})
    //this.getObject().setLinearVelocity({ x: (this.direction.x * this.speed), y: (this.direction.y * this.speed), z: (this.direction.z * this.speed)});
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
    this.components.HIT.play();
  }


});
