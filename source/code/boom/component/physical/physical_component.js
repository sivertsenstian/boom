Boom.PhysicalComponent = function( params ) {
  params = params || {};
  //Physical
  this.shape = params.shape || Boom.Constants.Component.BOX;
  this.type = params.type || Boom.Constants.Component.TYPE.PHYSICAL;
  this.model = params.model || null;
  this.color = params.color || 0xFFFFFF;
  this.scale = params.scale || new THREE.Vector3(1, 1, 1);
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  this.rotation = params.rotation || new THREE.Vector3(0, 0, 0);
  this.mass = params.mass || 0;
  this.size = params.size || 1;
  this.friction = params.friction || 0;
  this.restitution  = params.restitution  || 0;
  this.linear_damping = params.linearDamping || 0.99;
  this.angular_damping = params.angularDamping || 1.0;
  this.castShadow = params.castShadow || false;
  this.events = [Boom.Constants.Message.Action.VELOCITY];

  //Call super
  Boom.Component.call(this, params );
};

Boom.PhysicalComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PhysicalComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    this.object = undefined;
    switch ( this.shape ){
      case Boom.Constants.Component.BOX:
        this.object = new Physijs.BoxMesh ( 
          new THREE.BoxGeometry(this.size, this.size, this.size),
          Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: this.color }), this.friction, this.restitution), this.mass
        );

        break;
      case Boom.Constants.Component.SPHERE:
        this.object = new Physijs.SphereMesh ( 
          new THREE.SphereGeometry(this.size, this.size * 6, this.size * 8),
          Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: this.color }), this.friction, this.restitution), this.mass
        );
        break;
      case Boom.Constants.Component.MODEL:
        this.object = this.model;
        break;
      default:
        Boom.handleError( " ERROR: Component 'shape' not defined: '" + this.shape + "'", "Boom.PhysicalComponent");
    }

    this.object.position.set( this.position.x, this.position.y, this.position.z );
    this.object.rotation.set( this.rotation.x, this.rotation.y, this.rotation.z );
    this.object.scale.set( this.scale.x, this.scale.y, this.scale.z );
    this.object.castShadow = this.castShadow;
    this.object.name = this.name + "_OBJECT";

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    if( typeof(this.object.setDamping) !== 'undefined'){
      this.object.setDamping(this.linear_damping, this.angular_damping);
    }
    //Call super
    Boom.Component.prototype.update.call(this);


  },
  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.VELOCITY:
          var current_velocity = this.object.getLinearVelocity();
          this.object.setLinearVelocity({x: current_velocity.x + message.data.x, y: current_velocity.y + message.data.y, z: current_velocity.z + message.data.z});
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});