var Boom;

Boom = Boom || {};

Boom.Debug = function() {
  
  this.visible = true;
  this.showFPS = true;
};

Boom.Debug.prototype =  {
  constructor: Boom.Debug,
  
  init: function(){
    //STATS
    this.stats = new Stats();
    this.stats.setMode(0); // 0: fps, 1: ms
    // align top-left
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.zIndex = '1';
    this.stats.domElement.style.display = "none";

    document.body.appendChild( this.stats.domElement );

  },
  update: function(){
    if(this.visible){
      this.stats.domElement.style.display = "";
   
    }
  }
};