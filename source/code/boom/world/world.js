Boom.World = function(){
  this.name = "WorldName";

  //Dimension
  this.width = Boom.Constants.World.WIDTH;
  this.height = Boom.Constants.World.HEIGHT;
  this.size = Boom.Constants.World.SIZE;

  //Textures
  this.textures = {
    floor: '/resources/structures/ground/2/1.jpg',
    ceiling: '/resources/structures/ceiling/1/1.jpg',
    skybox: '/resources/structures/skybox/4/1.png',
    wall: '/resources/structures/wall/2/1.jpg',
  };

  //Actors
  this.actors = [];

  this.init();
};

Boom.World.prototype = {
  constructor: Boom.World,

  init: function(){
    //Skybox
    var cubeMap = new THREE.CubeTexture( [] );
    cubeMap.format = THREE.RGBFormat;
    cubeMap.flipY = false;

    var loader = new THREE.ImageLoader();
    loader.load( this.textures.skybox , function ( image ) {

      var getSide = function ( x, y ) {

        var size = 1024;

        var canvas = document.createElement( 'canvas' );
        canvas.width = size;
        canvas.height = size;

        var context = canvas.getContext( '2d' );
        context.drawImage( image, - x * size, - y * size );

        return canvas;

      };

      cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
      cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
      cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
      cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
      cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
      cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
      cubeMap.needsUpdate = true;

    } );

    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeMap;

    var skyBoxMaterial = new THREE.ShaderMaterial( {
      fragmentShader: cubeShader.fragmentShader,
      vertexShader: cubeShader.vertexShader,
      uniforms: cubeShader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    this.skyBox = new THREE.Mesh(
      new THREE.BoxGeometry( (this.size * this.width) * Boom.Constants.World.SKYBOX_SCALAR, 
                             (this.size * this.width) * Boom.Constants.World.SKYBOX_SCALAR,
                             (this.size * this.width) * Boom.Constants.World.SKYBOX_SCALAR),
      skyBoxMaterial
    );
    this.skyBox.name = Boom.Constants.Objects.SKYBOX;


    //Fog
    this.fog = new THREE.FogExp2(0x404040, 0.003);

    //Lights
    this.lights = [];
    var directional_light = new THREE.DirectionalLight( 0xFFFFFF );
    directional_light.position.set( -(this.size*this.width) / 2,  500, (this.size*this.width) );
    directional_light.castShadow = true;
    //directional_light.shadowCameraVisible = true;
    directional_light.name = Boom.Constants.Objects.LIGHT;
    directional_light.lookAt(0,0,0);
    this.lights.push( directional_light );
   /* var hemisphere_light = new THREE.HemisphereLight( 0xFFFFFF,  0x000000, 1.0 );
    hemisphere_light.position.set( (this.size*this.width)/2,  this.size, (this.size*this.width)/2 );
    hemisphere_light.name = Boom.Constants.Objects.LIGHT;
    this.lights.push( hemisphere_light );*/

    var ambient_light = new THREE.AmbientLight( 0x404040 );
    this.lights.push ( ambient_light );

    //Map
    this.map = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
      1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
      1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,
      1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

  },

  load: function(){
    
  },

  build: function(scene){
    //Set Gravity and other physical properties for the world
    scene.setGravity(Boom.Constants.World.GRAVITY);

    //Add Fog
    scene.fog = this.fog;

    //Add Floor
    var floorTexture = new THREE.ImageUtils.loadTexture( this.textures.floor );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( this.width, this.height );

    var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide });

    //var floorGeometry = new THREE.PlaneBufferGeometry (this.width * this.size, this.height * this.size, this.size, this.size);
    var floorGeometry = new THREE.BoxGeometry (this.width * this.size, this.height * this.size, this.size);
    this.floor = new Physijs.BoxMesh(floorGeometry,  Physijs.createMaterial(floorMaterial, 0, 0), 0);
    this.floor.position.set(this.width/2 * this.size, -this.size , this.height/2 * this.size);
    this.floor.rotation.x = Math.PI / 2;
    this.floor.receiveShadow = true;
    this.floor.name = Boom.Constants.Objects.FLOOR;
    scene.add(this.floor);

    //Add Roof
    var ceilingTexture = new THREE.ImageUtils.loadTexture( this.textures.ceiling );
    ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
    ceilingTexture.repeat.set( this.width, this.height );

    var ceilingMaterial = new THREE.MeshPhongMaterial( { map: ceilingTexture, side: THREE.DoubleSide });

    var ceilingGeometry = new THREE.PlaneBufferGeometry (this.width * this.size, this.height * this.size, this.size, this.size);
    this.ceiling = new Physijs.BoxMesh(ceilingGeometry,  Physijs.createMaterial(ceilingMaterial, .4, .8), 0);
    this.ceiling.position.set(this.width/2 * this.size, (this.size/2) , this.height/2 * this.size);
    this.ceiling.rotation.x = Math.PI / 2;
    this.ceiling.receiveShadow = true;
    this.ceiling.name = Boom.Constants.Objects.CEILING;
    //scene.add(this.ceiling);

    //Add Map
    //Item
    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    //Material
    var texture = THREE.ImageUtils.loadTexture(this.textures.wall);
    var material = new THREE.MeshLambertMaterial({map: texture});

    var walls = new Physijs.BoxMesh( new THREE.Geometry(), new THREE.MeshBasicMaterial(), 0 );
    walls.name = Boom.Constants.Objects.COLLECTION;
    for(var i = 0; i < this.map.length; i++){
      if(this.map[i] > 0){
        var item = new Physijs.BoxMesh(
            new THREE.BoxGeometry( this.size , this.size , this.size ),
            Physijs.createMaterial(material, 0, 0), 0
        );

        item.position.x = this.size * Math.floor((i / this.width) + 1) - (this.size/2);
        item.position.z = this.size * Math.floor((i % this.height) + 1) - (this.size/2);
        item.name = Boom.Constants.Objects.WALL;

    

        walls.add(item);
      }
    }

    walls.receiveShadow = true;
    walls.castShadow = true; 

    scene.add( walls );

    //Add Lights
    for(var i = 0; i < this.lights.length; i++){
      scene.add(this.lights[i]);
    }

    //Add Skybox
    this.skyBox.position.set(this.width/2 * this.size, -(this.size/2) , this.height/2 * this.size);
    scene.add( this.skyBox );

    //Add Actor entities
    var entity;
    for (var i = this.actors.length - 1; i >= 0; i--) {
      entity = this.actors[i].object;
      scene.add ( entity );
    }
  },

  update: function(){
    //Update all world actors
    var actor;
    for (var i = this.actors.length - 1; i >= 0; i--) {
      actor = this.actors[i];
      actor.update();
    }
  },

  addActor: function( actor ){
    this.actors.push( actor );
  }
};