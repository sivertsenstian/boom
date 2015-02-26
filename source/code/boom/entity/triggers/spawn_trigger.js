Boom.EntitySpawnTrigger = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.interactable = params.interactable || false;
  this.triggered = false;
  this.entity = params.entity || Boom.Constants.Actors.HOSTILE.ALIEN;
  this.quantity = params.quantity || 1;

  //this.message = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ANIMATION, data: this.value, type: Boom.Constants.Message.Action.WIN, sender: this.type });
  
  Boom.Entity.call(this, {name: 'TRIGGER_ENTITY_SPAWN', });
};
Boom.EntitySpawnTrigger.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.EntitySpawnTrigger,

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
      
      for(var i = 0; i < this.quantity; i++){
        Boom.GameFactory.spawn( 
          this.entity,
          { 
            position: this.position, 
            type: this.entity
          }
        );
      }
      this.triggered = true;
    }
  }
});
