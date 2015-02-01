Boom.WeaponActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.WEAPON;
  this.object = params.weapon || new Boom.Pistol( {faction: params.owner.faction } );
  this.events = [Boom.Constants.Message.Action.SHOOT];

  //Call super
  Boom.Component.call(this, params );
};

Boom.WeaponActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.WeaponActionComponent,

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
        case Boom.Constants.Message.Action.SHOOT:
          this.last_shot = this.object.shoot( message.data );
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});