Boom.Wall = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.repeat = params.repeat || Boom.Constants.TRUE;
  this.position = params.position;
  this.size = params.size;
  this.height = parseFloat(params.height) || 10;
  this.width = params.width || 1;
  this.triggerable = params.triggerable || false;
  this.chainable = params.chainable || false;

  this.texture = Boom.Assets.textures[this.type];
  if(this.repeat === Boom.Constants.TRUE){
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set( this.width, this.height );
  }

  Boom.Entity.call(this, {name: 'STATIC_ITEM_WALL', triggerable: this.triggerable});
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
        size: this.size,
        scale: new THREE.Vector3(this.width, this.height, this.width),
        texture: this.texture,
        owner: this
      }
    );
    this.components[physics.name] = physics;
    //TODO: MAKE THIS A DOOR ENTITY IF TRIGGERABLE????
    if(this.triggerable){
      this.__singular = true;
      var animation_trigger_open = new Boom.AnimationComponent( 
        {
          name: "ANIMATION_TRIGGER_OPEN",
          object: physics.object,
          position: new THREE.Vector3(0, ((this.height - 1) * Boom.Constants.World.SIZE), 0),
          yoyo: false,
          permanent: true,
          ms: 500,
          owner: this
        }
      );
      this.components[animation_trigger_open.name] = animation_trigger_open;

      var animation_trigger_close = new Boom.AnimationComponent( 
        {
          name: "ANIMATION_TRIGGER_CLOSE",
          object: physics.object,
          position: new THREE.Vector3(0, -((this.height - 1) * Boom.Constants.World.SIZE), 0),
          yoyo: false,
          permanent: true,
          ms: 500,
          owner: this
        }
      );
      this.components[animation_trigger_close.name] = animation_trigger_close;

      var audio_close = new Boom.AudioComponent(
        {
          name: 'AUDIO_TRIGGER_CLOSE',
          sound: Boom.Assets.sounds.structure.door.close,
          owner: this
        }
      );
      this.components[audio_close.name] = audio_close;

      var audio_open = new Boom.AudioComponent(
        {
          name: 'AUDIO_TRIGGER_OPEN',
          sound: Boom.Assets.sounds.structure.door.open,
          owner: this
        }
      );
      this.components[audio_open.name] = audio_open;
    
    }
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
  },

  trigger: function( params ){
    if( params.open ){
      this.components.AUDIO_TRIGGER_OPEN.play();
      this.components.ANIMATION_TRIGGER_OPEN.animate();
    }
    else{
      this.components.AUDIO_TRIGGER_CLOSE.play();
      this.components.ANIMATION_TRIGGER_CLOSE.animate();
    }
  }

});
