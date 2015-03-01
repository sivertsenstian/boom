Boom.AIMovementActionComponent = function( params ) {
  params = params || {};
  this.speed = params.speed || 0;
  this.clamp = 0.25;
  this.velocity = new THREE.Vector3();
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.events = [Boom.Constants.Message.Input.FORWARD,
                  Boom.Constants.Message.Input.BACKWARD,
                  Boom.Constants.Message.Input.LEFT,
                  Boom.Constants.Message.Input.RIGHT,
                  Boom.Constants.Message.Action.SPRINTING];

  this.msg = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: null, type: Boom.Constants.Message.Action.VELOCITY_FLAT, sender: this.type });
  //Call super
  Boom.Component.call(this, params );
};

Boom.AIMovementActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AIMovementActionComponent,

  init: function() {
    Boom.Component.prototype.init.call(this);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
    if( this.velocity.length() > 0 ){
      this.velocity.multiplyScalar(this.speed);
      this.msg.data = this.velocity;
      this.send( this.msg );
      this.velocity.set(0, 0, 0);
    }
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Input.FORWARD:
          if(message.data.x > 0 && message.data.x <  this.clamp){
            this.velocity.x += this.clamp;
          }
          else if(message.data.x < 0 && message.data.x > - this.clamp){
            this.velocity.x -= this.clamp;
          }
          else{
            this.velocity.x += message.data.x;
          }

          if(message.data.z > 0 && message.data.z <  this.clamp){
            this.velocity.z +=  this.clamp;
          }
          else if(message.data.z < 0 && message.data.z > - this.clamp){
            this.velocity.z -=  this.clamp;
          }
          else{
            this.velocity.z += message.data.z; 
          }
          break;
        case Boom.Constants.Message.Input.BACKWARD:
          /*this.velocity.x += -message.data.x;
          this.velocity.z += -message.data.z;*/
          break;
        case Boom.Constants.Message.Input.LEFT:
          /*this.velocity.x += message.data.z;
          this.velocity.z += -message.data.x;*/
          break;
        case Boom.Constants.Message.Input.RIGHT:
          /*this.velocity.x += -message.data.z;
          this.velocity.z += message.data.x;*/
          break;
        case Boom.Constants.Message.Action.SPRINTING:
          this.speed += message.data;
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});