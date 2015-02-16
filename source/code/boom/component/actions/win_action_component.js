Boom.WinActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.events = [Boom.Constants.Message.Action.WIN];

  //Call super
  Boom.Component.call(this, params );
};

Boom.WinActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.WinActionComponent,

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
        case Boom.Constants.Message.Action.WIN:
          Boom.GAME_MENU.gameWon();
          this.owner.getComponent('WIN_AUDIO').play();
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