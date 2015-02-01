Boom.HealthActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.value = params.value || 100;
  this.limit = params.value || 100;
  this.events = [Boom.Constants.Message.Action.REDUCE_HEALTH, Boom.Constants.Message.Action.INCREASE_HEALTH];

  this.death = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: null, type: Boom.Constants.Message.Action.DEATH, sender: this.type });
  this.died = false;
  //Call super
  Boom.Component.call(this, params );
};

Boom.HealthActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.HealthActionComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  update: function(){
    if(this.value <= 0 && !this.died){
      this.send( this.death );
      this.died = true;
    }
    else if ( this.value > this.limit ){
      this.value = this.limit;
    }
    //Call super
    Boom.Component.prototype.update.call(this);
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.REDUCE_HEALTH:
          this.value -= message.data;
          if( this.owner.components.hasOwnProperty('AUDIO_PAIN') ){
            this.owner.getComponent( 'AUDIO_PAIN' ).play();
          }
          if( this.owner.components.hasOwnProperty('ANIMATION_PAIN') ){
            this.owner.getComponent( 'ANIMATION_PAIN' ).animate();
          }
          break;
        case Boom.Constants.Message.Action.INCREASE_HEALTH:
          this.value += message.data;
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});