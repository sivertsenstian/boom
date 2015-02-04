Boom.PointLight = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.color = params.color || 0x00FF00;
  this.distance = parseFloat(params.distance) || 1.0;
  this.intensity = parseFloat(params.intensity) || 1.0;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  Boom.Entity.call(this, {name: 'STATIC_ITEM_LIGHT_Point', is_static: true, is_singular: true});
};

Boom.PointLight.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.PointLight,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var point_light = new Boom.PointLightComponent({
      name: 'light_POINT',
      color: this.color,
      distance: this.distance,
      intensity: this.intensity,
      position: this.position,
      owner: this
    });
    this.components[point_light.name] = point_light;  
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
