  var Boom;

Boom = Boom || {};

Boom.Entity = function( params ){
  this.name = "EntityName";
  
  //Defaults
  this.color = params.hasOwnProperty('color') ? params.color : 0x00FF00;
  this.size = params.hasOwnProperty('size') ? params.size : 10;
  this.mass = params.hasOwnProperty('mass') ? params.mass : 0;
  this.material = params.hasOwnProperty('material') ? params.material : new THREE.MeshPhongMaterial({color: this.color});
  this.geometry = params.hasOwnProperty('geometry') ? params.geometry : new THREE.BoxGeometry(this.size, this.size, this.size);
  this.position = params.hasOwnProperty('position') ? params.position : new THREE.Vector3(0, 0, 0);
  this.rotation = params.hasOwnProperty('rotation') ? params.rotation : new THREE.Vector3(0, 0, 0);
  this.scale = params.hasOwnProperty('scale') ? params.scale : new THREE.Vector3(1, 1, 1);

  this.init();
};

Boom.Entity.prototype = {
  constructor: Boom.Entity,

  init: function(){
    this.object = new Physijs.BoxMesh (
      new THREE.BoxGeometry( this.size * this.scale.x , this.size * this.scale.y , this.size * this.scale.z ),
      Physijs.createMaterial(this.material, 0, 0), this.mass
    );

    this.object.position.copy( this.position );
    this.object.rotation.copy( this.rotation );
  },

  load: function(){

  },

  update: function(){
    
  }

};
