Boom.PlayerInputActionComponent = function( params ) {
  params = params || {};
  this.camera = params.camera;
  this.object = params.object;
  this.type = params.type || Boom.Constants.Component.TYPE.INPUT;

  if( typeof this.camera === 'undefined' || this.camera === null){
      throw Boom.Exceptions.CameraMissingException;
  }
  
  //Call super
  Boom.Component.call(this, params );
};

Boom.PlayerInputActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PlayerInputActionComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    var scope = this;

    this.camera.rotation.set( 0, 0, 0 );

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( this.camera );

    this.yawObject = new THREE.Object3D();
    this.yawObject.add( this.pitchObject );
    
    this.object.add( this.yawObject );

    //Controls
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.jump = false;
    this.sprint = false;
    this.leftClick = false;
    this.rightClick = false;

    //Weapon selects
    this.pistol = false;
    this.shotgun = false;

    //Initiate trigger
    this.trigger = false;

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {
      if ( Boom.Constants.UI.MOUSE_LOCKED === false ) return;
      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      scope.yawObject.rotation.y -= movementX * 0.002;
      scope.pitchObject.rotation.x -= movementY * 0.002;

      scope.pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, scope.pitchObject.rotation.x ) );
    };

    var onMouseDown = function ( event ) {
      event.preventDefault();
      if ( Boom.Constants.UI.MOUSE_LOCKED === false ) return;
      var left = 0;
      var right = 2;

      if ( event.button === left){
        scope.leftClick = true;
      }
      else if ( event.button === right ){
        scope.rightClick = true;
      }
    };

    var onMouseUp = function ( event ) {
      event.preventDefault();
      var left = 0, right = 2;
      if ( Boom.Constants.UI.MOUSE_LOCKED === false ){
        if ( event.button === right ){
          var element = document.body;
          element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
          element.requestPointerLock();
          scope.rightClick = false;
        }
        return;
      }
      else{
        if ( event.button === left){
          scope.leftClick = false;
        }
        else if ( event.button === right ){          
          scope.rightClick = false;
        }
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

        case 32: // jump
          scope.jump = true;
          break;

        case 67: // sprint
          scope.sprint = true;
          break;

        case 49: // 1
          scope.pistol = true;
          break;

        case 50: // 2
          scope.shotgun = true;
          break;

        case 69: // E
          scope.trigger = true;
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

        case 32: // space
          scope.jump = false;
          break;

        case 67: // sprint
          scope.sprint = false;
          scope.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                        data: null, 
                        type: Boom.Constants.Message.Action.SPRINT_STOP, 
                        sender: this.type }));
          break;

        case 69: // E
          scope.trigger = false;
          break;
      }
    };

    document.addEventListener( 'mousedown', onMouseDown, false );
    document.addEventListener( 'mouseup', onMouseUp, false );
    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    Boom.Constants.UI.MOUSE_LOCKED = false;

  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);    
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
    if ( Boom.Constants.UI.MOUSE_LOCKED === false ) return;

    if ( this.moveForward ) {
      this.moveBackward = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                                    data: this.getDirection().normalize(), 
                                    type: Boom.Constants.Message.Input.FORWARD, 
                                    sender: this.type }));
    }

    if ( this.moveBackward ) {
      this.moveForward = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Input.BACKWARD, 
                              sender: this.type }));
    }

    if ( this.moveLeft ) {
      this.moveRight = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Input.LEFT, 
                              sender: this.type }));
    } 

    if ( this.moveRight ) {
      this.moveLeft = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Input.RIGHT, 
                              sender: this.type }));
    }

    if ( this.leftClick ) {
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.INVENTORY, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Action.SHOOT,
                              sender: this.type }));
    } 

    if ( this.rightClick ) {
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Input.RIGHTCLICK, 
                              sender: this.type }));
    }

    if ( this.jump ){
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Action.JUMP, 
                              sender: this.type }));
    }

    if ( this.sprint ){
      this.sprint = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: null, 
                              type: Boom.Constants.Message.Action.SPRINT_START, 
                              sender: this.type }));
    }

    //Weapons
    if ( this.pistol ){
      this.pistol = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.INVENTORY,
                                    data: {name:  Boom.Assets.world.ENTITY.PISTOL, value: Boom.Constants.Ammunition.BULLET}, 
                                    type: Boom.Constants.Message.Action.SET_WEAPON, 
                                    sender: this.type }));
    }

    if ( this.shotgun ){
      this.shotgun = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.INVENTORY,
                                    data: {name:  Boom.Assets.world.ENTITY.SHOTGUN, value: Boom.Constants.Ammunition.SHELL}, 
                                    type: Boom.Constants.Message.Action.SET_WEAPON, 
                                    sender: this.type }));
    }

    //Trigger
    if ( this.trigger ){
      this.trigger = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION,
                                    data: this.getDirection().normalize(), 
                                    type: Boom.Constants.Message.Action.TRIGGER, 
                                    sender: this.type }));
    }
  }

});