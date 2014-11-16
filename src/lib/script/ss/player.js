var Boom;

Boom = Boom || {};

Boom.Player = function( camera ){
  this.name = "PlayerName";

  this.camera = camera;
  
  //Size
  this.radius = Boom.Constants.Entity.SIZE / 4; 
  this.size = Boom.Constants.Entity.SIZE;

  //Properties
  this.speed = 5;
  this.material = new THREE.MeshBasicMaterial({color: 0x00FF00});
  

  this.init();
};

Boom.Player.prototype = {
  constructor: Boom.Player,

  init: function(){
    this.entity = new Physijs.SphereMesh (
      new THREE.SphereGeometry( this.radius , this.size , this.size ),
      Physijs.createMaterial(this.material, 0, 0), Boom.Constants.Entity.WEIGHT
    );

    this.entity.name = Boom.Constants.Objects.PLAYER;

    this.controls = new Boom.PlayerControls( this );

    this.load();
  },

  load: function(){
    this.controls.load();
  },

  update: function(){
    this.controls.update();
  }

};