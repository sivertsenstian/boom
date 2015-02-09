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
    //SKYBOX
    this.skybox = new Boom.SkyBox({
      position: new THREE.Vector3(this.width/2 * this.size, -(this.size*8) , this.height/2 * this.size),
      size: 1,
      width: (this.size * this.width * 2),
      height: (this.size * this.width),
      texture_map: this.map.properties['Boom.SKYBOX']
    });

    //FOG
    var fog_color = this.map.properties['Boom.FOG_COLOR'] || 0xFFFFFF;
    var fog_distance = this.map.properties['Boom.FOG_DISTANCE'] || 0.002;
    this.fog = new THREE.FogExp2(fog_color, fog_distance);
    
    //TODO: INCORPORATE ENTITIES, AND LATER LIGHTS WITH THE SAME AUTOGENERATION FROM MAP
    var tileId, tilePath, map_tile_properties = {};
    for(tileset in this.map.tilesets){
      if(!this.map.tilesets.hasOwnProperty(tileset)){
        continue;
      }
      map_tile_properties[this.map.tilesets[tileset].name] = this.map.tilesets[tileset].tileproperties;
      map_tile_properties[this.map.tilesets[tileset].name].firstgid = this.map.tilesets[tileset].firstgid;
    }
    
    for(tileset in map_tile_properties){
      if (!map_tile_properties.hasOwnProperty(tileset)) {
          continue;
      }
      for (tile in map_tile_properties[tileset]) {
        if (!map_tile_properties[tileset].hasOwnProperty(tile)) {
            continue;
        }
        tileId = map_tile_properties[tileset][tile]['Boom.ID'];
        tilePath = map_tile_properties[tileset][tile]['Boom.Path'];
        if(tilePath !== null && tilePath !== undefined){
          Boom.Assets.textures[tileId] = THREE.ImageUtils.loadTexture(tilePath);  
        }
        else{
          Boom.Assets.textures[tileId] = null;
        }
        
      }
    }

    var current_tile, pos;
    //WALLS
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.WALLS].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.WALLS].data[i] - map_tile_properties['Boom'].firstgid;
      if( map_tile_properties['Boom'].hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  0, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        new Boom.Wall({position: pos, 
                       size: this.map.tilewidth,
                       type: map_tile_properties['Boom'][current_tile]['Boom.ID'],
                       repeat: map_tile_properties['Boom'][current_tile]['Boom.Repeat'],
                       height: this.map.layers[Boom.Constants.World.LAYER.WALLS].properties['Boom.Height']
                      });
      }
    }

    //FLOOR
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.FLOOR].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.FLOOR].data[i] - map_tile_properties['Boom'].firstgid;
      if( map_tile_properties['Boom'].hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  -this.map.tileheight, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        new Boom.Floor({position: pos, 
                        size: this.map.tilewidth,
                        type: map_tile_properties['Boom'][current_tile]['Boom.ID']
                       });
      }
    }

    //CEILING
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.CEILING].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.CEILING].data[i] - map_tile_properties['Boom'].firstgid;
      if( map_tile_properties['Boom'].hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  (this.map.layers[Boom.Constants.World.LAYER.WALLS].properties['Boom.Height'] * this.map.tileheight), 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        new Boom.Ceiling({position: pos, 
                          size: this.map.tilewidth,
                          type: map_tile_properties['Boom'][current_tile]['Boom.ID']
                         });
      }
    }

    //ACTORS
    var actor, actorFactory = new Boom.ActorFactory();
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.ACTORS].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.ACTORS].data[i] - map_tile_properties['Boom.Entities'].firstgid;
      if( map_tile_properties['Boom.Entities'].hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  0, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        actor = actorFactory.spawnActor( map_tile_properties['Boom.Entities'][current_tile]['Boom.ID'],
                                         { 
                                            position: pos, 
                                            type: map_tile_properties['Boom.Entities'][current_tile]['Boom.ID'] 
                                          }
                                        );

        Boom.GameGrid.addActor( actor.id, pos );
      }
    }

     //ITEMS
    var item, itemFactory = new Boom.ItemFactory();
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.ITEMS].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.ITEMS].data[i] - map_tile_properties['Boom.Items'].firstgid;
      if( map_tile_properties['Boom.Items'].hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  this.map.tileheight/4, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        item = itemFactory.spawnItem( map_tile_properties['Boom.Items'][current_tile]['Boom.ID'],
                                         { 
                                            position: pos, 
                                            type: map_tile_properties['Boom.Items'][current_tile]['Boom.ID'],
                                            value:map_tile_properties['Boom.Items'][current_tile]['Boom.VALUE']
                                          }
                                        );

        Boom.GameGrid.addItem( item.id, pos );
      }
    }

    //LIGHTS
    var light_params = {}, param, lightFactory = new Boom.LightFactory();
    for(var i = 0; i < this.map.layers[Boom.Constants.World.LAYER.LIGHT].data.length; i++){
      current_tile = this.map.layers[Boom.Constants.World.LAYER.LIGHT].data[i] - map_tile_properties['Boom.Light'].firstgid;
      if( map_tile_properties['Boom.Light'].hasOwnProperty( current_tile ) ){
        pos = new THREE.Vector3(this.map.tilewidth * Math.floor((i / this.map.width)),
                                  map_tile_properties['Boom.Light'][current_tile]['Boom.HEIGHT'] * this.map.tileheight, 
                                  this.map.tilewidth * Math.floor((i % this.map.height)));

        lightFactory.spawnLight( map_tile_properties['Boom.Light'][current_tile], { position: pos });
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

  build: function(){
  },

  update: function(){
  }
  
};