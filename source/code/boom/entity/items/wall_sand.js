Boom.SandWall = function( params ){
  this.id = Boom.Assets.world.ENTITY.SAND_WALL;
  this.position = params.position;
  this.size = params.size;
  this.height = params.height || 10;
  this.width = params.width || 1;

  this.texture = Boom.Assets.textures[this.id] || Boom.Assets.textures.MISSING;
  this.texture.wrapS = THREE.RepeatWrapping;
  this.texture.wrapT = THREE.RepeatWrapping;
  this.texture.repeat.set( this.width, this.height );

  Boom.Entity.call(this, {name: 'ITEM_WALL_SAND'});
};

Boom.SandWall.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.SandWall,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    //TODO: MAKE MATERIAL A SINGLE POINTABLE MATERIAL
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_wall_sand_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0x6C541E,
        mass: 0,
        size: this.size,
        scale: new THREE.Vector3(this.width, this.height, this.width),
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
