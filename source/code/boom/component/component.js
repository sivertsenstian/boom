Boom.Component = function( params ){
  var params = params || {};
  this.owner = params.owner || this.owner || null;
  this.type = params.type || this.type || Boom.Constants.Component.TYPE.BASIC;
  this.name = params.name || this.name || "UNNAMED";
  this.events = this.events || [];
  this.events.push(Boom.Constants.Message.ALL);

  if( typeof this.owner === 'undefined' || this.owner === null){
      throw Boom.Exceptions.OwnerMissingException;
  }
  this.init();
};

Boom.Component.prototype = {
  constructor: Boom.Component,

  init: function(){

  },

  load: function(){

  },

  update: function(){
    
  },

  receive: function( message ){
    return this.listensTo( message.type );
    /*console.log("----------------------------------");
    console.log ( this.owner.name + " " + this.name + " received message!" );
    console.log( message );
    console.log("----------------------------------");
    console.log();*/
  },

  send: function( message ){
    if( typeof this.owner === 'undefined' || this.owner === null){
      throw Boom.Exceptions.OwnerMissingException;
    }
    //console.log("Component - Sending messsage " + message.type);
    this.owner.send( message );
  },

  listensTo: function( event ){
    return this.events.indexOf( event ) >= 0;
  }

};