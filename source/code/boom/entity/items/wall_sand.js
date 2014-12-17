Boom.SandWall = function( params ){
  this.position = params.position;
  this.size = params.size;
  Boom.Entity.call(this, {name: 'ITEM_WALL_SAND'});
};

Boom.SandWall.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.SandWall,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_wall_sand_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0x6C541E,
        mass: 0,
        size: this.size,
        friction: 0,
        restitution: 0,
        owner: this
      }
    );
    this.components[physics.name] = physics;

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
  }
});
