Boom.InventoryComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.INVENTORY;
  this.camera = params.camera;
  this.player = params.player || false;
  this.weapon_position = params.weapon_position || new THREE.Vector3(2, -3, -4);
  this.weapon_rotation = params.weapon_rotation || new THREE.Vector3(0 , -Math.PI/2, 0);
  this.weapon_scale = params.weapon_scale || new THREE.Vector3(0.1, 0.1, 0.1);
  //active weapon
  this.weapon = params.weapon || null;
  this.object =  null;
  this.active_ammunition = params.ammo || null;
  this.bonus = params.bonus || 10;
  this.events = [Boom.Constants.Message.Action.SHOOT, 
                 Boom.Constants.Message.Action.INCREASE_AMMO,  
                 Boom.Constants.Message.Action.ADD_WEAPON,
                 Boom.Constants.Message.Action.SET_WEAPON];

  this.inventory = {
    weapons: {},
    ammunition: {},
    items: {}
  };

  //Init and add weapon and ammunition if it is defined from params
  if(this.weapon !== null && this.active_ammunition !== null){
    this.inventory.weapons[this.weapon] = this.active_ammunition;
    this.inventory.ammunition[this.active_ammunition] = 0; 
  }

  //HUD
  this.registerHUD_WEAPON = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'WEAPON' }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.updateHUD_WEAPON = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'WEAPON' }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });
  this.registerHUD_AMMO = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'AMMO', value: this.inventory.ammunition[this.active_ammunition] }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.updateHUD_AMMO = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'AMMO', value: this.value }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });

  //Call super
  Boom.Component.call(this, params );
};

Boom.InventoryComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.InventoryComponent,

  init: function() {
    //HUD
    this.send( this.registerHUD_WEAPON );
    this.send( this.registerHUD_AMMO );

    //REGISTER AVAILABLE WEAPONS TODO: MAKE THIS DYNAMIC OR SOMETHING
    this.register_inventory_weapon = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: null, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
    this.update_inventory_weapon = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: null, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });
    this.register_inventory_weapon.data = {
      name: 'WEAPON',
      type:  Boom.Assets.world.ENTITY.PISTOL,
      icon: '<img class="boom-ui-icon" src="resources/ui/icons/pistol_missing.png">'
    };
    this.send( this.register_inventory_weapon );
    this.register_inventory_weapon.data = {
      name: 'WEAPON',
      type:  Boom.Assets.world.ENTITY.SHOTGUN,
      icon: '<img class="boom-ui-icon" src="resources/ui/icons/shotgun_missing.png">'
    };
    this.send( this.register_inventory_weapon );
    this.register_inventory_weapon.data = {
      name: 'WEAPON',
      type:  Boom.Assets.world.ENTITY.RIFLE,
      icon: '<img class="boom-ui-icon" src="resources/ui/icons/rifle_missing.png">'
    };
    this.send( this.register_inventory_weapon );
    this.register_inventory_weapon.data = {
      name: 'WEAPON',
      type:  Boom.Assets.world.ENTITY.ROCKETLAUNCHER,
      icon: '<img class="boom-ui-icon" src="resources/ui/icons/rocketlauncher_missing.png">'
    };
    this.send( this.register_inventory_weapon );

    //ADD WEAPON
    this.setActiveWeapon( this.weapon );
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
        if( typeof this.camera !== 'undefined' && this.camera !== null){
          this.owner.remove( this.object, this.camera );
        }
        else{
         //remove current weapon
         this.owner.remove( this.object ); 
        }
      }

      //add new object to owner
      this.object = Boom.GameFactory.spawn( weapon, {faction: this.owner.faction, 
                                                     position: this.weapon_position, 
                                                     rotation: this.weapon_rotation, 
                                                     scale: this.weapon_scale
                                          });
      if( typeof this.camera !== 'undefined' && this.camera !== null){
          this.owner.add( this.object, this.camera );
      }
      else{
       //add current weapon
       this.owner.add( this.object ); 
      }
      this.object.equip( this.owner.getObjectComponent().object );
      //Set ammunition according to weapon
      this.active_ammunition = this.inventory.weapons[weapon];
      //Update hud! - register as active not inventory, so no type!
      this.updateHUD_WEAPON.data = {
        name: this.object.hud.name,
        icon: this.object.hud.icon,
      };
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
          if( !this.inventory.ammunition.hasOwnProperty(message.data.name) ){
            this.inventory.ammunition[message.data.name] = 0;
          }
          this.inventory.ammunition[message.data.name] += parseFloat(message.data.value);
          break;
        case Boom.Constants.Message.Action.ADD_WEAPON:
          if( !this.inventory.weapons.hasOwnProperty( message.data.name )){
            //Add weapon to inventory, with its designated ammunition as value
            this.inventory.weapons[message.data.name] = message.data.value;
            //Set current active ammunition to this weapons ammunition, 
            //and add it to inventory if it does not exist - with 0 count
            if( !this.inventory.ammunition.hasOwnProperty(this.inventory.weapons[message.data.name]) ){
              this.inventory.ammunition[this.inventory.weapons[message.data.name]] = 0;
            }
            //Set current active weapon-entity (this.object) to an instance of given type, using the GameFactory
            //Add active weapon-entity (this.object) to owner-entity
            this.setActiveWeapon( message.data.name );

            //Mark weapon as available in inventory
            this.update_inventory_weapon.data = this.object.hud;
            this.send( this.update_inventory_weapon );
          }
          //Add 10 ammo of the weapon-types ammo
          this.inventory.ammunition[this.inventory.weapons[message.data.name]] += this.bonus;
          break;
        case Boom.Constants.Message.Action.SET_WEAPON:
          if( this.inventory.weapons.hasOwnProperty( message.data.name )){
            this.setActiveWeapon( message.data.name );
          }
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});