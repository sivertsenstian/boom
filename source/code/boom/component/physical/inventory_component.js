Boom.InventoryComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.INVENTORY;
  this.camera = params.camera;
  this.player = params.player || false;
  //active weapon
  this.weapon = params.weapon || null;
  this.object =  null;
  this.active_ammunition = params.ammo || null;
  this.events = [Boom.Constants.Message.Action.SHOOT, Boom.Constants.Message.Action.INCREASE_AMMO,  Boom.Constants.Message.Action.ADD_WEAPON];
  this.inventory = {
    weapons: {},
    ammunition: {},
    items: {}
  };
  this.weaponFactory = new Boom.WeaponFactory();

  //ADD SOME BASIC BULLETS TO INVENTORY
  //TODO: REMOVE THIS ??
  this.inventory.ammunition[Boom.Constants.Ammunition.BULLET] = params.start_ammunition || 12;

  //HUD
  this.registerHUD_WEAPON = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'WEAPON', color: 'red', value: null }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.updateHUD_WEAPON = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'WEAPON', value: null }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });
  this.registerHUD_AMMO = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'AMMO', color: 'goldenrod', value: this.inventory.ammunition[this.active_ammunition] }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.updateHUD_AMMO = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'AMMO', value: this.value }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });

  //Call super
  Boom.Component.call(this, params );
};

Boom.InventoryComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.InventoryComponent,

  init: function() {
    //ADD WEAPON
    this.setActiveWeapon( this.weapon );
    //HUD
    this.send( this.registerHUD_AMMO );
    this.send( this.registerHUD_WEAPON );
    //Call super
    Boom.Component.prototype.init.call(this);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  update: function(){
    //UPDATE HUD WITH CURRENT AMMUNITION
    if(this.active_ammunition !== null){
      if(this.inventory.ammunition[this.active_ammunition] !== this.old_value){
        this.updateHUD_AMMO.data.value = this.inventory.ammunition[this.active_ammunition];
        this.send( this.updateHUD_AMMO );
      }
      this.old_value = this.inventory.ammunition[this.active_ammunition];
    }

    //Call super
    Boom.Component.prototype.update.call(this);
  },

  setActiveWeapon: function( weapon ){
    if( weapon !== null && typeof weapon !== 'undefined' ){
      //TODO REMOVE FROM CAMERA / OVERRIDE NEEDED FOR REMOVE AS WELL ??
      //remove current object from owner
      if(typeof this.object !== 'undefined' && this.object !== null){
        this.owner.remove( this.object );
      }

      //add new object to owner
      this.object = this.weaponFactory.spawnWeapon( weapon, {faction: this.owner.faction } );
      if( typeof this.camera !== 'undefined' && this.camera !== null){
          this.owner.add( this.object, this.camera );
      }
      else{
       //remove current weapon
       this.owner.add( this.object ); 
      }

      //Update hud!
      this.updateHUD_WEAPON.data.value = this.object.hud_name;
      this.send( this.updateHUD_WEAPON );
    }
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.Action.SHOOT:
          if(this.object !== null ){
            if(this.inventory.ammunition[this.active_ammunition] > 0 || !this.player){
              if(this.object.shoot( message.data , this.active_ammunition)){
                this.inventory.ammunition[this.active_ammunition]--;
                this.updateHUD_AMMO.data.value = this.inventory.ammunition[this.active_ammunition];
                this.send( this.updateHUD_AMMO );
              }
            }
            else{
              this.object.empty();
            }
          }
          break;
        case Boom.Constants.Message.Action.INCREASE_AMMO:
          this.inventory.ammunition[message.data.name] += parseFloat(message.data.value);
          break;
        case Boom.Constants.Message.Action.ADD_WEAPON:
          //Add weapon to inventory, with its designated ammunition as value
          this.inventory.weapons[message.data.name] = message.data.value;
          //Set current active ammunition to this weapons ammunition, 
          //and add it to inventory if it does not exist - with 0 count
          this.active_ammunition = this.inventory.weapons[message.data.name];
          if( !this.inventory.ammunition.hasOwnProperty(this.active_ammunition) ){
            this.inventory.ammunition[this.active_ammunition] = 0;
          }
          //Set current active weapon-entity (this.object) to an instance of given type, using the weaponFactory
          //Add active weapon-entity (this.object) to owner-entity
          this.setActiveWeapon( message.data.name );
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});