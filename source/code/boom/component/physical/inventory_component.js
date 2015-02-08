Boom.InventoryComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.INVENTORY;
  this.camera = params.camera;
  //active weapon
  this.object = params.weapon || new Boom.Pistol( {faction: params.owner.faction } );
  this.active_ammunition = params.ammo || Boom.Constants.Ammunition.BULLET;
  this.events = [Boom.Constants.Message.Action.SHOOT, Boom.Constants.Message.Action.INCREASE_AMMO];
  this.inventory = {
    weapons: {},
    ammunition: {},
    items: {}
  };

  //INIT VALUES FOR DEFAULT/START WEAPON AND ITS AMMO
  this.inventory.weapons[this.object.type] = this.object;
  this.inventory.ammunition[this.active_ammunition] = params.start_ammunition || 12;

  //HUD
  this.registerHud = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'AMMO', color: 'goldenrod', value: this.inventory.ammunition[this.active_ammunition] }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.hudUpdate = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'AMMO', value: this.value }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });

  //Call super
  Boom.Component.call(this, params );
};

Boom.InventoryComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.InventoryComponent,

  init: function() {
    this.addActiveWeaponToCamera();

    //HUD
    this.send( this.registerHud );
    //Call super
    Boom.Component.prototype.init.call(this);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  update: function(){
    if(this.inventory.ammunition[this.active_ammunition] !== this.old_value){
      this.hudUpdate.data.value = this.inventory.ammunition[this.active_ammunition];
      this.send( this.hudUpdate );
    }
    this.old_value = this.inventory.ammunition[this.active_ammunition];

    //Call super
    Boom.Component.prototype.update.call(this);
  },

  addActiveWeaponToCamera: function(){
    if( typeof this.camera !== 'undefined' && this.camera !== null){
      this.owner.add( this.object, this.camera );
    }
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.SHOOT:
          if(this.inventory.ammunition[this.active_ammunition] > 0){
            if(this.object.shoot( message.data , this.active_ammunition)){
              this.inventory.ammunition[this.active_ammunition]--;
              this.hudUpdate.data.value = this.inventory.ammunition[this.active_ammunition];
              this.send( this.hudUpdate );
            }
          }
          else{
            this.object.empty();
          }
          break;
        case Boom.Constants.Message.Action.INCREASE_AMMO:
          this.inventory.ammunition[message.data.name] += parseFloat(message.data.value);
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});