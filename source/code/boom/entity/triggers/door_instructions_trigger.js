Boom.DoorInstructionsTrigger = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.interactable = params.interactable || false;
  this.triggered = false;
  
  Boom.Entity.call(this, {name: 'TRIGGER_DORR_INSTRUCTIONS', score: 0 });
};
Boom.DoorInstructionsTrigger.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.DoorInstructionsTrigger,

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
      this.process();
      
      $(Boom.Constants.UI.ELEMENT.DOOR_INSTRUCTIONS).show(200);
      $(Boom.Constants.UI.ELEMENT.DOOR_INSTRUCTIONS).hide(5000);

      //Check if any entities are on this position - and trigger it if exists
      Boom.GameGrid.triggerEntity( this.triggered, this.position, { open: true } );
    }
  },

  //Registers the entity as a player-used entity
  process: function(){
    //Call super
    Boom.Entity.prototype.process.call(this);
  },

  //Adds entity to world-total in statistics
  register: function(){
    //Call super
    Boom.Entity.prototype.register.call(this);
  },
});
