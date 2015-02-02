Boom.HUDComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.UI;
  this.events = [Boom.Constants.Message.HUD.HEALTH_CHANGE];
  this.display = document.createElement("DIV");
  this.hudComponents = params.hudComponents || [];

  //Call super
  Boom.Component.call(this, params );
};

Boom.HUDComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.HUDComponent,

  init: function() {
    this.display.style.cssText = 'position:absolute;left:0px;top:65%;font-size:2em;font-weight: bold;font-family: fantasy;color:white;';
    this.display.style.zIndex = '100';
    document.body.appendChild( this.display );
    
    var htmlItem, htmlItemLabel, htmlItemValue;
    for(var i = 0; i < this.hudComponents.length; i++){
      item = this.hudComponents[i];
      htmlItem = document.createElement("DIV");
      
      htmlItemLabel = document.createElement("SPAN");
      htmlItemLabel.id = item.HUD_NAME +"_LABEL";
      htmlItemLabel.style.color = item.HUD_COLOR || 'yellow';
      htmlItemLabel.innerHTML = item.HUD_NAME + " ";

      htmlItemValue = document.createElement("SPAN");
      htmlItemValue.id = item.HUD_NAME +"_VALUE";
      htmlItemValue.innerHTML = item.value;

      htmlItem.id = item.HUD_NAME;
      htmlItem.appendChild( htmlItemLabel );
      htmlItem.appendChild( htmlItemValue );

      this.display.appendChild( htmlItem );
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

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      switch( message.type ){
        case Boom.Constants.Message.HUD.HEALTH_CHANGE:
          document.getElementById('HEALTH_VALUE').innerHTML = message.data;
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});