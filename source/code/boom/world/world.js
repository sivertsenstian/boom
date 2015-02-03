Boom.World = function( map ){
  this.map = map;

  //Map Properties
  this.name = this.map.properties['Boom.NAME'] || "WorldName";

  //Dimension
  this.width = Boom.Constants.World.WIDTH;
  this.height = Boom.Constants.World.HEIGHT;
  this.size = Boom.Constants.World.SIZE;

  this.init();
};

Boom.World.prototype = {
  constructor: Boom.World,

  init: function(){

    this.skybox = new Boom.SkyBox({
      position: new THREE.Vector3(this.width/2 * this.size, -(this.size*8) , this.height/2 * this.size),
      size: 1,
      width: (this.size * this.width * 2),
      height: (this.size * this.width),
      texture_map: this.map.properties['Boom.SKYBOX']
    });

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
    //this.music.play();
  },

  load: function(){
    
  },

  build: function(scene){
    //Add Fog
    //scene.fog = this.fog;

    //Add Lights
    for(var i = 0; i < this.lights.length; i++){
      scene.add(this.lights[i]);
    }
  },

  update: function(){
  }
  
};