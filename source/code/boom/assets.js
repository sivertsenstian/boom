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
    SKYBOX: '/source/resources/DEBUG/missing.jpg'
  },

  textures: {
    'cc3bbbf2-b514-4daf-a9d9-1bd320d612e6': THREE.ImageUtils.loadTexture('/source/resources/DEBUG/missing.jpg')
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
};/styles/stylesheet.css" type="text/css" charset="utf-8" />

  <!-- Vendor -->
  <script type="text/javascript" src="source/vendor/jquery.min.js"></script>
  <script type="text/javascript" src="source/vendor/three.min.js"></script>
  <script type="text/javascript" src="source/vendor/tween.min.js"></script>
  <script type="text/javascript" src="source/vendor/Stats.js"></script>
  <script type="text/javascript" src="source/vendor/howler.min.js"></script>

  <script type="text/javascript" src='source/code/three_plugins/ColladaLoader.js'></script>
  <script type="text/javascript" src='source/code/three_plugins/PLYLoader.js'></script>
  <script type="text/javascript" src='source/code/three_plugins/MTLLoader.js'></script>
  <script type="text/javascript" src='source/code/three_plugins/OBJMTLLoader.js'></script>
  <script type="text/javascript" src="source/vendor/PxLoader.js"></script>
  <script type="text/javascript" src="source/vendor/PxLoaderSound.js"></script>

  <!-- Code -->
  <script type="text/javascript" src='source/code/boom/global.js'></script>
  <script type="text/javascript" src='source/code/boom/audio.js'></script>
  <script type="text/javascript" src='source/code/boom/constants.js'></script>
  <script type="text/javascript" src='source/code/boom/assets.js'></script>
  <script type="text/javascript" src='source/code/boom/message.js'></script>
  
  <script type="text/javascript" src='source/code/boom/base.js'></script>
  <script type="text/javascript" src='source/code/boom/debug.js'></script>

  <script type="text/javascript" src='source/code/boom/game/game.js'></script>

  <!--- MENU --->
  <script type="text/javascript" src='source/code/boom/ui/menu.js'></script>
  <!-- ### COMPONENTS ### -->
  <script type="text/javascript" src='source/code/boom/component/component.js'></script>
  <!-- AUDIBLE -->
  <script type="text/javascript" src='source/code/boom/component/audible/audio_component.js'></script>
  <!-- VISUAL -->
  <script type="text/javascript" src='source/code/boom/component/visual/animation_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/visual/hud_component.js'></script>
  <!-- LIGHT -->
  <script type="text/javascript" src='source/code/boom/component/light/ambient_light_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/light/directional_light_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/light/hemisphere_light_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/light/point_light_component.js'></script>
  <!-- PHYSICAL -->
  <script type="text/javascript" src='source/code/boom/component/physical/physical_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/physical/ui_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/physical/inventory_component.js'></script>
  <!-- ACTIONS -->
  <script type="text/javascript" src='source/code/boom/component/actions/player_input_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/ai_input_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/player_movement_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/ai_movement_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/jump_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/sprint_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/neighbour_collision_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/precise_actor_collision_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/precise_item_collision_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/precise_trigger_collision_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/area_actor_collision_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/gravity_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/health_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/death_action_component.js'></script>
  <script type="text/javascript" src='source/code/boom/component/actions/win_action_component.js'></script>
  <!-- HITS -->
  <script type="text/javascript" src='source/code/boom/component/hits/dispose_deal_damage_hit_component.js'></script>

  <!-- ### ENTITIES ### -->
  <script type="text/javascript" src='source/code/boom/entity/entity.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/entity_factory.js'></script>
  <!-- WEAPONS -->
  <script type="text/javascript" src='source/code/boom/entity/weapons/pistol.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/weapons/shotgun.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/weapons/rifle.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/weapons/rocketlauncher.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/weapons/hoverbotgun.js'></script>
  <!-- AMMUNITION -->
  <script type="text/javascript" src='source/code/boom/entity/ammunition/bullet.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/ammunition/shell.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/ammunition/rocket.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/ammunition/hoverbotgunlaser.js'></script>
  <!-- ITEMS -->
  <script type="text/javascript" src='source/code/boom/entity/items/healthpack_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/bullet_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/pistol_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/rifle_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/shell_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/shotgun_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/rocket_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/rocketlauncher_powerup.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/items/end_goal.js'></script>
  <!-- TERRAIN -->
  <script type="text/javascript" src='source/code/boom/entity/structures/wall.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/structures/floor.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/structures/ceiling.js'></script>
  <!-- SKYBOX -->
  <script type="text/javascript" src='source/code/boom/entity/structures/skybox.js'></script>
  <!-- ACTORS -->
  <script type="text/javascript" src='source/code/boom/entity/actors/player.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/actors/hoverbot.js'></script>
  <!-- LIGHT -->
  <script type="text/javascript" src='source/code/boom/entity/light/ambient.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/light/directional.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/light/hemisphere.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/light/point.js'></script>
  <!-- TRIGGERS -->
  <script type="text/javascript" src='source/code/boom/entity/triggers/door_trigger.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/triggers/spawn_trigger.js'></script>
  <script type="text/javascript" src='source/code/boom/entity/triggers/secret_trigger.js'></script>

  <!-- WORLD -->
  <script type="text/javascript" src='source/code/boom/world/world.js'></script>
  <script type="text/javascript" src='source/code/boom/world/collision_grid.js'></script>

  <script>
    $( document ).ready(function() {
      var boom = new Boom.Game();
      boom.init();
    });
  </script>

