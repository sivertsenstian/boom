    //Crosshair
    /*var crosshair_geometry = new THREE.CircleGeometry( 0.02, 25 ); 
    var crosshair_material = new THREE.MeshBasicMaterial( { color: 0xffa500 } ); 
    this.crosshair = new THREE.Mesh( crosshair_geometry, crosshair_material );
    this.crosshair.position.set(0, 0, - 6);*/

Boom.UiComponent = function( params ) {
  params = params || {};
  //Physical
  this.type = params.type || Boom.Constants.Component.TYPE.UI;
  this.color = params.color || 0xFFFFFF;
  this.scale = params.scale || new THREE.Vector3(1, 1, 1);
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  this.size = params.size || 1;
  this.material = params.material || new THREE.MeshBasicMaterial();
  this.geometry = params.geometry || new THREE.CircleGeometry();
  this.camera = params.camera || null;

  if( typeof this.camera === 'undefined' || this.camera === null){
      throw Boom.Exceptions.CameraMissingException;
  }

  //Call super
  Boom.Component.call(this, params );
};

Boom.UiComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.UiComponent,

  init: function() {
    //Call super
    Boom.Component.prototype.init.call(this);
    
    this.material.color.set(this.color);

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.position.copy( this.position );

    this.load();
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);

    this.camera.add( this.object );
  },

  update: function(){
    //Call super
    Boom.Component.prototype.update.call(this);
  }

});