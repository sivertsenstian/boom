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
        type: Boom.Constants.Component.BOX,
        position: this.spawn,
        color: 0x00FF00,
        size: .25,
        mass: 1,
        friction: 0,
        restitution: 0
      }
    );
    this.components[physics.name] = physics;

    this.getObject().addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      if( other_object.name !== Boom.Constants.Objects.WEAPON && other_object.name !== Boom.Constants.Objects.PLAYER){
        scope.__dispose = true;
      }
    });

    var audio_hit = new Boom.AudioComponent(
      {
        name: 'HIT',
        sound: Boom.Assets.sounds.weapons.gun.hit
      }
    );
    this.components[audio_hit.name] = audio_hit;
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    this.getObject().setLinearVelocity({ x: (this.direction.x * this.speed), y: (this.direction.y * this.speed), z: (this.direction.z * this.speed)})
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
    this.components.HIT.play();
  }


});
