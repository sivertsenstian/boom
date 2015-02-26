Boom.DoorTrigger = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.interactable = params.interactable || false;
  this.triggered = false;

  //this.message = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ANIMATION, data: this.value, type: Boom.Constants.Message.Action.WIN, sender: this.type });
  
  Boom.Entity.call(this, {name: 'TRIGGER_DOOR', });
};
Boom.DoorTrigger.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.DoorTrigger,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    this.load();
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    console.log("updating and stuff");
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
  },

  trigger: function(){
    if(!this.triggered){
      this.triggered = true;
      //play animation on WALL-object at this position ??
      Boom.GameGrid.removeCollisionFromPosition( this.position );
      //Check if any entities are on this position - and trigger it if exists
      Boom.GameGrid.triggerEntity( this.triggered, this.position, { open: true } );
    }
    else{
      this.triggered = false;
      //play animation on WALL-object at this position ??
      Boom.GameGrid.addCollisionToPosition( this.position );
      //Check if any entities are on this position - and trigger it if exists
      Boom.GameGrid.triggerEntity( this.triggered, this.position, { open: false } );
    }
  }
});
