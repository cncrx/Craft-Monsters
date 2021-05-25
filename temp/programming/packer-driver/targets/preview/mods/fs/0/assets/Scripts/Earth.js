System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, Earth;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3fdd6/Xs8JKuohPOIiq7Y3G", "Earth", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Earth", Earth = (_dec = ccclass('Earth'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Earth, _Component);

        function Earth() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = Earth.prototype;

        _proto.update = function update(dt) {
          var pos = this.node.getPosition();
          pos.y += 50 * dt;
          this.node.setPosition(pos);
        };

        return Earth;
      }(Component)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Earth.js.map