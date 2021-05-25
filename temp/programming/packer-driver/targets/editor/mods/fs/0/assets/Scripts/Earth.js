System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, Earth;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3fdd6/Xs8JKuohPOIiq7Y3G", "Earth", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Earth", Earth = (_dec = ccclass('Earth'), _dec(_class = class Earth extends Component {
        update(dt) {
          let pos = this.node.getPosition();
          pos.y += 50 * dt;
          this.node.setPosition(pos);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Earth.js.map