Boom.AIInputActionComponent = function( params ) {
  params = params || {};
  this.object = params.object;
  this.type = params.type || Boom.Constants.Component.TYPE.INPUT;

  this.range = 300;
  this.minimum_distance = 96;
  this.cooldown = 500;
  this.last_update = Boom.getCurrentTime();

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
    this.sleep();
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
    
    v.y = 0;
    return v;
  },

  update: function(){
    this.inRange();

    if ( this.enabled === false ) return;

    //AI checks
    if( (Boom.getCurrentTime() - this.last_update) >= this.cooldown ){
      this.last_update = Boom.getCurrentTime();
      this.chase();
    }

    //AI messages
    if ( this.moveForward ) {
      this.moveBackward = false;
      this.send( new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, 
                                    data: this.getDirection(), 
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
  },

  patrol: function(){
    
  },

  chase: function(){
    var player_pos = Boom.Constants.PLAYER.getObjectComponent().object.position;
    this.object.lookAt( player_pos );
    this.moveForward = this.object.position.distanceTo( player_pos ) > this.minimum_distance;
    this.leftClick = true;
  },

  sleep: function() {
    this.enabled = false;
  },

  wakeup: function() {
    this.enabled = true;
    this.owner.wakeup();
  },

  halt: function(){
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
  },

  inRange: function(){
    var player_pos = Boom.Constants.PLAYER.getObjectComponent().object.position;
    if (this.object.position.distanceTo( player_pos ) <= this.range && !this.enabled){
      this.wakeup();
    }
    else if (this.object.position.distanceTo( player_pos ) > this.range && this.enabled){
      this.sleep();
    }
  }

});