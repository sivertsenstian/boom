Boom.GravityActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.force = params.force || Boom.Constants.World.GRAVITY;
  this.events = [Boom.Constants.Message.Action.LAND];

  //Call super
  Boom.Component.call(this, params );
};

Boom.GravityActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.GravityActionComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);
    this.message = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.PHYSICAL, data: this.force, type: Boom.Constants.Message.Action.GRAVITY, sender: this.type });
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
    if(!this.owner.onGround){
      this.send( this.message );
    }
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.LAND:
          this.owner.onGround = message.data;
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});