Boom.HUDComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.HUD;
  this.events = [Boom.Constants.Message.HUD.REGISTER, Boom.Constants.Message.HUD.UPDATE];
  this.active_display = $(Boom.Constants.UI.ELEMENT.HUD_ACTIVE);
  this.inventory_display = $(Boom.Constants.UI.ELEMENT.HUD_INVENTORY);
  this.hudActive = {};
  this.hudInventory = {};

  //Call super
  Boom.Component.call(this, params );
};

Boom.HUDComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.HUDComponent,

  init: function() {
    //TODO: FIX THIS SO IT DOESNT HAVE TO BE DEFINED FIRST IN THE ENTITY
    if( Object.keys( this.owner.components ).length !== 0) {
      throw Boom.Exceptions.ComponentMustBeDefinedFirstException;
    }

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

  registerHudItem: function( data ){
    var htmlItem, htmlItemLabel, htmlItemValue;
    //Register in hud-inventory
    if(data.hasOwnProperty('type') && !this.hudInventory.hasOwnProperty(data.type)){
      htmlItem = document.createElement("SPAN");
      htmlItem.style.paddingRight = Boom.Constants.UI.BASE_WIDTH;
      htmlItem.style.className = 'boom-hud-item';

      htmlItemLabel = document.createElement("SPAN");
      htmlItemLabel.id = data.type +"_INVENTORY_LABEL";
      htmlItemLabel.className = 'boom-shadow-text boom-hud-label';
      htmlItemLabel.innerHTML = data.icon || '';

      htmlItem.id = data.type;
      htmlItem.appendChild( htmlItemLabel );

      this.inventory_display.append( htmlItem );
      this.hudInventory[data.type] = data;
    }
    //Register as active
    else if(!this.hudActive.hasOwnProperty(data.name)){
      htmlItem = document.createElement("SPAN");
      htmlItem.style.paddingRight = Boom.Constants.UI.BASE_WIDTH;
      htmlItem.style.className = 'boom-hud-item';

      htmlItemLabel = document.createElement("SPAN");
      htmlItemLabel.id = data.name +"_ACTIVE_LABEL";
      htmlItemLabel.className = 'boom-shadow-text boom-hud-label';
      htmlItemLabel.innerHTML = data.icon || '';


      htmlItemValue = document.createElement("SPAN");
      htmlItemValue.id = data.name +"_ACTIVE_VALUE";
      htmlItemLabel.className = 'boom-shadow-text boom-hud-value';
      htmlItemValue.innerHTML = data.value || '';
      htmlItemValue.style.color = data.color || 'white';
      

      htmlItem.id = data.name;
      htmlItem.appendChild( htmlItemLabel );
      htmlItem.appendChild( htmlItemValue );

      this.active_display.append( htmlItem );
      this.hudActive[data.name] = data;
    }
    else{
      throw Boom.Exceptions.DuplicateItemInHashException;
    }
  },

  //data should be an object with a 'name' corresponding to a registered HUD item and a value with the updated value for this item
  //TODO: add error checks here
  updateHudItem: function( data ){

    //Update in hud-inventory?
    if(data.hasOwnProperty('type') && this.hudInventory.hasOwnProperty(data.type)){
      document.getElementById(data.type + '_INVENTORY_LABEL').innerHTML = data.icon || '';
    }
    else if(this.hudActive.hasOwnProperty(data.name)){
      //TODO / FIXME : Update hudItem as well ?? - not needed..
      //Perhaps if the dom-update is run on every UPDATE - this should update the value, and update() should loop all elelemnts in hudActive when updating dom
      //Not needed now so ill leave it!
      document.getElementById(data.name + '_ACTIVE_LABEL').innerHTML = data.icon || '';

      document.getElementById(data.name + '_ACTIVE_VALUE').style.color = data.color || 'white';
      document.getElementById(data.name + '_ACTIVE_VALUE').innerHTML = data.value || '';
    }
    else{
      throw Boom.Exceptions.ItemNotDefinedInHashException;
    }
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.HUD.REGISTER:
          this.registerHudItem( message.data );
          break;
        case Boom.Constants.Message.HUD.UPDATE:
          this.updateHudItem( message.data );
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});