Boom.Component = function( params ){
  var params = params || {};
  if( typeof params.owner === 'undefined' || params.owner === null){
    throw Boom.Exceptions.OwnerMissingException;
  }
  this.owner = params.owner;
  this.init();
};

Boom.Component.prototype = {
  constructor: Boom.Component,

  init: function(){

  },

  load: function(){

  },

  update: function(){
    
  },

  receive: function( message ){

  }

};


/////////////////////////////////// PhysicalComponent //////////////////////////
Boom.PhysicalComponent = function( params ) {
  params = params || {};
  //Physical
  this.TYPE = params.type || Boom.Constants.Component.BOX;
  this.name = params.name || Boom.Constants.Component.NAME.PHYSICAL;
  this.model = params.model || null;
  this.color = params.color || 0xFFFFFF;
  this.scale = params.scale || new THREE.Vector3(1, 1, 1);
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  this.rotation = params.rotation || new THREE.Vector3(0, 0, 0);
  this.mass = params.mass || 0;
  this.size = params.size || 1;
  this.friction = params.friction || 0;
  this.restitution  = params.restitution  || 0;
  this.castShadow = params.castShadow || false;

  //Call super
  Boom.Component.call(this, params );
};

Boom.PhysicalComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PhysicalComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    this.object = undefined;
    switch ( this.TYPE ){
      case Boom.Constants.Component.BOX:
        this.object = new Physijs.BoxMesh ( 
          new THREE.BoxGeometry(this.size, this.size, this.size),
          Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: this.color }), this.friction, this.restitution), this.mass
        );

        break;
      case Boom.Constants.Component.SPHERE:
        this.object = new Physijs.BoxMesh ( 
          new THREE.SphereGeometry(this.size, this.size * 6, this.size * 8),
          Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: this.color }), this.friction, this.restitution), this.mass
        );
        break;
      case Boom.Constants.Component.MODEL:
        this.object = this.model;
        break;
      default:
        Boom.handleError( " ERROR: Component TYPE not defined: '" + this.TYPE + "'", "Boom.PhysicalComponent");
    }

    this.object.position.set( this.position.x, this.position.y, this.position.z );
    this.object.rotation.set( this.rotation.x, this.rotation.y, this.rotation.z );
    this.object.scale.set( this.scale.x, this.scale.y, this.scale.z );
    this.object.castShadow = this.castShadow;

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);


  }

});

/////////////////////////////////// AudioComponent(?) //////////////////////////
Boom.AudioComponent = function( params ) {
  params = params || {};
  this.name = params.name || Boom.Constants.Component.NAME.AUDIO;
  this.sound = new Howl(
    {
      urls: [ params.sound ]
    }
  );

  //Call super
  Boom.Component.call(this, params );
  
};

Boom.AudioComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AudioComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);


  },

  play: function(){
    this.sound.play();
  }

});

/////////////////////////////////// AnimationComponent(?) //////////////////////////
Boom.AnimationComponent = function( params ) {
  params = params || {};
  //Object
  if (typeof(params.object) === "undefined" || params.object === null){
    throw Boom.Exceptions.ObjectNotDefinedException;
  }
  else{
    this.object = params.object
  }
  //Animation
  this.name = params.name || Boom.Constants.Component.NAME.ANIMATION;
  this.position = params.position ? params.position.add( this.object.position ) : this.object.position;
  this.rotation = params.rotation ? params.rotation.set( this.object.rotation.x + params.rotation.x, 
                                                         this.object.rotation.y + params.rotation.y, 
                                                         this.object.rotation.z + params.rotation.z)  
                                                        : new THREE.Vector3(0, 0, 0);
  this.target_position = params.target_position ? params.target_position.clone() : this.object.position.clone();
  this.target_rotation = params.target_rotation ? params.target_rotation.clone() : this.object.rotation.clone();
  this.ms = params.ms || 1000;
  this.easing = params.easing || TWEEN.Easing.Linear.None;

  //Call super
  Boom.Component.call(this, params );

};

/////////////////////////////////// AnimationComponent(?) //////////////////////////
Boom.AnimationComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AnimationComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
  },

  animate: function(){
    var object = this.object;
    try{
      TWEEN.removeAll();
      if (typeof(object) === "undefined" || object === null){
        throw Boom.Exceptions.ObjectNotDefinedException;
      }
      var pos = this.position.clone();
      var rot = this.rotation.clone();
      var tween_position = new TWEEN.Tween( pos ).to( this.target_position, this.ms);
      var tween_rotation = new TWEEN.Tween( rot ).to( this.target_rotation, this.ms);

      tween_position.onUpdate(function(){
        object.position.set( pos.x, pos.y, pos.z );
      });

      tween_rotation.onUpdate(function(){
        object.rotation.set( rot.x, rot.y, rot.z );
      });

      tween_position.easing( this.easing );
      tween_rotation.easing( this.easing );

      tween_position.start();
      tween_rotation.start();
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Animate');
    }
  }

});

