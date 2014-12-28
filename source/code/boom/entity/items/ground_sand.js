Boom.SandGround = function( params ){
  this.id = Boom.Assets.world.ENTITY.SAND_GROUND;
  this.position = params.position;
  this.size = params.size;
  this.texture = Boom.Assets.textures[this.id] || Boom.Assets.textures.MISSING;
  Boom.Entity.call(this, {name: 'ITEM_GROUND_SAND'});
};

Boom.SandGround.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.SandGround,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    //TODO: MAKE MATERIAL A SINGLE POINTABLE MATERIAL
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_ground_sand_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0xEDC9AF,
        mass: 0,
        size: this.size,
        friction: 0,
        restitution: 0,
        texture: this.texture,
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
