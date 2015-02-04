Boom.DirectionalLight = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.color = params.color || 0xFF0000;
  this.intensity = parseFloat(params.intensity) || 1.0;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  Boom.Entity.call(this, {name: 'STATIC_ITEM_LIGHT_DIRECTIONAL', is_static: true, is_singular: true});
};

Boom.DirectionalLight.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.DirectionalLight,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);

    var dir_light = new Boom.DirectionalLightComponent({
      name: 'light_DIRECTIONAL',
      color: this.color,
      intensity: this.intensity,
      position: this.position,
      owner: this
    });
    this.components[dir_light.name] = dir_light;    
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
