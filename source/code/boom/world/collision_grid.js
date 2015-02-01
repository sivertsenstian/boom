Boom.CollisionGrid = function( map ){
  this.map = map;
  this.height = this.map.height;
  this.width = this.map.width;
  this.grid = [this.height * this.width];
  this.entities = [this.height * this.width];
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

  addEntity: function( entityId, position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);
    this.entities[this.width * this.x + this.z] = entityId;
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

  checkPrecise: function( position ){
    this.x = Math.round(position.x / this.map.tileheight);
    this.z =  Math.round(position.z / this.map.tilewidth);

    var entity = this.checkEntity(this.width * this.x + this.z, position.y);
    if(entity){
      return entity;
    }
    return this.checkCollision(this.width * this.x + this.z);
  },

  checkCollision: function( index ){
    return index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.COLLISION].data.length && this.grid[index];
  },

  checkEntity: function( index, height ){
    if(index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.ENTITIES].data.length && this.entities[index]){
      var entity = Boom.Entities[ this.entities[index] ];
      if( entity !== undefined && height <= entity.boundingBox.y && height >= 0 ){ //Validate height
        return entity;
      }
    }
    return false; //FIX?88,
  },



};