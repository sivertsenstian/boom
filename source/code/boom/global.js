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
  console.error( "----------------------" );
};