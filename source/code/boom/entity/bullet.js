Boom.Bullet = function( owner, spawn ){
  this.spawn = spawn;
  Boom.Entity.call(this, {name: 'AMMO_BulletEntity', owner: owner});
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
        color: 0xFF0000,
        size: .25,
        mass: 1,
        friction: 1,
        restitution: 1
      }
    );
    this.components[physics.name] = physics;

    this.getObject().addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      if( other_object.name !== Boom.Constants.Objects.WEAPON && other_object.name !== Boom.Constants.Objects.PLAYER){
        scope.__dispose = true;
      }
    });
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    var dir = this.owner.controls.getDirection();
    this.getObject().setLinearVelocity({ x: (dir.x * this.speed), y: (dir.y * this.speed), z: (dir.z * this.speed)})
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
  }


});
