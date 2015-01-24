Boom.CollisionGrid = function( map ){
  this.map = map;
  this.height = this.map.height;
  this.width = this.map.width;
  this.grid = [this.height * this.width];
  this.init();
};

Boom.CollisionGrid.prototype = {
  constructor: Boom.CollisionGrid,

  init: function(){
    var pos;
    console.log( this.grid );
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

  isColliding: function( position ){
    var x = Math.round(position.x / this.map.tileheight);
    var z =  Math.round(position.z / this.map.tilewidth);
    var collision = [4];

    collision[0] = this.checkCollision(this.width * (x+1) + z);
    collision[1] = this.checkCollision(this.width * (x-1) + z);
    collision[2] = this.checkCollision(this.width * x + (z+1));
    collision[3] = this.checkCollision(this.width * x + (z-1));

    /*    console.log( "(" + z + "," + x + ")");
    console.log(collision);*/

    return collision;
  },

  checkCollision: function( index ){
    return index >= 0 && index <= this.map.layers[Boom.Constants.World.LAYER.COLLISION].data.length && this.grid[index];
  }



};