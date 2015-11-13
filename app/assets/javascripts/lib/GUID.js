(function () {
  "use strict";

  /**
   * *The efficient way to create GUID/UUID in JavaScript*
   *
   * see: http://slavik.meltser.info/the-efficient-way-to-create-guid-uuid-in-javascript-with-explanation/
   */

  this.GUID = function () {};

  this.GUID.generate = function () {
    return this._p8() + this._p8(true) + this._p8(true) + this._p8();
  }

  this.GUID._p8 = function (s) {
    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;
  }

}).call(window);
