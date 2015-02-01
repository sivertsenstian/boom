Boom.DisposeHitComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.HIT;
  this.events = [Boom.Constants.Message.Hit.DISPOSE, Boom.Constants.Message.Hit.DISPOSE_DEALDAMAGE];
  this.damage = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: null, type: Boom.Constants.Message.Action.REDUCE_HEALTH, sender: this.type });
  //Call super
  Boom.Component.call(this, params );
};

Boom.DisposeHitComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.DisposeHitComponent,

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
      switch( message.type ){
        case Boom.Constants.Message.Hit.DISPOSE:
          this.owner.dispose();
          break;
        case Boom.Constants.Message.Hit.DISPOSE_DEALDAMAGE:
          if(typeof(message.data) === 'object'){
            this.damage.data = this.owner.damage;
            message.data.send( this.damage );
          }
          this.owner.dispose();
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});