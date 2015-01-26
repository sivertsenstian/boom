Boom.PhysicalComponent = function( params ) {
  params = params || {};
  //Physical
  this.shape = params.shape || Boom.Constants.Component.BOX;
  this.type = params.type || Boom.Constants.Component.TYPE.PHYSICAL;
  this.texture = params.texture || null;
  this.model = params.model || null;
  this.color = params.color || 0xFFFFFF;
  this.scale = params.scale || new THREE.Vector3(1, 1, 1);
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  this.rotation = params.rotation || new THREE.Vector3(0, 0, 0);
  this.mass = params.mass || 0;
  this.size = params.size || 1;
  this.height = params.height || 0;
  this.friction = params.friction || 0;
  this.restitution  = params.hasOwnProperty('restitution') ? params.restitution  : 1;
  this.linear_damping = params.linearDamping || 0.5;
  this.angular_damping = params.angularDamping || 1.0;
  this.castShadow = params.castShadow || false;
  this.velocity = new THREE.Vector3(0, 0, 0);
  this.gravity = params.gravity || false;
  this.events = [Boom.Constants.Message.Action.VELOCITY_FLAT, Boom.Constants.Message.Action.VELOCITY, Boom.Constants.Message.Action.GRAVITY];

  //Call super
  Boom.Component.call(this, params );
};

Boom.PhysicalComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PhysicalComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);
    //Check if texture-source is well defined - if not declare it as missing
    if(this.texture !== null && this.texture.sourceFile === ''){
      this.texture = Boom.Assets.textures[Boom.Assets.world.ENTITY.MISSING];
    }
    this.material = (this.texture === null) ? new THREE.MeshBasicMaterial({ color: this.color }) : new THREE.MeshLambertMaterial({ map: this.texture });
    this.geometry = undefined;
    this.object = undefined;
    switch ( this.shape ){
      case Boom.Constants.Component.BOX:        
        this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        this.object = new THREE.Mesh(this.geometry, this.material);
        break;
      case Boom.Constants.Component.SPHERE:
        this.geometry = new THREE.SphereGeometry(this.size, this.size * 6, this.size * 8),
        this.object = new THREE.Mesh(this.geometry, this.material);
        break;
      case Boom.Constants.Component.MODEL:
        this.object = this.model;
        break;
      default:
        Boom.handleError( " ERROR: Component 'shape' not defined: '" + this.shape + "'", "Boom.PhysicalComponent");
    }

    this.object.scale.set( this.scale.x, this.scale.y, this.scale.z );
    this.object.position.set( this.position.x, this.position.y, this.position.z );
    this.object.rotation.set( this.rotation.x, this.rotation.y, this.rotation.z );
    this.object.translateY( (this.scale.y * this.size) / 2 );
    this.object.castShadow = this.castShadow;
    this.object.name = this.name + "_OBJECT";

    //Messages
    this.msg_landed = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: Boom.Constants.FALSE, type: Boom.Constants.Message.Action.LAND, sender: this.type });

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    if(this.velocity.length() !== 0){
      this.object.position.add( this.velocity.multiplyScalar( this.linear_damping ) );

      if( this.owner.onGround === Boom.Constants.FALSE && this.gravity && this.object.position.y <= this.height){
        this.object.position.y = this.height;
        this.send( this.msg_landed );
      }

      this.velocity.set(0, 0, 0);
    }
    //Call super
    Boom.Component.prototype.update.call(this);
  },
  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.VELOCITY_FLAT:
          this.velocity.x = message.data.x;
          this.velocity.z = message.data.z;
          break;
        case Boom.Constants.Message.Action.VELOCITY:
          this.velocity.x = message.data.x;
          this.velocity.y = message.data.y;
          this.velocity.z = message.data.z;
          break;
        case Boom.Constants.Message.Action.GRAVITY:
          this.velocity.add( message.data );
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});