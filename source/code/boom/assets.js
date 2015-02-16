Boom.Assets = {

  weapons: {

  },

  music: {
    MISSING: new Boom.Audio({url: 'resources/music/missing.mp3', volume: 1.0, loop: true }),
    maps:{
      'c7cc27d8-da16-4c26-bb03-0e2d04de63c8' : new Boom.Audio({url: 'resources/music/simple_action_beat.ogg', volume: 1.0, loop: true})
    }
  },
  sounds: {
    MISSING: new Boom.Audio({url: 'resources/sounds/missing.mp3'}),
    ui:{
      menu_up: new Boom.Audio({url: 'resources/sounds/menu_up.mp3', volume: 1.0}),
      menu_down: new Boom.Audio({url: 'resources/sounds/menu_down.mp3', volume: 1.0}),
    },
    weapons: {
      pistol: {
        shoot: new Boom.Audio({url: 'resources/sounds/pistol.mp3', volume: 1.0}),
        hit: new Boom.Audio({url: 'resources/sounds/hit.wav', volume: 1.0}),
        empty: new Boom.Audio({url: 'resources/sounds/empty.mp3', volume: 1.0}),
        pickup: new Boom.Audio({url: 'resources/sounds/pistol_pickup.mp3', volume: 1.0})
      },
      shotgun: {
        shoot: new Boom.Audio({url: 'resources/sounds/shotgun.mp3', volume: 1.0}),
        hit: new Boom.Audio({url: 'resources/sounds/hit.wav', volume: 1.0}),
        empty: new Boom.Audio({url: 'resources/sounds/empty.mp3', volume: 1.0}),
        pickup: new Boom.Audio({url: 'resources/sounds/shotgun_pickup.ogg', volume: 1.0})
      }
    },
    items: {
      healthpack_powerup: new Boom.Audio({url: 'resources/sounds/healthpack_pickup.wav', volume: 1.0}),
      bullet_powerup: new Boom.Audio({url: 'resources/sounds/bullet_pickup.mp3', volume: 1.0}),
      shell_powerup: new Boom.Audio({url: 'resources/sounds/shell_pickup.mp3', volume: 1.0})
    },
    player: {
      win: new Boom.Audio({url: 'resources/sounds/player_win.mp3', volume: 1.0}),
      death: new Boom.Audio({url: 'resources/sounds/player_death.mp3', volume: 1.0})
    },
    hostile: {
      alien:{
        pain: new Boom.Audio({url: 'resources/sounds/alien_pain.mp3', volume: 1.0}),
        death: new Boom.Audio({url: 'resources/sounds/alien_death.mp3', volume: 1.0})
      }
    }
  },

  world: {
    OBJECT:{
      PLAYER_SPAWN: '4f9bc809-977b-4283-bb96-73ca47e4dbdb'
    },
    ENTITY:{
      MISSING: 'cc3bbbf2-b514-4daf-a9d9-1bd320d612e6',
      SKYBOX: 'fd7f5d5e-c7dd-4ea4-a8b8-e140a0a2e85b',
      PISTOL: 'a55a989b-d8dc-46c9-8614-2fee2e52fc29',
      SHOTGUN: '3c8e662c-44e5-4348-b959-ccd74e09dec5'
    },
    MAP:{
    },
    SKYBOX: '/resources/DEBUG/missing.jpg'
  },

  textures: {
    'cc3bbbf2-b514-4daf-a9d9-1bd320d612e6': THREE.ImageUtils.loadTexture('/resources/DEBUG/missing.jpg')
  },

  ui:{
    HIGHSCORES: []
  },

  add: function ( tags, object ){
    var current = Boom.Assets;
    for( var i = 0; i < tags.length; i++ ){
      if( i === tags.length - 1 ){
        current[tags[i]] = object;
      }
      else{
        current[tags[i]] = current[tags[i]] || {};
        current = current[tags[i]];
      }
    }
  },

  loadDAE: function (url, tags, priority) { 
    var self = this; 
        loader = null; 

    // used by the loader to categorize and prioritize
    this.asset;
    this.tags = tags; 
    this.priority = priority; 

    // called by PxLoader to trigger download 
    this.start = function(pxLoader) { 
        // we need the loader ref so we can notify upon completion 
        loader = pxLoader; 

        // set up event handlers so we send the loader progress updates 

        // there are 3 possible events we can tell the loader about: 
        // loader.onLoad(self);    // the resource loaded 
        // loader.onError(self);   // an error occured 
        // loader.onTimeout(self); // timeout while waiting 

        // start downloading
        var assetLoader = new THREE.ColladaLoader();
        assetLoader.options.convertUpAxis = true;
        assetLoader.load( url, function ( collada ) {

          self.asset = collada.scene.children[0];
          Boom.Assets.add( self.tags.all, self.asset );
          loader.onLoad(self);

        } );
    }; 

    // called by PxLoader to check status of image (fallback in case 
    // the event listeners are not triggered). 
    this.checkStatus = function() { 
        // report any status changes to the loader 
        // no need to do anything if nothing has changed 
    }; 

    // called by PxLoader when it is no longer waiting 
    this.onTimeout = function() { 
        // must report a status to the loader: load, error, or timeout 
    }; 

    // returns a name for the resource that can be used in logging 
    this.getName = function() { 
        return url; 
    };

  },

   loadObjMtl: function (url, mtlUrl, tags, priority) { 
    var self = this; 
        loader = null; 

    // used by the loader to categorize and prioritize
    this.asset;
    this.tags = tags; 
    this.priority = priority; 

    // called by PxLoader to trigger download 
    this.start = function(pxLoader) { 
        // we need the loader ref so we can notify upon completion 
        loader = pxLoader; 

        // set up event handlers so we send the loader progress updates 

        // there are 3 possible events we can tell the loader about: 
        // loader.onLoad(self);    // the resource loaded 
        // loader.onError(self);   // an error occured 
        // loader.onTimeout(self); // timeout while waiting 

        // start downloading
        var assetLoader = new THREE.OBJMTLLoader();
        assetLoader.load( url, mtlUrl, function ( objmtl ) {

          self.asset = objmtl.children[0].add( objmtl.children[1] );
          Boom.Assets.add( self.tags.all, self.asset );
          loader.onLoad(self);

        } );
    }; 

    // called by PxLoader to check status of image (fallback in case 
    // the event listeners are not triggered). 
    this.checkStatus = function() { 
        // report any status changes to the loader 
        // no need to do anything if nothing has changed 
    }; 

    // called by PxLoader when it is no longer waiting 
    this.onTimeout = function() { 
        // must report a status to the loader: load, error, or timeout 
    }; 

    // returns a name for the resource that can be used in logging 
    this.getName = function() { 
        return url; 
    };

  },

  loadPLY: function (url, tags, priority) { 
    var self = this; 
        loader = null; 

    // used by the loader to categorize and prioritize
    this.asset;
    this.tags = tags; 
    this.priority = priority; 

    // called by PxLoader to trigger download 
    this.start = function(pxLoader) { 
        // we need the loader ref so we can notify upon completion 
        loader = pxLoader; 

        // set up event handlers so we send the loader progress updates 

        // there are 3 possible events we can tell the loader about: 
        // loader.onLoad(self);    // the resource loaded 
        // loader.onError(self);   // an error occured 
        // loader.onTimeout(self); // timeout while waiting 

        // start downloading
        var assetLoader = new THREE.PLYLoader();
        assetLoader.load( url, function ( ply ) {

          self.asset = new THREE.Mesh(ply);
          Boom.Assets.add( self.tags.all, self.asset );
          loader.onLoad(self);

        } );
    }; 

    // called by PxLoader to check status of image (fallback in case 
    // the event listeners are not triggered). 
    this.checkStatus = function() { 
        // report any status changes to the loader 
        // no need to do anything if nothing has changed 
    }; 

    // called by PxLoader when it is no longer waiting 
    this.onTimeout = function() { 
        // must report a status to the loader: load, error, or timeout 
    }; 

    // returns a name for the resource that can be used in logging 
    this.getName = function() { 
        return url; 
    };

  },

  loadJSON: function (url, tags, priority) { 
    var self = this; 
        loader = null; 

    // used by the loader to categorize and prioritize
    this.asset;
    this.tags = tags; 
    this.priority = priority; 

    // called by PxLoader to trigger download 
    this.start = function(pxLoader) { 
        // we need the loader ref so we can notify upon completion 
        loader = pxLoader; 

        // set up event handlers so we send the loader progress updates 

        // there are 3 possible events we can tell the loader about: 
        // loader.onLoad(self);    // the resource loaded 
        // loader.onError(self);   // an error occured 
        // loader.onTimeout(self); // timeout while waiting 

        // start downloading
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
          if (xhr['readyState'] !== 4)  { return; }
          if (xhr['status'] !== 200) {
            loader.onError(self);
            return;
          }
          
          var serverResponse = xhr['responseText'];
          try {
            data = JSON.parse(serverResponse);
            Boom.Assets.add( self.tags.all, data );
            loader.onLoad(self);
          } catch (e) {
            loader.onError(self);
          }
        }
        xhr.send(null);
    }; 

    // called by PxLoader to check status of image (fallback in case 
    // the event listeners are not triggered). 
    this.checkStatus = function() { 
        // report any status changes to the loader 
        // no need to do anything if nothing has changed 
    }; 

    // called by PxLoader when it is no longer waiting 
    this.onTimeout = function() { 
        // must report a status to the loader: load, error, or timeout 
    }; 

    // returns a name for the resource that can be used in logging 
    this.getName = function() { 
        return url; 
    };

  }

};

// add a convenience method to PxLoader for adding a DAE Model
PxLoader.prototype.addObjMtlModel = function(url, tags, priority) {
  var objMtlLoader = new Boom.Assets.loadObjMtl(url + '.obj', url + '.mtl', tags, priority);
  this.add(objMtlLoader);

  // return the dae element to the caller
  return objMtlLoader.asset;
};

// add a convenience method to PxLoader for adding a PLY Model
PxLoader.prototype.addPLYModel = function(url, tags, priority) {
  var plyLoader = new Boom.Assets.loadPLY(url, tags, priority);
  this.add(plyLoader);

  // return the dae element to the caller
  return plyLoader.asset;
};

// add a convenience method to PxLoader for adding a DAE Model
PxLoader.prototype.addDAEModel = function(url, tags, priority) {
  var daeLoader = new Boom.Assets.loadDAE(url, tags, priority);
  this.add(daeLoader);

  // return the dae element to the caller
  return daeLoader.asset;
};

// add a convenience method to PxLoader for adding a JSON
PxLoader.prototype.addJSON = function(url, tags, priority) {
  var jsonLoader = new Boom.Assets.loadJSON(url, tags, priority);
  this.add(jsonLoader);

  // return the json element to the caller
  return jsonLoader.asset;
};