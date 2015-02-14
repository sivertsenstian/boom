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
          //TODO: FIND A BETTER WAY TO RESET GAME - THIS WORKS FOR NOW!
          $("#game_over").show();
          document.exitPointerLock = document.exitPointerLock    ||
                                 document.mozExitPointerLock ||
                                 document.webkitExitPointerLock;

          // Attempt to unlock
          document.exitPointerLock(); //TODO: Create message to input component that does this!
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