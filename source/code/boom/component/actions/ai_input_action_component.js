Boom.AIInputActionComponent = function( params ) {
  params = params || {};
  this.object = params.object;
  this.type = params.type || Boom.Constants.Component.TYPE.INPUT;
  
  //Call super
  Boom.Component.call(this, params );
};

Boom.AIInputActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AIInputActionComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    var scope = this;

    //Controls
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.spaceBar = false;
    this.leftClick = false;
    this.rightClick = false;

    this.started = false;
    scope.enabled = true; //TODO: NEEDED, MIGHT BE HANDED FOR DEBUG ?
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  getDirection: function() {

    // assumes the object itself is not rotated

    var direction = new THREE.Vector3( 0, 0, 1 );
    var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
    var v = new THREE.Vector3();

    rotation.set( this.object.rotation.x, this.object.rotation.y, 0 );
    v.copy( direction ).applyEuler( rotation );
    
    return v;
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
    if ( this.enabled === false ) return;

    this.leftClick = (Math.floor((Math.random() * 500) + 1) <= 5);

    this.moveForward = (Math.floor((Math.random() *   50) + 1) <= 5);
    this.moveBackward = (Math.floor((Math.random() * 50) + 1) <= 5);
    this.moveLeft = (Math.floor((Math.random() * 50) + 1) <= 5);
    this.moveRight = (Math.floor((Math.random() * 50) + 1) <= 5);

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
      this.leftClick = false;
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

    if ( this.spaceBar ){
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                              data: this.getDirection().normalize(), 
                              type: Boom.Constants.Message.Action.JUMP, 
                              sender: this.type }));
    }
  }

});