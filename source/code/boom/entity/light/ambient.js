Boom.AmbientLight = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.MISSING;
  this.color = params.color || 0xFF0000;

  Boom.Entity.call(this, {name: 'STATIC_ITEM_LIGHT_AMBIENT', is_static: true, is_singular: true});
};

Boom.AmbientLight.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.AmbientLight,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var amb_light = new Boom.AmbientLightComponent({
      name: 'light_AMBIENT',
      color: this.color,
      owner: this
    });
    this.components[amb_light.name] = amb_light;

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
