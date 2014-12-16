Boom.JumpActionComponent = function( params ) {
  params = params || {};
  this.height = params.height || 0;
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.events = [Boom.Constants.Message.Action.JUMP, Boom.Constants.Message.Action.LAND];
  this.in_air = Boom.Constants.TRUE;

  //Call super
  Boom.Component.call(this, params );
};

Boom.JumpActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.JumpActionComponent,

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
        case Boom.Constants.Message.Action.JUMP:
          if (this.in_air === Boom.Constants.FALSE){
            this.in_air = Boom.Constants.TRUE;
            velocity = new THREE.Vector3(message.data.x, this.height, message.data.z);
            var action_msg = { receiver: Boom.Constants.Component.TYPE.PHYSICAL, data: velocity, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type };
            this.send( action_msg );
          }
          break;
        case Boom.Constants.Message.Action.LAND:
          this.in_air = message.data;
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});