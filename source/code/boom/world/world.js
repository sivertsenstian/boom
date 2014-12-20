Boom.World = function(){
  this.name = "WorldName";

  //Dimension
  this.width = Boom.Constants.World.WIDTH;
  this.height = Boom.Constants.World.HEIGHT;
  this.size = Boom.Constants.World.SIZE;

  //Textures
  this.textures = {
    skybox: '/resources/structures/skybox/4/1.png'
  };

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
    this.fog = new THREE.FogExp2(0x404040, 0.004);

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
    //Add Map
    //Item
    //var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    //Material
    //var texture = THREE.ImageUtils.loadTexture(this.textures.wall);
    //var material = new THREE.MeshLambertMaterial({map: texture});

    var pos, pos2, pos3;
    for(var i = 0; i < this.map.length; i++){
      if(this.map[i] > 0){
        pos = new THREE.Vector3(this.size * Math.floor((i / this.width) + 1) - (this.size/2),
                               0, 
                               this.size * Math.floor((i % this.height) + 1) - (this.size/2));
        pos2 = new THREE.Vector3(this.size * Math.floor((i / this.width) + 1) - (this.size/2),
                               this.size, 
                               this.size * Math.floor((i % this.height) + 1) - (this.size/2));
        pos3 = new THREE.Vector3(this.size * Math.floor((i / this.width) + 1) - (this.size/2),
                               this.size*2, 
                               this.size * Math.floor((i % this.height) + 1) - (this.size/2));

        new Boom.SandWall({position: pos, size: this.size});
        //new Boom.SandWall({position: pos2, size: this.size});
        //new Boom.SandWall({position: pos3, size: this.size});
      }
      else if(this.map[i] === 0){
        pos = new THREE.Vector3(this.size * Math.floor((i / this.width) + 1) - (this.size/2),
                               -this.size, 
                               this.size * Math.floor((i % this.height) + 1) - (this.size/2));
        pos2 = new THREE.Vector3(this.size * Math.floor((i / this.width) + 1) - (this.size/2),
                               this.size, 
                               this.size * Math.floor((i % this.height) + 1) - (this.size/2));
        pos3 = new THREE.Vector3(this.size * Math.floor((i / this.width) + 1) - (this.size/2),
                               this.size*2, 
                               this.size * Math.floor((i % this.height) + 1) - (this.size/2));

        new Boom.SandGround({position: pos, size: this.size});
        //new Boom.SandGround({position: pos2, size: this.size});
        //new Boom.SandGround({position: pos3, size: this.size});
      }
    }

    //Add Lights
    for(var i = 0; i < this.lights.length; i++){
      scene.add(this.lights[i]);
    }

    //Add Skybox
    this.skyBox.position.set(this.width/2 * this.size, -(this.size/2) , this.height/2 * this.size);
    scene.add( this.skyBox );
  },

  update: function(){
  }
  
};