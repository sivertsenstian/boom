Boom.SprintActionComponent = function( params ) {
  params = params || {};
  this.speed = 2.5;
  this.active = false;
  this.duration = 3000;
  this.used = 0.0;

  this.cooldown = 10000;
  this.cooled = 0.0;

  this.delta = Boom.getCurrentTime();
  this.type = params.type || Boom.Constants.Component.TYPE.ACTION;
  this.events = [Boom.Constants.Message.Action.SPRINT_START, Boom.Constants.Message.Action.SPRINT_STOP];

  this.sprint_start = { receiver: Boom.Constants.Component.TYPE.ACTION, data: this.speed, type: Boom.Constants.Message.Action.SPRINTING, sender: this.type };
  this.sprint_end = { receiver: Boom.Constants.Component.TYPE.ACTION, data: -this.speed, type: Boom.Constants.Message.Action.SPRINTING, sender: this.type };

  //HUD
  this.registerHUD = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'SPRINT', color: 'yellow', value: (this.duration - this.used) }, type: Boom.Constants.Message.HUD.REGISTER, sender: this.type });
  this.updateHUD = new Boom.Message({ receiver: Boom.Constants.Component.TYPE.HUD, data: { name: 'SPRINT', value: null }, type: Boom.Constants.Message.HUD.UPDATE, sender: this.type });
  //Call super
  Boom.Component.call(this, params );
};

Boom.SprintActionComponent.prototype = Boom.inherit(Boom.Component, {
  constructor: Boom.SprintActionComponent,

  init: function() {
    this.send(this.registerHUD);
    //Call super
    Boom.Component.prototype.init.call(this);
  },

  load: function(){
    //Call super
    Boom.Component.prototype.load.call(this);
    
  },

  update: function(){
    if(this.active){ //if sprinting
      Boom.changeFoV( Boom.Constants.Base.FOV + 5 );
      //when player has sprinted consecutively for the duration (in ms) - stop sprinting, and start full cooldown period
      if(this.used >= this.duration){
        this.send( this.sprint_end );
        this.active = false;
        this.on_cooldown = true;
        this.used = 0.0;
      }
      else{ //when player is sprinting, set cooldown to 0.0 and count used duration (in ms)
        this.cooled = 0.0;
        this.used += (Boom.getCurrentTime() - this.delta);
      }
    }
    else{ //if not sprinting
      Boom.changeFoV( Boom.Constants.Base.FOV );
      if(this.cooled >= this.cooldown){ //when cooldown-period has finished, reset it and allow a new sprint to start
        this.on_cooldown = false;
        this.cooled = 0.0;
      }
      else{ // when player is not sprinting, count cooldown-period, and reduce current used by half of this 
        this.cooled += (Boom.getCurrentTime() - this.delta);
        this.used = Math.max(0, ((this.used - (Boom.getCurrentTime() - this.delta)/2)));
      }
    }
    
    this.delta = Boom.getCurrentTime();

    if(this.on_cooldown){
      this.updateHUD.data.value = ((this.cooldown - this.cooled) / 1000).toFixed(2);
      this.updateHUD.data.color = 'red';
      this.send(this.updateHUD);
    }
    else{
      if(this.updateHUD.data.value !== ((this.duration - this.used) / 1000).toFixed(2)){
        this.updateHUD.data.value = ((this.duration - this.used) / 1000).toFixed(2);
        this.updateHUD.data.color = 'white';
        this.send(this.updateHUD);
      }
    }
    //Call super
    Boom.Component.prototype.update.call(this);
  },

  receive: function( message ){
    //Call super
    if(Boom.Component.prototype.receive.call(this, message)){
      var velocity, action_msg;
      switch( message.type ){
        case Boom.Constants.Message.Action.SPRINT_START:
          if(!this.active && !this.on_cooldown){
            this.active = true;
            this.send( this.sprint_start );
          }
          break;
        case Boom.Constants.Message.Action.SPRINT_STOP:
          if(this.active){
            this.active = false;
            this.send( this.sprint_end );
          }
          break;
        default:
          console.log( "UNKNOWN MESSAGE!" );
          console.log( message );
          return;
      }
    }
  }

});