System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, instantiate, Prefab, resources, warn, log, _dec, _class, _crd, ccclass, property, Utils;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      warn = _cc.warn;
      log = _cc.log;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e1460M/G75EiY8FzKmYFtuj", "Utils", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Utils", Utils = (_dec = ccclass('Utils'), _dec(_class = class Utils extends Component {
        static loadPrefab(path, parent, pos, isSetWorldPos = false) {
          let node = null;
          resources.load(path, Prefab, (err, prefab) => {
            if (err) {
              warn("err:", err);
              return;
            }

            if (isSetWorldPos) {
              node = instantiate(prefab);
              node.setParent(parent);
              node.setWorldPosition(pos);
              log("utils - node1", node);
            } else {
              node = instantiate(prefab);
              node.setParent(parent);
              node.setPosition(pos);
              log("utils - node2", node);
            }
          });
          log("utils - node3", node);
          return node;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Utils.js.map