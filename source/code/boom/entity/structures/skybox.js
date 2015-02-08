Boom.SkyBox = function( params ){
  this.type = params.type || Boom.Assets.world.ENTITY.SKYBOX;
  this.position = params.position || new THREE.Vector3(0, 0, 0);
  this.size = params.size || 1;
  this.height = params.height || 1;
  this.width = params.width || 1;
  this.texture_map = params.texture_map || Boom.Assets.world.SKYBOX; ///resources/tiles/skybox_sun.png

  var cubeMap = new THREE.CubeTexture( [] );
  cubeMap.format = THREE.RGBFormat;
  cubeMap.flipY = false;

  var loader = new THREE.ImageLoader();
  loader.load( this.texture_map , function ( image ) {

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

  this.material = new THREE.ShaderMaterial( {
    fragmentShader: cubeShader.fragmentShader,
    vertexShader: cubeShader.vertexShader,
    uniforms: cubeShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  Boom.Entity.call(this, {name: 'STATIC_ITEM_SKYBOX', is_singular: true});
};

Boom.SkyBox.prototype = Boom.inherit(Boom.Entity, {
  constructor: Boom.SkyBox,

  init: function() {
    //Call super
    Boom.Entity.prototype.init.call(this);
    
    var physics = new Boom.PhysicalComponent(
       {
        name:'item_skybox_physics',
        shape: Boom.Constants.Component.BOX,
        position: this.position,
        size: this.size,
        scale: new THREE.Vector3(this.width, this.height, this.width),
        material: this.material,
        color: 0xFF00FF,
        owner: this
      }
    );
    this.components[physics.name] = physics;

    this.load();
  },

  load: function(){
    //Call super
    Boom.Entity.prototype.load.call(this);
  },

  update: function(){
    //Call super
    Boom.Entity.prototype.update.call(this);                    
  },

  dispose: function(){
    //Call super
    Boom.Entity.prototype.dispose.call(this);
  }
});

/* //Skybox
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
                             (this.size * this.width),
                             (this.size * this.width) * Boom.Constants.World.SKYBOX_SCALAR),
      skyBoxMaterial
    );
    this.skyBox.name = Boom.Constants.Objects.SKYBOX;*/