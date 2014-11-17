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
    //Player object
    this.object = new Physijs.SphereMesh (
      new THREE.SphereGeometry( this.radius , this.size , this.size ),
      Physijs.createMaterial(this.material, 0, 0), Boom.Constants.Entity.WEIGHT
    );

    this.object.name = Boom.Constants.Objects.PLAYER;
    
    //Crosshair
    var crosshair_geometry = new THREE.CircleGeometry( 0.02, 25 ); 
    var crosshair_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
    this.crosshair = new THREE.Mesh( crosshair_geometry, crosshair_material );
    this.crosshair.position.set(0, 0, - this.radius);

    this.camera.add( this.crosshair );

    //Controls
    this.controls = new Boom.PlayerControls( this );

    //Weapon
    this.weapon = new Boom.Entity({mass: 1000, 
                                   size: 1, 
                                   scale: new THREE.Vector3(1.5, 1, 4),
                                   position: new THREE.Vector3(4, -2, -4)
                                 });

    this.camera.add ( this.weapon.object );

    this.load();
  },

  load: function(){
    this.controls.load();

  },

  update: function(){
    this.controls.update();
    this.weapon.update();
  }

};