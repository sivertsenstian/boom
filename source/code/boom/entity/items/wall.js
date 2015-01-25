Boom.Wall = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.repeat = params.repeat || Boom.Constants.TRUE;
  this.position = params.position;
  this.size = params.size;
  this.height = params.height || 10;
  this.width = params.width || 1;

  this.texture = Boom.Assets.textures[this.type];
  if(this.repeat === Boom.Constants.TRUE){
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set( this.width, this.height );
  }

  Boom.Entity.call(this, {name: 'STATIC_ITEM_WALL'});
};

Boom.Wall.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.Wall,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_wall_physics',
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