</head>
<body>

<!-- USER-NAME -->
<div id="BoomPlayer" class="boom-shadow-text boom-user"></div>
<!-- SCORE -->
<div id="BoomScore" class="boom-shadow-text boom-score">
  <span>Score:</span>
  <span id="BoomScoreValue">TEST</span>
</div>

<!-- GAME WON SCREEN -->
<div id="BoomGameWon">
  <div class="boom-game-win-container">
    <div class="boom-game-win-text">LEVEL COMPLETE!</div>
    <br>
    <ul id="BoomStats" class="boom-list boom-shadow-text"></ul>
    <div>
      <span id="BoomGameWonHighScore" class="boom-button boom-button-red" onclick="Boom.GAME_MENU.highScore()">Menu</span>
      <span id="BoomGameWonNextLevel" class="boom-button boom-button-green" onclick="Boom.GAME_MENU.nextLevel()">Onwards</span>
    </div>
  </div>
</div>

<!-- GAME OVER SCREEN -->
<div id="BoomGameOver">
  <div class="boom-game-over-text">GAME OVER</div>
  <br>
  <div>
    <span id="BoomGameRestart" class="boom-button boom-button-red" onclick="Boom.GAME_MENU.endLevel()">Give up</span>
    <span id="BoomGameEnd" class="boom-button boom-button-green" onclick="Boom.GAME_MENU.restartLevel()">Retry</span>
  </div>
</div>

<!-- TITLE SCREEN -->
<div id="BoomTitle" class="boom-title-screen">
  <div class="boom-shadow-text boom-title-text">BOOM</div>

  <!-- TITLE MENU -->
  <div id="BoomTitleMenu">
    <div class="boom-menu-item-container">
      <span id="BoomNewGame" class="boom-start boom-shadow-text boom-menu-item" onclick="Boom.GAME_MENU.newGame()" >Start New Game</span>
    </div>
    <div class="boom-menu-item-container">
      <span class="boom-shadow-text boom-menu-item" onclick="Boom.GAME_MENU.selectLevel();">Select Level</span>
    </div>
    <div class="boom-menu-item-container">
      <span class="boom-shadow-text boom-menu-item" onclick="Boom.GAME_MENU.highScore();">High Score</span>
    </div>
  </div>

  <!-- PLAYER REGISTRATION -->
  <div id="BoomPlayerRegistration">
    <div class="boom-player-registration-container">
      <span class="boom-shadow-text boom-player-registration-label">Please Register:</span>
      <input id="BoomPlayerRegistrationInput" type="text" class="boom-player-registration-input">
    </div>
  </div>

  <!-- HIGHSCORE-->
  <div id="BoomHighScore">
    <div class="boom-menu-item-container">
      <span class="boom-shadow-text boom-menu-item" onclick="Boom.GAME_MENU.mainMenu();">BACK TO MAIN MENU</span>
    </div>
    <table class="boom-table">
      <thead>
        <tr>
          <th class="boom-shadow-text boom-table-header"> RANK </th>
          <th class="boom-shadow-text boom-table-header"> USERNAME </th>
          <th class="boom-shadow-text boom-table-header"> SCORE </th>
        </tr>
      </thead>
      <tbody class="boom-highscores-body">
      </tbody>
    </table>
  </div>

  <!-- SELECT LEVEL-->
  <div id="BoomSelectLevel">
    <div class="boom-menu-item-container">
      <span class="boom-shadow-text boom-menu-item" onclick="Boom.GAME_MENU.mainMenu();">BACK TO MAIN MENU</span>
    </div>
    <ul id="BoomLevelList" class="boom-list">
    </ul>
  </div>

</div>

<div id="BoomPointerLock">
  <span class="boom-shadow-text">Right click to lock mouse</span>
</div>

<div id="BoomSecret">
  <span class="boom-shadow-text">Secret Found</span>
</div>

<!-- HUD -->
<div id="BoomHUD">
  <div id="BoomHUD_ACTIVE"></div>
  <div id="BoomHUD_INVENTORY"></div>
</div>

</body> 
</html>
