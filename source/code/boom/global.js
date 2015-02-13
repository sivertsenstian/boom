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