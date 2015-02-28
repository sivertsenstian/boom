Boom.Entities = Boom.Entities || {};
Boom.MergedEntities = Boom.MergedEntities || [];
Boom.Collidables = Boom.Collidables || [];

Boom.Entity = function( params ){
  params = params || {};
  this.id = Boom.guid();
  this.name = params.name || "EntityName";
  this.faction = params.faction || Boom.Constants.HOSTILE;
  this.boundingBox = params.boundingBox || new THREE.Vector3(Boom.Constants.World.SIZE, Boom.Constants.World.SIZE, Boom.Constants.World.SIZE);
  this.__addToScene = params.hasOwnProperty('addToScene') ? params.addToScene : true; //Defaults to new
  this.__isStatic = params.hasOwnProperty('is_static') ? params.is_static : true; //Defaults to static
  this.__isMerged = params.hasOwnProperty('is_merged') ? params.is_merged : false; //Defaults to un-merged
  this.__singular = params.hasOwnProperty('is_singular') ? params.is_singular : false; //Defaults to not singular (defines a static entity not to be merged but added to scene solo)
  this.__dispose = params.dispose || false;
  this.__local = params.local || false;
  this.__triggerable = params.triggerable || false;
  this.message_sendt = false;
  //this.message = ? //TODO: IMPLEMENT MISSING MESSAGE THAT THROWS EXCEPTION OR TRIGGERS SOMETHING DEBUGGABLE
  this.components = {};
  this.children = [];
  this.score = params.hasOwnProperty('score') ? params.score : 10;

  this.init();
};

Boom.Entity.prototype = {
  constructor: Boom.Entity,

  init: function(){
    try{
      Boom.Entities[this.id] = this;
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Entity');
    }
  },

  load: function(){
    for (var component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      this.components[component].load();
    }
  },

  update: function(){
    for (var component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      this.components[component].update();
    }
  },

  send: function( message ){
    try{
      for (var component in this.components) {
        if (!this.components.hasOwnProperty(component)) {
            continue;
        }
        if (!message.hasOwnProperty('receiver')){
          throw Boom.Exceptions.NoMessageReceiverException;
        }
        if( message.receiver === Boom.Constants.Message.ALL || this.components[component].type === message.receiver){
          this.components[component].receive( message );
        }
      }
    }
    catch( error ){
      Boom.handleError( error , 'Boom.Entity.send()');
    }
  },

  add: function( other, override ){
    this.children.push( other );
    var this_physical = this.getObjectComponent();
    var other_physical = other.getObjectComponent();
    if( this_physical && other_physical ){
      var parent = override || this_physical.object;
      parent.add( other_physical.object );
    }
  },

  remove: function( other, override ){
    for(var i = 0; i < this.children.length; i++ ){
      if( this.children[i].id === other.id ){
        var this_physical = this.getObjectComponent();
        var other_physical = other.getObjectComponent();
        if( this_physical && other_physical ){
          var parent = override || this_physical.object;
          parent.remove( other_physical.object );
        }
        this.children.splice(i, 1);
      }
    }
  },

  child: function( id ){
    for(var i = 0; i < this.children.length; i++ ){
      if( this.children[i].id === id ){
        return this.children[i];
      }
    }
    return false;
  },

  dispose: function(){
    if(!this.isDisposed()){
      this.__dispose = true;
      this.process();
      //Dispose all components of this entity
      for (var component in this.components) {
        if (!this.components.hasOwnProperty(component)) {
            continue;
        }
        this.components[component].dispose();
      }
    }
  },

  isDisposed: function(){
    return this.__dispose;
  },

  //Returns entity-component based on type or name (first of its kind) 
  getComponent: function( c ){ 
    for (var component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      if( this.components[component].type === c || this.components[component].name === c){
        return this.components[component];
      }
    }
    return false;
  },
  //Returns a component that has an 'object'-property that is a THREE.Object3D-object, 
  //expects there to be only one such component defined on an entity 
  //TODO: CHECK THIS IN COMPONENT INIT AND THROW EXCEPTION IF A SECOND IS ADDED
  getObjectComponent: function(){ 
    for (var component in this.components) {
      if (!this.components.hasOwnProperty(component)) {
          continue;
      }
      if( this.components[component].type === Boom.Constants.Component.TYPE.PHYSICAL ||
          this.components[component].type === Boom.Constants.Component.TYPE.LIGHT){
        return this.components[component];
      }
    }
    return false;
  },

  //If this entity has a passable message, it is fetched
  getMessage: function(){
    if(!this.message_sendt && this.message){
      this.message_sendt = true;
      this.dispose(); //TODO: MOVE THIS ??
      return this.message;
    }
    return false;
  },

  //Registers the entity as a player-used entity
  process: function(){
    Boom.Constants.UI.PLAYER.SCORE += this.score; 
  },

  //Adds entity to world-total in statistics
  register: function(){
    //Empty - no stats to process
  },

  trigger: function(){
    throw Boom.NotTriggerableEntityException;//TODO: LOG HERE ?
  }


};
