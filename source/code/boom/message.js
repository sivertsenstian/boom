Boom.Message = function( params ){
  params = params || {};
  
  this.sender = params.sender || null;
  this.receiver = params.receiver || null;
  this.type = params.type || null;
  this.data = params.data || null;

  this.init();
};

Boom.Message.prototype = {
  constructor: Boom.Message,

  init: function(){

  }

};
