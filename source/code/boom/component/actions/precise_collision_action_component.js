Boom.PreciseCollisionActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.distance = params.distance || 1;
  this.owner_physical = params.owner.getComponent( Boom.Constants.Component.TYPE.PHYSICAL );
  this.physical_velocity = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.PHYSICAL, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type });
  this.collision = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HIT, data: null, type: Boom.Constants.Message.Hit.DISPOSE_DEALDAMAGE, sender: this.type });
  
  this.events = [Boom.Constants.Message.Action.VELOCITY, Boom.Constants.Message.Action.VELOCITY_FLAT];

  //Call super
  Boom.Component.call(this, params );
};

Boom.PreciseCollisionActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PreciseCollisionActionComponent,

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
          var collided = Boom.GameGrid.checkPrecise( this.owner_physical.object.position );

          if( collided ){
            if( typeof(collided) === 'object' && (this.owner.faction === collided.faction)){ //FIXME - could probably be done better - hit components??
              console.log(" -------------------------------------------   ");
              console.log("ENTITY HIT - BUT SAME FACTION. NO COLLISION!");
              console.log(this.owner);
              console.log(collided);
               console.log(" ------------------------------------------- \n\n");
            }
            else{
              message.data.set(0, 0, 0);
              this.collision.data = collided;
              this.send( this.collision );
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