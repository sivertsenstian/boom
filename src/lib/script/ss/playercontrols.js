Boom.PlayerControls = function ( player ) {
	
	this.player = player;

  this.init();
};

Boom.PlayerControls.prototype = {
 
  constructor: Boom.PlayerControls,

  init: function(){
    var scope = this;

    this.player.camera.rotation.set( 0, 0, 0 );
    
    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( this.player.camera );

    this.yawObject = new THREE.Object3D();
    this.yawObject.add( this.pitchObject );

    
    this.player.entity.add( this.yawObject );

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

    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          scope.moveForward = true;
          break;

        case 37: // left
        case 65: // a
          scope.moveLeft = true; break;

        case 40: // down
        case 83: // s
          scope.moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          scope.moveRight = true;
          break;

        case 32: // space
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

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    scope.enabled = false;
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

  update: function() {

    if ( this.enabled === false ) return;

    this.yawObject.__dirtyRotation = true;
    this.yawObject.__dirtyPosition = true;

    var dir = this.getDirection().normalize();
    this.player.entity.setDamping(0.99, 1.0);
    var current_velocity = this.player.entity.getLinearVelocity();

    if ( this.moveForward) {
      this.player.entity.setLinearVelocity({x: current_velocity.x + (this.player.speed * dir.x), y: current_velocity.y, z: current_velocity.z + (this.player.speed * dir.z)});
    }

    if ( this.moveBackward ) {
      this.player.entity.setLinearVelocity({x: current_velocity.x + (this.player.speed * -dir.x), y: current_velocity.y, z: current_velocity.z + (this.player.speed * -dir.z)});
    }

    if ( this.moveLeft ) {
      this.player.entity.setLinearVelocity({x: (dir.z * this.player.speed) + current_velocity.x, y: current_velocity.y, z: (-dir.x * this.player.speed) + current_velocity.z});
    } 

    if ( this.moveRight ) {
      this.player.entity.setLinearVelocity({x: (-dir.z * this.player.speed) + current_velocity.x, y: current_velocity.y, z: (dir.x * this.player.speed) + current_velocity.z});
    }

  },

  load: function() {
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
  }

};
