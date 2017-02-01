//String trim function added here
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

var fa = "FastEthernet";
var gi = "GigabitEthernet";
var con = "Console";
var loop = "Loopback";
var ser = "Serial";
var con = "console";
var vty = "vty";
var trunk = "trunk";
var access = "access";
var auto = "auto";
var dynauto = "dynamic auto";
var dyndes = "dynamic desirable";
var noneg = "no-negotiate"
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
  this.connType = connType;
  this.connPort = connPort;
  this.name = connType + "0/" + connPort.toString();
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
  this.connections = [];
  this.runText = "";
  this.runTextDefault = "";
  this.interfaces = [];
  this.password = null;
  this.isPassEncrypt = false;
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
  this.setPassEncrypt = function(state) {
    this.isPassEncrypt = state;
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
    result = [];
    result.push("!");
    result.push("version 12.2");
    result.push("no service timestamps log datetime msec");
    result.push("no service timestamps debug datetime msec");
    if (this.isPassEncrypt) {
      result.push("service password-encryption");
    } else {
      result.push("no service password-encryption");
    }
    result.push("!");
    result.push(this.hostname);
    result.push("spanning-tree mode pvst");
    result.push("!");
    for (var i=0; i<this.interfaces.length; i++) {
      var currInt = this.interfaces[i];
      result.push("interface " + currInt.name);
      result.push(currInt.desc);
      result.push("switchport mode " + currInt.trunkMode);
      if (currInt.trunkMode == trunk) {
        //insert pruning stuff later
      } else if (currInt.trunkMode == access) {
        result.push("switchport access vlan " + currInt.vlan);
        if (currInt.portsec) {
          result.push("switchport port-security");
          //insert maximum ports later
        } else {
          result.push("no switchport port-security");
        }
      }
      result.push("duplex " + currInt.duplex);
      result.push("speed " + currInt.speed);
      if (currInt.enabled) {
        result.push("no shutdown");
      } else {
        result.push("shutdown");
      }
      result.push("!");
    }
    return result;
  };
  this.getConfigFromBase = function() {
    //This returns a list of steps to configure the switch from a specified default (at first, the switch with no config).
    return [];
  };
  this.compare = function(compareList) {
    
  };
  this.update = function() {
    
  };
  this.checkErrors = function() {
    //check own errors first. Then:
    for (var i=0; i<this.interfaces.length; i++) {
      this.interfaces[i].checkErrors();
    }
    return [];
  };
  this.checkRunChanges = function() {
    
  };
}
