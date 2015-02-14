Boom.HealthActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.value = params.value || 100;
  this.limit = params.limit || 100;
  this.old_value = this.value;
  this.player = params.player || false;
  this.events = [Boom.Constants.Message.Action.REDUCE_HEALTH, Boom.Constants.Message.Action.INCREASE_HEALTH];

  //HUD
  this.registerHud = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'HEALTH', color: 'lightcoral', value: this.value }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.hudUpdate = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'HEALTH', value: this.value }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });

  //DEATH(!)
  this.death = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: null, type: (this.player ? Boom.Constants.Message.Action.PLAYER_DEATH : Boom.Constants.Message.Action.HOSTILE_DEATH), sender: this.type });
  this.died = false;
  //Call super
  Boom.Component.call(this, params );
};

Boom.HealthActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.HealthActionComponent,

  init: function() {
    this.send( this.registerHud );
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
    if ( this.value > this.limit ){
      this.value = this.limit;
    }
    if(this.value !== this.old_value){
      this.hudUpdate.data.value = this.value;
      this.send( this.hudUpdate );
    }
    this.old_value = this.value;
    //Call super
    Boom.Component.prototype.update.call(this); 
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.REDUCE_HEALTH:
          this.value -= parseFloat(message.data);
          if( this.owner.components.hasOwnProperty('AUDIO_PAIN') ){
            this.owner.getComponent( 'AUDIO_PAIN' ).play();
          }
          if( this.owner.components.hasOwnProperty('ANIMATION_PAIN') ){
            this.owner.getComponent( 'ANIMATION_PAIN' ).animate();
          }
          break;
        case Boom.Constants.Message.Action.INCREASE_HEALTH:
          this.value += parseFloat(message.data);
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});