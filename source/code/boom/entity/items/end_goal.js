Boom.EndGoal = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.position = params.position;
  this.size = params.size || 24;
  this.texture = Boom.Assets.textures[this.type];

  //TODO: SEND TO WIN COMPONENT THEN ? LOAD NEXT LEVEL.. SOMETHING.. SCORESCREEN ?
  this.message = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.ACTION, data: this.value, type: Boom.Constants.Message.Action.WIN, sender: this.type });
  
  Boom.Entity.call(this, {name: 'ITEM_ENDGOAL', is_singular: true});
};
Boom.EndGoal.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.EndGoal,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_endgoal_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        color: 0x000000,
        size: this.size,
        texture: this.texture,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    var animation = new Boom.AnimationComponent( 
      {
        name: "item_endgoal_animation",
        object: physics.object,
        position: new THREE.Vector3(0, 0, 0), 
        rotation: new THREE.Vector3(0, 2*Math.PI, 0), 
        ms: 2000,
        repeat: Infinity,
        yoyo: false,
        owner: this
      }
    );
    this.components[animation.name] = animation;
    animation.animate();

    var animation_disappear = new Boom.AnimationComponent( 
      {
        name: "item_endgoal_animation_disappear",
        object: physics.object,
        rotation: new THREE.Vector3(0, -2*Math.PI, 0), 
        scale: physics.object.scale.clone().negate(),
        ms: 1000,
        yoyo:false,
        owner: this
      }
    );
    this.components[animation_disappear.name] = animation_disappear;

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
    this.components.item_endgoal_animation_disappear.animate();
    //Call super
    window.setTimeout(function( entity ){ 
      Boom.Entity.prototype.dispose.call(entity);
    }, 
    this.components.item_endgoal_animation_disappear.ms, this);
  }
});
