var fa = "FastEthernet";
var gi = "GigabitEthernet";
var con = "Console";
var loop = "Loopback";
var ser = "Serial";
var con = "console";
var vty = "vty";
function ciscoLine(connType, connPort) {
  this.login = false;
  this.isPassword = false;
  this.password = "";
  this.setLogin = function(isLogin) {
    this.login = isLogin;
    #--
  };
  this.setPassword = function (falseOrPass) {
    
  };
}
function ciscoInterface(connType, connPort) {
  this.isEnabled = true;
  this.speed = "auto";
  this.duplex = "auto";
  this.portsec = false;
  this.enable = function() {
    
  };
  this.shut = function() {
    
  };
  this.setVlan = function() {
    
  };
  this.setDuplex = function(newDuplex) {
    # newDuplex can be "default"
  };
  this.setSpeed = function(newSpeed) {
    # newSpeed can be "default"
    this.speed = newSpeed;
    this.
  };
  this.setPortsec = function(state) {
    this.portsec = state;
    this.update();
  };
  this.
  this.update = function() {
    
  }
  this.checkErrors = function() {
    return [];
  };
}
function ciscoSwitch() {
  this.runText = "";
  this.runTextDefault = "";
  this.interfaces = [];
  this.password = null;
  this.secret = null;
  for (var i=1; i<25; i++) {
    this.interfaces.push(ciscoInterface(fa, i));
  }
  for (var i=0; i<2; i++) {
    this.interfaces.push(ciscoInterface(gi, i));
  }
  this.runText = "";
  this.hostname = "Switch";
  this.setHostname = function(newName) {
    
  };
  this.setPassword = function(newPass) {
    this.password = newPass;
    this.update();
  };
  this.setSecret = function(newSecret) {
    this.secret = newSecret;
    this.update();
  };
  this.update = function() {
    
  };
  this.checkErrors = function() {
    #check own errors first. Then:
    for (var i=0; i<this.interfaces.length; i++) {
      this.interfaces[i].checkErrors();
    }
    return [];
  };
  this.checkRunChanges = function() {
    
  };
}
