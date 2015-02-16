Boom.Menu = function( game ){
  this.game = game;
  this.animation_speed = 400;
  var loader = new PxLoader();
  var scope = this;
  //Models
  loader.addDAEModel('/resources/models/pistol.dae', ['weapons', 'pistol'] );
  loader.addDAEModel('/resources/models/shotgun.dae', ['weapons', 'shotgun'] );

  loader.addObjMtlModel('/resources/models/alien/alien', ['enemies', 'alien'] );

  //Maps
  loader.addJSON('/resources/maps/test1.json', ['world', 'MAP', 'TEST'] );
  loader.addJSON('/resources/maps/level01.json', ['world', 'MAP', 'L1'] );
  loader.addJSON('/resources/maps/level02.json', ['world', 'MAP', 'L2'] );
  loader.addJSON('/resources/maps/level03.json', ['world', 'MAP', 'L3'] );

  //Scores
  loader.addJSON('/resources/ui/highscores.json', ['ui', 'HIGHSCORES'] );

  loader.addCompletionListener(function() { 
    scope.init();
  });

  loader.start();
};

Boom.Menu.prototype = {
  constructor: Boom.Menu,

  init: function(){
    this.menu_down = new Boom.AudioComponent({
      name: 'MENU_AUDIO_DOWN',
      sound: Boom.Assets.sounds.ui.menu_down,
      owner: this
    });

    this.menu_up = new Boom.AudioComponent({
      name: 'MENU_AUDIO_UP',
      sound: Boom.Assets.sounds.ui.menu_up,
      owner: this
    });
    
    this.mouseLock();
    this.registerMenuScripts();
    this.mainMenu();
  },

  load: function(){

  },

  update: function(){
    
  },

  mainMenu: function(){
    this.menu_down.play();

    $(Boom.Constants.UI.ELEMENT.TITLE).show(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.PLAYER_REGISTRATION).show(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.TITLE_MENU).show(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.HIGH_SCORE).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.HUD).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.PLAYER).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.SCORE).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.SELECT_LEVEL).hide(this.animation_speed);

    this.in_menu = true;
  },

  newGame: function( level ){
    this.menu_down.play();

    console.log("INIT NEW GAME " + level);
    this.initGame( level );

    $(Boom.Constants.UI.ELEMENT.HIGH_SCORE).hide();
    $(Boom.Constants.UI.ELEMENT.TITLE_MENU).hide();
    $(Boom.Constants.UI.ELEMENT.PLAYER_REGISTRATION).hide();
    $(Boom.Constants.UI.ELEMENT.PLAYER_REGISTRATION).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.TITLE).hide(this.animation_speed*5);

    $(Boom.Constants.UI.ELEMENT.HUD).show(this.animation_speed*3);

    $(Boom.Constants.UI.ELEMENT.PLAYER).text( Boom.Constants.UI.CURRENT_PLAYER );
    $(Boom.Constants.UI.ELEMENT.PLAYER).show(this.animation_speed*3);

    $(Boom.Constants.UI.ELEMENT.SCORE).show(this.animation_speed*3);

    if(Boom.Constants.UI.MOUSE_LOCKED === false){
      $(Boom.Constants.UI.ELEMENT.POINTER_LOCK).show(this.animation_speed*3);
    }
    this.in_menu = false;
  },

  highScore: function(){
    this.menu_down.play();

    //Generate Highscores
    var user, current;
    $(".boom-highscores-body").empty();
    Boom.Assets.ui.HIGHSCORES.sort(Boom.sortScores).slice(0,10);

    for(var i = 0; i < Boom.Assets.ui.HIGHSCORES.length; i++){
      user = Boom.Assets.ui.HIGHSCORES[i];
      current = (user.name.toLowerCase() === Boom.Constants.UI.CURRENT_PLAYER.toLowerCase()) ? 'class="boom-score-current"' : '';
      $(".boom-highscores-body").append(
        '<tr ' + current + '>' +
          '<td class="boom-shadow-text boom-table-cell">#' + (i+1) +'</td>' +
          '<td class="boom-shadow-text boom-table-cell">' +  user.name + '</td>' +
          '<td class="boom-shadow-text boom-table-cell">' + Boom.padNumber(user.score, 8) + '</td>' +
       '</tr>'
      );
    }

    $(Boom.Constants.UI.ELEMENT.TITLE).show(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.HIGH_SCORE).show(this.animation_speed);

    $(Boom.Constants.UI.ELEMENT.PLAYER_REGISTRATION).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.TITLE_MENU).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.SELECT_LEVEL).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.HUD).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.PLAYER).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.SCORE).hide(this.animation_speed);

    this.in_menu = true;
  },

  selectLevel: function(){
    this.menu_down.play();

    //Generate Available levels
    var level;
    $(".boom-level-list").empty();
    for (level in Boom.Assets.world.MAP) {
      if (!Boom.Assets.world.MAP.hasOwnProperty(level)) {
          continue;
      }
      //level = Boom.Assets.world.MAP[l];
      $(".boom-level-list").append(
        '<li class="boom-start boom-shadow-text boom-level-item" onclick="Boom.GAME_MENU.newGame(\'' + level +'\');">' + level + '</li>'
      );
    }

    $(Boom.Constants.UI.ELEMENT.TITLE).show(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.PLAYER_REGISTRATION).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.TITLE_MENU).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.SELECT_LEVEL).show(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.HUD).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.PLAYER).hide(this.animation_speed);
    $(Boom.Constants.UI.ELEMENT.SCORE).hide(this.animation_speed);

    this.in_menu = true;
  },

  gameOver: function(){
    console.log("GAME OVER SCREEN!");
  },

  gameWon: function(){
    Boom.updateScores();

    var next = this.game.getNextLevel(); 
    if( next ){
      this.newGame( next );  
    }
    else{
      this.mouseRelease();
      this.highScore();
    }
    
  },

  mouseLock: function(){
    //Bind controls and mark as enabled
    var scope = this;
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if ( havePointerLock ) {
      var pointerlockchange = function ( event ) {
        var element = document.body;
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
          Boom.Constants.UI.MOUSE_LOCKED = true;
          $(Boom.Constants.UI.ELEMENT.POINTER_LOCK).hide(scope.animation_speed);
        } else {
          Boom.Constants.UI.MOUSE_LOCKED = false;
          if(!scope.in_menu){
            $(Boom.Constants.UI.ELEMENT.POINTER_LOCK).show(scope.animation_speed*3);
          }
        }
      };
      var pointerlockerror = function ( event ) {
        console.log("ERROR");
      };
      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
    }
  },

  mouseRelease: function(){
    document.exitPointerLock = document.exitPointerLock    ||
                                 document.mozExitPointerLock ||
                                 document.webkitExitPointerLock;
    // Attempt to unlock
    document.exitPointerLock();
  },

  registerMenuScripts: function(){
    //Player registration
    $(Boom.Constants.UI.ELEMENT.REGISTRATION_INPUT).keyup(function() {
      Boom.Constants.UI.CURRENT_PLAYER = $(Boom.Constants.UI.ELEMENT.REGISTRATION_INPUT).val();
    });
  },

  initGame: function(level){
    level = level || 'L1';
    this.game.dispose(); //reset before loading game
    this.game.load( level ); //TODO LOAD GAME HERE WITH A BAR?
  }

};