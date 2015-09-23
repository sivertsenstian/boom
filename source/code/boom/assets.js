Boom.Assets = {

  weapons: {

  },

  music: {
    MISSING: new Boom.Audio({url: 'source/resources/music/missing.mp3', volume: 0.2, loop: true, positional: false }),
    maps:{
      'c7cc27d8-da16-4c26-bb03-0e2d04de63c8' : new Boom.Audio({url: 'source/resources/music/simple_action_beat.ogg', volume: 0.05, loop: true, positional: false}),
      '2edee789-75ae-411e-87a5-f11a049172c2' : new Boom.Audio({url: 'source/resources/music/bensound-scifi.mp3', volume: 0.05, loop: true, positional: false}),
      '38d782f3-3385-4664-81d5-5d9195e0c021' : new Boom.Audio({url: 'source/resources/music/bensound-scifi.mp3', volume: 0.05, loop: true, positional: false})
    }
  },
  sounds: {
    MISSING: new Boom.Audio({url: 'source/resources/sounds/missing.mp3'}),
    ui:{
      menu_up: new Boom.Audio({url: 'source/resources/sounds/menu_up.mp3', volume: 0.5}),
      menu_down: new Boom.Audio({url: 'source/resources/sounds/menu_down.mp3', volume: 0.5}),
    },
    weapons: {
      pistol: {
        shoot: new Boom.Audio({url: 'source/resources/sounds/pistol.mp3', volume: 0.25}),
        empty: new Boom.Audio({url: 'source/resources/sounds/empty.mp3', volume: 0.5}),
        pickup: new Boom.Audio({url: 'source/resources/sounds/pistol_pickup.mp3', volume: 1.0})
      },
      shotgun: {
        shoot: new Boom.Audio({url: 'source/resources/sounds/shotgun.mp3', volume: 0.25}),
        empty: new Boom.Audio({url: 'source/resources/sounds/empty.mp3', volume: 0.5}),
        pickup: new Boom.Audio({url: 'source/resources/sounds/shotgun_pickup.ogg', volume: 1.0})
      },
      rifle: {
        shoot: new Boom.Audio({url: 'source/resources/sounds/rifle.mp3', volume: 0.25}),
        empty: new Boom.Audio({url: 'source/resources/sounds/rifle_empty.mp3', volume: 0.5}),
        pickup: new Boom.Audio({url: 'source/resources/sounds/rifle_pickup.mp3', volume: 1.0})
      },
      rocketlauncher: {
        shoot: new Boom.Audio({url: 'source/resources/sounds/rocketlauncher.mp3', volume: 0.25}),
        empty: new Boom.Audio({url: 'source/resources/sounds/empty.mp3', volume: 0.5}),
        pickup: new Boom.Audio({url: 'source/resources/sounds/rocketlauncher_pickup.wav', volume: 1.0})
      },
      hoverbotgun: {
        shoot: new Boom.Audio({url: 'source/resources/sounds/hoverbotgun.mp3', volume: 0.25}),
        empty: new Boom.Audio({url: 'source/resources/sounds/empty.mp3', volume: 0.5})
      }
    },
    ammunition: {
      bullet: {
        hit: new Boom.Audio({url: 'source/resources/sounds/hit.wav', volume: 0.25}),
      },
      shell: {
        hit: new Boom.Audio({url: 'source/resources/sounds/hit.wav', volume: 0.25}),
      },
      rocket: {
        hit: new Boom.Audio({url: 'source/resources/sounds/rocket_hit.mp3', volume: 1.0}),
      },
      hoverbotgunlaser: {
        hit: new Boom.Audio({url: 'source/resources/sounds/hit.wav', volume: 0.25}),
      }
    },
    items: {
      healthpack_powerup: new Boom.Audio({url: 'source/resources/sounds/healthpack_pickup.wav', volume: 0.5}),
      bullet_powerup: new Boom.Audio({url: 'source/resources/sounds/bullet_pickup.mp3', volume: 0.5}),
      shell_powerup: new Boom.Audio({url: 'source/resources/sounds/shell_pickup.mp3', volume: 0.5}),
      rocket_powerup: new Boom.Audio({url: 'source/resources/sounds/rocket_pickup.wav', volume: 0.5})
    },
    player: {
      win: new Boom.Audio({url: 'source/resources/sounds/player_win.mp3', volume: 0.5}),
      death: new Boom.Audio({url: 'source/resources/sounds/player_death.mp3', volume: 0.5})
    },
    hostile: {
      hoverbot:{
        pain: new Boom.Audio({url: 'source/resources/sounds/hoverbot_pain.mp3', volume: 0.5}),
        death: new Boom.Audio({url: 'source/resources/sounds/hoverbot_death.mp3', volume: 0.5}),
        chase: new Boom.Audio({url: 'source/resources/sounds/hoverbot_active.mp3', volume: 1.0}),
      }
    },
    structure: {
      door: {
        open: new Boom.Audio({url: 'source/resources/sounds/door_trigger.wav', volume: 0.5}),
        close: new Boom.Audio({url: 'source/resources/sounds/door_trigger.wav', volume: 0.5})
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
      SHOTGUN: '3c8e662c-44e5-4348-b959-ccd74e09dec5',
      RIFLE: '6a57c256-e90c-49d4-b503-fd7b95c28c83',
      ROCKETLAUNCHER: '02dac85e-416e-41bf-a1b6-c835867995a0',
      HOVERBOTGUN: 'a1e12702-edfd-46b3-868b-9d6b4ad82307',
    },
    MAP:{
    },
    SKYBOX: 'source/resources/DEBUG/missing.jpg'
  },

  textures: {
    'cc3bbbf2-b514-4daf-a9d9-1bd320d612e6': THREE.ImageUtils.loadTexture('source/resources/DEBUG/missing.jpg')
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
