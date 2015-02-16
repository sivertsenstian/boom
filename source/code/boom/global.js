var Boom;
Boom = Boom || {};

Boom.inherit = function(classObj, members) {
  var base = Object.create(classObj.prototype);

  Object.getOwnPropertyNames(members).forEach(function(prop) {
    var desc = Object.getOwnPropertyDescriptor(members, prop);

    if (desc.get !== undefined) {
      base.__defineGetter__(prop, desc.get);
    } else {
      base[prop] = members[prop];
    }

    if (desc.set !== undefined) {
      base.__defineSetter__(prop, desc.set);
    }
  });
  
  return base;
};

Boom.bind = function( scope, fn ) {

  return function () {

    fn.apply( scope, arguments );

  };

};

Boom.getCurrentTime = function(){
  return Date.now();
};

Boom.msToFrames = function(ms) {
  return Math.round(ms / 16.66);
};

Boom.handleError = function( error, location ) {
  if (typeof(location) === "undefined"){
    location = "unknown";
  }
  console.error( "----------------------" );
  console.error("Error occured in " + location);
  console.error( error );
  console.error( error.stack );
  console.error( "----------------------" );
  throw new Error('Exiting due to error...');
};

Boom.color = function(){
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};

Boom.guid = function b(a) {
  return a ? (a^Math.random()*16>>a/4).toString(16) : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g , b)
};

Boom.randomRange = function(min, max){
  return Math.random() * (max - min) + min;
};

Boom.changeFoV = function( fov ){
  if(Boom.Constants.PLAYER_CAMERA.fov !== fov){
    Boom.Constants.PLAYER_CAMERA.fov = fov;
    Boom.Constants.PLAYER_CAMERA.updateProjectionMatrix();
  }
};

Boom.padNumber = function(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
};

//SCORE STUFF - TODO: MOVE THIS?
Boom.sortScores = function(a, b) {
  if (a.score < b.score)
     return 1;
  if (a.score > b.score)
    return -1;
  return 0;
};

Boom.addScore = function( score ){
  Boom.Constants.UI.CURRENT_SCORE += score; 
};

Boom.updateScores = function(){
  var user;
  for(var i = 0; i < Boom.Assets.ui.HIGHSCORES.length; i++){
      user = Boom.Assets.ui.HIGHSCORES[i];
      if(user.name.toLowerCase() === Boom.Constants.UI.CURRENT_PLAYER.toLowerCase() &&
         Boom.Constants.UI.CURRENT_SCORE > user.score){
        user.score = Boom.Constants.UI.CURRENT_SCORE;
        return;
      }
  }
  if(Boom.Constants.UI.CURRENT_PLAYER.toLowerCase() !== 'UNREGISTERED'.toLowerCase()){
    Boom.Assets.ui.HIGHSCORES.push({
                                    name: Boom.Constants.UI.CURRENT_PLAYER, 
                                    score:  Boom.Constants.UI.CURRENT_SCORE
                                  });
  }

  Boom.Constants.UI.CURRENT_SCORE = 0; //Reset score
};