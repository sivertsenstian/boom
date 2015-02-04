Boom.PointLightComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.LIGHT;
  this.color = params.color || 0x00FF00;
  this.distance = parseFloat(params.distance) || 1.0;
  this.intensity = parseFloat(params.intensity) || 1.0;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  //Call super
  Boom.Component.call(this, params );
};

Boom.PointLightComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.PointLightComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    this.object = new THREE.PointLight( this.color, this.intensity, this.distance);
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