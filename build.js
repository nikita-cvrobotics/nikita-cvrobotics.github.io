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
  this.isLogSync = false;
  this.setLogin = function(isLogin) {
    this.login = isLogin;
    this.update();
  };
  this.setPassword = function (falseOrPass) {
    if (falseOrPass == false) {
      this.isPassword = false;
      this.password = "";
    } else {
      this.isPassword = true;
      this.password = falseOrPass;
    }
    this.update();
  };
  this.setLogSync = function(state) {
    this.isLogSync = state;
    this.update();
  };
}
function ciscoVlan(vlID) {
  this.vlanID = vlID;
  this.ipaddress = "";
  this.subnetMask = "";
  this.name = "";
  this.desc = "";
  this.setVlan = function(newVlan) {
    this.vlanID = newVlan;
    this.update();
  };
  this.setEncapsulation = function(newEncap) {
    this.encapsulation = newEncap;
    this.update();
  };
  this.setIpAddress = function(newIP) {
    this.ipaddress = newIP;
    this.update();
  };
  this.update = function() {
    
  };
  this.checkErrors = function() {
    return [];
  };
}
function ciscoInterface(connType, connPort) {
  this.enabled = true;
  this.desc = "";
  this.vlan = 1;
  this.speed = "auto";
  this.duplex = "auto";
  this.portsec = false;
  this.portsecMax = 1;
  this.portViolation = "protect";
  this.portSticky = false;
  this.macAddresses = [];
  this.trunkMode = "auto";
  this.trunkNative = 1;
  this.trunkAllowedVlan = [];
  this.enable = function() {
    this.enabled = true;
    this.update();
  };
  this.shut = function() {
    this.enabled = false;
    this.update();
  };
  this.setVlan = function(newVlan) {
    this.vlan = newVlan;
    this.update()
  };
  this.setDuplex = function(newDuplex) {
    this.duplex = newDuplex;
    this.update();
  };
  this.setSpeed = function(newSpeed) {
    this.speed = newSpeed;
    this.update();
  };
  this.setPortsec = function(state) {
    this.portsec = state;
    this.update();
  };
  this.setPortsecMax = function(max) {
    this.portSecMax = max;
    this.update();
  }
  this.setPortViolation = function(action) {
    this.portViolation = action;
    this.update();
  };
  this.setPortSticky = function(state) {
    this.portSticky = state;
    this.update();
  };
  this.setMacs = function(macList) {
    this.macAddresses = macList;
    this.update();
  };
  this.setTrunkMode = function(newMode) {
    this.trunkMode = newMode;
    this.update();
  };
  this.setTrunkNatVlan = function(newVl) {
    this.trunkNative = newVl;
    this.update();
  };
  this.setTruAllowedVlan = function(vlRanges) {
    this.trunkAllowedVlan = vlRanges;
    this.update();
  };
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
  this.defaultGateway = "";
  this.configDefault = null;
  for (var i=1; i<25; i++) {
    this.interfaces.push(ciscoInterface(fa, i));
  }
  for (var i=0; i<2; i++) {
    this.interfaces.push(ciscoInterface(gi, i));
  }
  this.runText = "";
  this.hostname = "Switch";
  this.setHostname = function(newName) {
    this.hostname = newName;
    this.update();
  };
  this.setPassword = function(newPass) {
    this.password = newPass;
    this.update();
  };
  this.setSecret = function(newSecret) {
    this.secret = newSecret;
    this.update();
  };
  this.setDefaultGateway = function(newDefaultGateway) {
    this.defaultGateway = newDefaultGateway;
    this.update();
  }
  this.getRun = function() {
    return("version something");
  };
  this.getConfigFromBase = function() {
    #This returns a list of steps to configure the switch from a specified default (at first, the switch with no config).
    return [];
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
