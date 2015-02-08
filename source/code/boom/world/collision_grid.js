Boom.CollisionGrid = function( map ){
  this.map = map;
  this.height = this.map.height;
  this.width = this.map.width;
  this.grid = [this.height * this.width];
  this.actors = [this.height * this.width];
  this.items = [this.height * this.width];
  this.init();
  this.x;
  this.y;
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

  checkNeighbours: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    var collision = [4];

    collision[0] = this.checkCollision(this.width * (this.x+1) + this.z);
    collision[1] = this.checkCollision(this.width * (this.x-1) + this.z);
    collision[2] = this.checkCollision(this.width * this.x + (this.z+1));
    collision[3] = this.checkCollision(this.width * this.x + (this.z-1));

    /*    console.log( "(" + z + "," + x + ")");
    console.log(collision);*/

    return collision;
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
  }



};