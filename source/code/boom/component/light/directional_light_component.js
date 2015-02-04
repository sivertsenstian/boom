Boom.DirectionalLightComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.LIGHT;
  this.color = params.color || 0xFFFFFF;
  this.intensity = parseFloat(params.intensity) || 1.0;
  this.position = params.position || new THREE.Vector3(0, 0, 0);

  //Call super
  Boom.Component.call(this, params );
};

Boom.DirectionalLightComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.DirectionalLightComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);
    
    this.object = new THREE.DirectionalLight( this.color, this.intensity);
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