/////////////////////////////////// InputComponent//////////////////////////
Boom.InputComponent = function( params ) {
  var params = params || {};
  this.name = params.name || Boom.Constants.Component.NAME.INPUT;

  //Call super
  Boom.Component.call(this, params );
  
};

Boom.InputComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.InputComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    var scope = this;

    this.owner.camera.rotation.set( 0, 0, 0 );

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( this.owner.camera );

    this.yawObject = new THREE.Object3D();
    this.yawObject.add( this.pitchObject );
    
    this.owner.getObject().add( this.yawObject );

    //Controls
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.jump = false;

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

      if ( scope.enabled === false ) return;

      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      scope.yawObject.rotation.y -= movementX * 0.002;
      scope.pitchObject.rotation.x -= movementY * 0.002;

      scope.pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, scope.pitchObject.rotation.x ) );
    };

    var onMouseClick = function ( event ) {
      event.preventDefault();

      if ( scope.enabled === false ) return;

      var left = 0;
      var right = 2;

      if ( event.button === left){
        //scope.owner.weapon.shoot();
      }
      else if ( event.button === right ){
      }

    };

    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          scope.moveForward = true;
          break;

        case 37: // left
        case 65: // a
          scope.moveLeft = true; 
          break;

        case 40: // down
        case 83: // s
          scope.moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          scope.moveRight = true;
          break;

        case 32: // space
          scope.jump = true;
          break;

      }

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 38: // up
        case 87: // w
          scope.moveForward = false;
          break;

        case 37: // left
        case 65: // a
          scope.moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          scope.moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          scope.moveRight = false;
          break;

        case 69: /*E*/ scope.yawObject.position.set(-50, 50, -50); break;
        case 81: /*Q*/ scope.yawObject.position.set(0, 0, 0); break;

      }

    };

    document.addEventListener( 'mouseup', onMouseClick, false );
    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    scope.enabled = false;

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);

    //Bind controls and mark as enabled
    var scope = this;
    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );
    // http://www.html5rocks.com/en/tutorials/pointerlock/intro/
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if ( havePointerLock ) {
      var element = document.body;
      var pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
          scope.enabled = true;
          blocker.style.display = 'none';
        } else {
          scope.enabled = false;
          blocker.style.display = '-webkit-box';
          blocker.style.display = '-moz-box';
          blocker.style.display = 'box';
          instructions.style.display = '';
        }
      };
      var pointerlockerror = function ( event ) {
        instructions.style.display = '';
      };
      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
      instructions.addEventListener( 'click', function ( event ) {
        instructions.style.display = 'none';
        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
      }, false );
    } else {
      instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
    
  },

  getDirection: function() {

    // assumes the camera itself is not rotated

    var direction = new THREE.Vector3( 0, 0, -1 );
    var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
    var v = new THREE.Vector3();

    rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );
    v.copy( direction ).applyEuler( rotation );
    
    return v;
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);

    /*if ( this.enabled === false ) return;

    var dir = this.getDirection().normalize();
    this.owner.getObject().setDamping(0.99, 1.0);
    var current_velocity = this.owner.getObject().getLinearVelocity();

    if ( this.moveForward) {
      this.owner.getObject().setLinearVelocity({x: current_velocity.x + (this.owner.speed * dir.x), y: current_velocity.y, z: current_velocity.z + (this.owner.speed * dir.z)});
    }

    if ( this.moveBackward ) {
      this.owner.getObject().setLinearVelocity({x: current_velocity.x + (this.owner.speed * -dir.x), y: current_velocity.y, z: current_velocity.z + (this.owner.speed * -dir.z)});
    }

    if ( this.moveLeft ) {
      this.owner.getObject().setLinearVelocity({x: (dir.z * this.owner.speed) + current_velocity.x, y: current_velocity.y, z: (-dir.x * this.owner.speed) + current_velocity.z});
    } 

    if ( this.moveRight ) {
      this.owner.getObject().setLinearVelocity({x: (-dir.z * this.owner.speed) + current_velocity.x, y: current_velocity.y, z: (dir.x * this.owner.speed) + current_velocity.z});
    }

    if ( this.jump ){
      this.owner.getObject().setLinearVelocity({x: current_velocity.x, y: current_velocity.y + this.owner.speed * 2, z: current_velocity.z });
    }

    if( this.owner.getObject().position.y > 0){
      this.jump = false;
    }*/
  }

});
