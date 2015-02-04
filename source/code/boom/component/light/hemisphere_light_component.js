Boom.HemisphereLightComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.LIGHT;
  this.color_ground = params.color_ground || 0xFFFFFF;
  this.color_sky = params.color_sky || 0x000000;
  this.intensity = params.intensity || 1.0;
  this.height = params.height || 0;
  this.position = params.position || new THREE.Vector3(0, this.height, 0);

  //Call super
  Boom.Component.call(this, params );
};

Boom.HemisphereLightComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.HemisphereLightComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    this.object = new THREE.HemisphereLight( this.color_sky, this.color_ground, this.intensity);
    this.object.position.copy(this.position);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
  }

});