Boom.Assets = {

  weapons: {

  },

  sounds: {
    weapons: {
      gun: {
        shoot: 'resources/weapons/1/shoot.wav',
        hit: 'resources/bullets/1/hit.wav'
      }
    }
  },

  world: {
    OBJECT:{
      PLAYER_SPAWN: "4f9bc809-977b-4283-bb96-73ca47e4dbdb"
    },
    ENTITY:{
      SAND_WALL: "bcde54dd-abae-4c20-9d37-145812f5c933",
      SAND_GROUND: "99a2f5b7-e0d9-4e00-9f3a-a88172bc5975"
    },
    MAP:{
      COLLISION: 'a1114c99-41cb-4fbd-8847-5e112d2ceb18'
    }
  },

  textures: {
    MISSING: THREE.ImageUtils.loadTexture('/resources/DEBUG/missing.jpg')
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
        xhr.open("GET", url, false);
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