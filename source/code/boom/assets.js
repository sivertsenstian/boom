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

  map: {
    OBJECT:{
      PLAYER_SPAWN: "4f9bc809-977b-4283-bb96-73ca47e4dbdb"
    },
    ENTITY:{
      SAND_WALL: "bcde54dd-abae-4c20-9d37-145812f5c933",
      SAND_GROUND: "99a2f5b7-e0d9-4e00-9f3a-a88172bc5975"
    }
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

  }

};

// add a convenience method to PxLoader for adding a DAE Model
PxLoader.prototype.addDAEModel = function(url, tags, priority) {
  var daeLoader = new Boom.Assets.loadDAE(url, tags, priority);
  this.add(daeLoader);

  // return the img element to the caller
  return daeLoader.asset;
};