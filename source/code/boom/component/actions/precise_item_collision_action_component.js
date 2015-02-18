Boom.PreciseItemCollisionActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.owner_physical = params.owner.getObjectComponent();
  this.physical_velocity = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.PHYSICAL, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type });
  
  this.events = [Boom.Constants.Message.Action.VELOCITY, Boom.Constants.Message.Action.VELOCITY_FLAT];

  //Call super
  Boom.Component.call(this, params );
};

Boom.PreciseItemCollisionActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PreciseItemCollisionActionComponent,

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
        case Boom.Constants.Message.Action.VELOCITY_FLAT:
        case Boom.Constants.Message.Action.VELOCITY:
          var collided = Boom.GameGrid.checkPreciseItem( this.owner_physical.object.position );
          
          if( collided ){
            if(typeof(collided) === 'object'){ //FIXME - could probably be done better - hit components??
              var msg = collided.getMessage();
              if( msg ){
                this.send( msg );
              }
            }
          }

          this.physical_velocity.data = message.data;
          this.send( this.physical_velocity );
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});