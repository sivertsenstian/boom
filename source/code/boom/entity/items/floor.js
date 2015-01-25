Boom.Floor = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.size = params.size;
  this.texture = Boom.Assets.textures[this.type];
  Boom.Entity.call(this, {name: 'STATIC_ITEM_FLOOR'});
};

Boom.Floor.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Floor,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_ground_physics',
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
