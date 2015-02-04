Boom.HemisphereLight = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.color_ground = params.color_ground || 0xFFFFFF;
  this.color_sky = params.color_sky || 0x000000;
  this.intensity = parseFloat(params.intensity) || 1.0;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  Boom.Entity.call(this, {name: 'STATIC_ITEM_LIGHT_HEMISPHERE', is_static: true, is_singular: true});
};

Boom.HemisphereLight.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.HemisphereLight,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var hem_light = new Boom.HemisphereLightComponent({
      name: 'light_HEMISPHERE',
      color_ground: this.color_ground,
      color_sky: this.color_sky,
      intensity: this.intensity,
      position: this.position,
      owner: this
    });
    this.components[hem_light.name] = hem_light;    
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
