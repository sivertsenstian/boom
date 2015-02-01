Boom.World = function( map ){
  this.name = "WorldName";

  //this.map = Boom.Assets.world.MAP['MAP01'];
  this.map = map;

  //Dimension
  this.width = Boom.Constants.World.WIDTH;
  this.height = Boom.Constants.World.HEIGHT;
  this.size = Boom.Constants.World.SIZE;

  //Textures
  this.textures = {
    skybox: '/resources/structures/skybox/1/1.png'
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
                             (this.size * this.width),
                             (this.size * this.width) * Boom.Constants.World.SKYBOX_SCALAR),
      skyBoxMaterial
    );
    this.skyBox.name = Boom.Constants.Objects.SKYBOX;


    //Fog
    this.fog = new THREE.FogExp2(0x000000, 0.0035);

    //Lights
    this.lights = [];
    var directional_light = new THREE.DirectionalLight( 0xFFFFFF );
    directional_light.position.set( -(this.size*this.width) / 2,  500, (this.size*this.width) );
    directional_light.castShadow = true;
    //directional_light.shadowCameraVisible = true;
    directional_light.name = Boom.Constants.Objects.LIGHT;
    directional_light.lookAt(0,0,0);
    this.lights.push( directional_light );
    var hemisphere_light = new THREE.HemisphereLight( 0xFFFFFF,  0x000000, 0.2 );
    hemisphere_light.position.set( (this.size*this.width)/2,  this.size, (this.size*this.width)/2 );
    hemisphere_light.name = Boom.Constants.Objects.LIGHT;
    this.lights.push( hemisphere_light );

    var ambient_light = new THREE.AmbientLight( 0x404040 );
    this.lights.push ( ambient_light );

    var pos;

    //TODO: INCORPORATE ENTITIES, AND LATER LIGHTS WITH THE SAME AUTOGENERATION FROM MAP
    var tileId, tilePath;
    var map_tile_properties = this.map.tilesets[0].tileproperties;
    for (tile in map_tile_properties) {
      if (!map_tile_properties.hasOwnProperty(tile)) {
          continue;
      }
      tileId = map_tile_properties[tile]['Boom.ID'];
      tilePath = map_tile_properties[tile]['Boom.Path'];
      if(tilePath !== null && tilePath !== undefined){
        Boom.Assets.textures[tileId] = THREE.ImageUtils.loadTexture(tilePath);  
      }
      else{
        Boom.Assets.textures[tileId] = null;
      }
      
    }

    var current_tile;
    //WALLS
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.WALLS].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.WALLS].data[i] - this.map.tilesets[0].firstgid;
      if( map_tile_properties.hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  0, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        new Boom.Wall({position: pos, 
                       size: this.map.tilewidth,
                       type: map_tile_properties[current_tile]['Boom.ID'],
                       repeat: map_tile_properties[current_tile]['Boom.Repeat'],
                       height: this.map.layers[Boom.Constants.World.LAYER.WALLS].properties['Boom.Height']
                      });
      }
    }

    //FLOOR
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.FLOOR].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.FLOOR].data[i] - this.map.tilesets[0].firstgid;
      if( map_tile_properties.hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  -this.map.tileheight, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        new Boom.Floor({position: pos, 
                        size: this.map.tilewidth,
                        type: map_tile_properties[current_tile]['Boom.ID']
                       });
      }
    }

    //CEILING
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.CEILING].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.CEILING].data[i] - this.map.tilesets[0].firstgid;
      if( map_tile_properties.hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  (this.map.layers[Boom.Constants.World.LAYER.WALLS].properties['Boom.Height'] * this.map.tileheight), 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        new Boom.Ceiling({position: pos, 
                          size: this.map.tilewidth,
                          type: map_tile_properties[current_tile]['Boom.ID']
                         });
      }
    }

    //ENTITIES
    var entityFactory = new Boom.EntityFactory();
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.ENTITIES].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.ENTITIES].data[i] - this.map.tilesets[0].firstgid;
      if( map_tile_properties.hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  0, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        var entity = entityFactory.spawnEntity( map_tile_properties[current_tile]['Boom.ID'], { position: pos });
        Boom.GameGrid.addEntity( entity.id, pos );
      }
    }

    console.log("world loaded");

    //Start music! TODO: Move this to a more appropriate place!
    //TODO: Reorganize the map structure into more logical bits (map loading, assets, music, skybox lights etc etc)
    this.music = Boom.Assets.music.maps[this.map.properties['Boom.ID']] || Boom.Assets.music.MISSING;
    this.music.play();
  },

  load: function(){
    
  },

  build: function(scene){
    //Add Fog
    scene.fog = this.fog;

    //Add Lights
    for(var i = 0; i < this.lights.length; i++){
      scene.add(this.lights[i]);
    }

    //Add Skybox
    this.skyBox.position.set(this.width/2 * this.size, -(this.size*8) , this.height/2 * this.size);
    scene.add( this.skyBox );
  },

  update: function(){
  }
  
};