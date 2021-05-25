System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, instantiate, Prefab, resources, warn, log, _dec, _class, _crd, ccclass, property, Utils;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Utils", Utils = (_dec = ccclass('Utils'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Utils, _Component);

        function Utils() {
          return _Component.apply(this, arguments) || this;
        }

        Utils.loadPrefab = function loadPrefab(path, parent, pos, isSetWorldPos) {
          if (isSetWorldPos === void 0) {
            isSetWorldPos = false;
          }

          var node = null;
          resources.load(path, Prefab, function (err, prefab) {
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
        };

        return Utils;
      }(Component)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Utils.js.map