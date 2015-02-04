Boom.NeighbourCollisionActionComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.distance = params.distance || 1;
  this.owner_physical = params.owner.getObjectComponent();
  this.physical_velocity = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.PHYSICAL, type: Boom.Constants.Message.Action.VELOCITY, sender: this.type });
  
  this.events = [Boom.Constants.Message.Action.VELOCITY, Boom.Constants.Message.Action.VELOCITY_FLAT];

  //Call super
  Boom.Component.call(this, params );
};

Boom.NeighbourCollisionActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.NeighbourCollisionActionComponent,

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
          var collisions = Boom.GameGrid.checkNeighbours( this.owner_physical.object.position );
          var collided = false;

          if(collisions[0] && message.data.x > 0 || collisions[1] && message.data.x < 0){
            message.data.x = 0;
            collided = true;
          }
          if(collisions[2] && message.data.z > 0 || collisions[3] && message.data.z < 0){
            message.data.z = 0;
            collided = true;
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