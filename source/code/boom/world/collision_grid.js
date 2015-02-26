Boom.CollisionGrid = function( map ){
  this.map = map;
  this.height = this.map.height;
  this.width = this.map.width;
  this.grid = [this.height * this.width];
  this.actors = [this.height * this.width];
  this.items = [this.height * this.width];
  this.triggers = [this.height * this.width];
  this.init();
  this.x = null;
  this.y = null;
};

Boom.CollisionGrid.prototype = {
  constructor: Boom.CollisionGrid,

  init: function(){
    var pos;
    //COLLISIONS
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.COLLISION].data.length; i++){
      if( this.map.tilesets[0].tileproperties.hasOwnProperty(this.map.layers[Boom.Constants.World.LAYER.COLLISION].data[i] - this.map.tilesets[0].firstgid) ){
        this.addCollision( i );
      }
      else{
        this.grid[i] = false;
      }
    }
  },

  load: function(){

  },

  update: function(){
    
  },

  addCollision: function( index ){
    this.grid[index] = true;
  },

  addCollisionToPosition: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    var index = this.width * this.x + this.z;

    if(!this.checkCollision(index)){
      this.grid[index] = true;
      return index;
    }
    throw Boom.Exceptions.UndefinedCollisionException;
  },

  removeCollisionFromPosition: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    var index = this.width * this.x + this.z;

    if(this.checkCollision(index)){
      this.grid[index] = false;
      return index;
    }
    throw Boom.Exceptions.UndefinedCollisionException;
  },

  addActor: function( actorId, position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    this.actors[this.width * this.x + this.z] = actorId;
  },

  addItem: function( itemId, position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    this.items[this.width * this.x + this.z] = itemId;
  },

  addTrigger: function( triggerId, position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    this.triggers[this.width * this.x + this.z] = triggerId;
  },

  updateActor: function(actorId, oldPosition, newPosition){
    if(oldPosition.x !== newPosition.x || oldPosition.z !== newPosition.z){
      this.x = Math.round(oldPosition.x / this.map.tileheight);
      this.z =  Math.round(oldPosition.z / this.map.tilewidth);

      this.actors[this.width * this.x + this.z] = false;

      this.x = Math.round(newPosition.x / this.map.tileheight);
      this.z =  Math.round(newPosition.z / this.map.tilewidth);

      this.actors[this.width * this.x + this.z] = actorId;
    }
  },

  checkNeighbours: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    var collision = [4];

    collision[0] = this.checkCollision(this.width * (this.x+1) + this.z);
    collision[1] = this.checkCollision(this.width * (this.x-1) + this.z);
    collision[2] = this.checkCollision(this.width * this.x + (this.z+1));
    collision[3] = this.checkCollision(this.width * this.x + (this.z-1));

    return collision;
  },

  checkTriggerNeighbours: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    var trigger = [4];

    trigger[0] = this.checkTrigger(this.width * (this.x+1) + this.z);
    trigger[1] = this.checkTrigger(this.width * (this.x-1) + this.z);
    trigger[2] = this.checkTrigger(this.width * this.x + (this.z+1));
    trigger[3] = this.checkTrigger(this.width * this.x + (this.z-1));

    return trigger;
  },

  checkPreciseActor: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);

    var actor = this.checkActor(this.width * this.x + this.z, position.y);
    if(actor){
      return actor;
    }
    return this.checkCollision(this.width * this.x + this.z);
  },

  checkPreciseItem: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);

    var item = this.checkItem(this.width * this.x + this.z, position.y);
    if(item){
      return item;
    }
    return this.checkCollision(this.width * this.x + this.z);
  },

  checkPreciseTrigger: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);

    var trigger = this.checkTrigger(this.width * this.x + this.z, position.y);
    if(trigger){
      return trigger;
    }
    return false;
  },

  checkCollision: function( index ){
    return index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.COLLISION].data.length && this.grid[index];
  },

  checkActor: function( index, height ){
    if(index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.ACTORS].data.length && this.actors[index]){
      var actor = Boom.Entities[ this.actors[index] ];
      if( actor !== undefined && height <= actor.boundingBox.y && height >= 0 ){ //Validate height
        return actor;
      }
    }
    return false; //TODO: FIX?
  },

  checkItem: function( index, height ){
    if(index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.ITEMS].data.length && this.items[index]){
      var item = Boom.Entities[ this.items[index] ];
      if( item !== undefined && height <= item.boundingBox.y && height >= 0 ){ //Validate height
        return item;
      }
    }
    return false; //TODO: FIX?
  },

  checkTrigger: function( index ){
    if(index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.TRIGGERS].data.length && this.triggers[index]){
      var trigger = Boom.Entities[ this.triggers[index] ];
      if( trigger !== undefined ){
        return trigger;
      }
    }
    return false; //TODO: FIX?
  },

  compareIgnoreHeight: function(v1, v2){
    return (v1.x === v2.x && v1.z === v2.z);
  },

  triggerEntity: function( trigger_status, trigger_position, params ){
    var current;
    for (var entity in Boom.Entities) {
      if (!Boom.Entities.hasOwnProperty(entity)) {
          continue;
      }
      current = Boom.Entities[entity];
      if(current.triggerable && this.compareIgnoreHeight(current.position, trigger_position)){
        if(current.chainable){ //search for other chainable triggers nearby
          var neighbours = this.checkTriggerNeighbours( trigger_position );
          for(var i = 0; i < neighbours.length; i++){
            if( neighbours[i] && trigger_status !== neighbours[i].triggered){
              neighbours[i].trigger(); //activate trigger on neighbour
            }
          }
        }
        current.trigger( params );
      }
    }
  }



};