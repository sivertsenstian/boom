Boom.HUDComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.HUD;
  this.events = [Boom.Constants.Message.HUD.REGISTER, Boom.Constants.Message.HUD.UPDATE];
  this.display = document.createElement("DIV");
  this.hudItems = {};

  //Call super
  Boom.Component.call(this, params );
};

Boom.HUDComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.HUDComponent,

  init: function() {
    this.display.style.cssText = 'position:absolute;left:0px;top:'+ (Boom.Constants.UI.HEIGHT - 50) +
                                 'px;font-size:2em;font-weight: bold;font-family: fantasy;color:white;' + 
                                 'display: table-row; background: rgba(0, 0, 0, 0.42);';
    this.display.style.zIndex = '100';
    document.body.appendChild( this.display );

    //TODO: FIX THIS SO IT DOESNT HAVE TO BE DEFINED FIRST IN THE ENTITY
    if( Object.keys( this.owner.components ).length !== 0) {
      throw new ComponentMustBeDefinedFirstException
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
    if(!this.hudItems.hasOwnProperty(data.name)){
      var htmlItem, htmlItemLabel, htmlItemValue;
      
      htmlItem = document.createElement("DIV");
      htmlItem.style.width = Boom.Constants.UI.BASE_WIDTH;
      htmlItem.style.display = 'table-cell';

      htmlItemLabel = document.createElement("SPAN");
      htmlItemLabel.id = data.name +"_LABEL";
      htmlItemLabel.style.color = data.color || 'yellow';
      htmlItemLabel.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
      htmlItemLabel.innerHTML = data.name + " ";

      htmlItemValue = document.createElement("SPAN");
      htmlItemValue.id = data.name +"_VALUE";
      htmlItemValue.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
      htmlItemValue.innerHTML = data.value;

      htmlItem.id = data.name;
      htmlItem.appendChild( htmlItemLabel );
      htmlItem.appendChild( htmlItemValue );

      this.display.appendChild( htmlItem );
      this.hudItems[data.name] = data;
    }
    else{
      throw Boom.Exceptions.DuplicateItemInHashException;
    }
  },

  //data should be an object with a 'name' corresponding to a registered HUD item and a value with the updated value for this item
  //TODO: add error checks here
  updateHudItem: function( data ){
    if(this.hudItems.hasOwnProperty(data.name)){
      //TODO / FIXME : Update hudItem as well ?? - not needed..
      //Perhaps if the dom-update is run on every UPDATE - this should update the value, and update() should loop all elelemnts in hudItems when updating dom
      //Not needed now so ill leave it!
      document.getElementById(data.name + '_VALUE').innerHTML = data.value;
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