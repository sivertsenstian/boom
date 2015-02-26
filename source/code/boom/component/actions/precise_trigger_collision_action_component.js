Boom.PreciseTriggerCollisionActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.owner_physical = params.owner.getObjectComponent();
  this.physical_velocity = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.PHYSICAL, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type });
  
  this.events = [Boom.Constants.Message.Action.TRIGGER, Boom.Constants.Message.Action.VELOCITY, Boom.Constants.Message.Action.VELOCITY_FLAT];

  //Call super
  Boom.Component.call(this, params );
};

Boom.PreciseTriggerCollisionActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PreciseTriggerCollisionActionComponent,

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
      var collided = false;
      switch( message.type ){
        case Boom.Constants.Message.Action.TRIGGER:
          var front_position = this.owner_physical.object.position.clone();
          front_position.add( message.data.multiplyScalar(Boom.Constants.World.SIZE) );
          collided = Boom.GameGrid.checkPreciseTrigger( front_position );
          if( collided ){
            if(typeof(collided) === 'object' && collided.interactable){ //FIXME - could probably be done better - hit components??
              collided.trigger();
            }
          }
          break;
        case Boom.Constants.Message.Action.VELOCITY_FLAT:
        case Boom.Constants.Message.Action.VELOCITY:
          collided = Boom.GameGrid.checkPreciseTrigger( this.owner_physical.object.position );
          if( collided ){
            if(typeof(collided) === 'object' && !collided.interactable){ //FIXME - could probably be done better - hit components??
              collided.trigger();
            }
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