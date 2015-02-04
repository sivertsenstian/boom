Boom.AmbientLightComponent = function( params ) {
  params = params || {};
  this.type = params.type || Boom.Constants.Component.TYPE.LIGHT;
  this.color = params.color || 0xFFFFFF;

  //Call super
  Boom.Component.call(this, params );
};

Boom.AmbientLightComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.AmbientLightComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);

    this.object = new THREE.AmbientLight( this.color);
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