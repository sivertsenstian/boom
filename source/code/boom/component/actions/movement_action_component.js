Boom.MovementActionComponent = function( params ) {
  params = params || {};
  this.speed = params.speed || 0;
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.events = [Boom.Constants.Message.Input.FORWARD,
                  Boom.Constants.Message.Input.BACKWARD,
                  Boom.Constants.Message.Input.LEFT,
                  Boom.Constants.Message.Input.RIGHT];

  //Call super
  Boom.Component.call(this, params );
};

Boom.MovementActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.MovementActionComponent,

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

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      var velocity;
      switch( message.type ){
        case Boom.Constants.Message.Input.FORWARD:
          velocity = new THREE.Vector3(message.data.x, 0, message.data.z).multiplyScalar(this.speed);
          break;
        case Boom.Constants.Message.Input.BACKWARD:
          velocity = new THREE.Vector3(-message.data.x, 0, -message.data.z).multiplyScalar(this.speed);
          break;
        case Boom.Constants.Message.Input.LEFT:
          velocity = new THREE.Vector3(message.data.z, 0, -message.data.x).multiplyScalar(this.speed);
          break;
        case Boom.Constants.Message.Input.RIGHT:
          velocity = new THREE.Vector3(-message.data.z, 0, message.data.x).multiplyScalar(this.speed);
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
      var collision_action_msg = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: velocity, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type });
      this.send( collision_action_msg );
    }
  }

});