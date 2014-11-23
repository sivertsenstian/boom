Boom.Bullet = function( origin ) {
  
  //Basic Bullet
  var params = {  mass: 1, 
              size: 0.25, 
              scale: new THREE.Vector3(1, 1, 1),
              position: origin,
              material: new THREE.MeshBasicMaterial({color: 0xFFFFFF })
          };
  this.speed = 2000;
  this.damage = 1;
  this.distance = 100;
  this.disposed = false;
  Boom.Entity.call( this, params );
};

Boom.Bullet.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Bullet,

  init: function(){
    var _this = this;
    Boom.Entity.prototype.init.call(this);

    // Enable CCD Motion clamping if the object moves more than 1 meter in one simulation frame
    //To stop it from passing through objects
    this.object.setCcdMotionThreshold(1);

    // Set the radius of the embedded sphere such that it is smaller than the object
    this.object.setCcdSweptSphereRadius(0.2);

    this.object.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      if( other_object.name !== Boom.Constants.Objects.WEAPON && other_object.name !== Boom.Constants.Objects.PLAYER){
        _this.dispose();
      }
    });

  },

  load: function(){
    Boom.Entity.prototype.load.call(this);

  },

  update: function(){
    Boom.Entity.prototype.update.call(this);
    var velocity = this.object.getLinearVelocity();
    //console.log(velocity);
    //this.object.setLinearVelocity({ x: velocity.x, y: 1, z: velocity.z });
  },

  fire: function( direction ){
    //Fire bullet in the given direction!
    this.object.setLinearVelocity({ x: direction.x * this.speed, y: direction.y * this.speed, z: direction.z * this.speed });
  },

  dispose: function(){
    this.disposed = true;
    this.object.parent.remove(this.object);
    var geometry = this.geometry;
    var material = this.material;
    geometry.dispose();
    material.dispose();
  }

});