Boom.DeathActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.events = [Boom.Constants.Message.Action.HOSTILE_DEATH, Boom.Constants.Message.Action.PLAYER_DEATH];

  //Call super
  Boom.Component.call(this, params );
};

Boom.DeathActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.DeathActionComponent,

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
        case Boom.Constants.Message.Action.HOSTILE_DEATH:
          this.owner.getComponent('AUDIO_DEATH').play();
          this.owner.getComponent('ANIMATION_DEATH').animate();
          this.owner.dispose();
          break;
        case Boom.Constants.Message.Action.PLAYER_DEATH:
          Boom.GAME_MENU.gameOver();
          this.owner.getComponent('DEATH_AUDIO').play();
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