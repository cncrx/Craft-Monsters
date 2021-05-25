System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, find, instantiate, log, Prefab, resources, Vec3, _dec, _class, _temp, _crd, ccclass, property, MapNodes;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      find = _cc.find;
      instantiate = _cc.instantiate;
      log = _cc.log;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b4d9cjceXhKUqda0IymIFbd", "MapNodes", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MapNodes", MapNodes = (_dec = ccclass('MapNodes'), _dec(_class = (_temp = class MapNodes extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_isAscend", true);

          _defineProperty(this, "_timer", 0);
        }

        start() {}

        update(dt) {
          if (this._isAscend) {
            let pos = this.node.getPosition();
            pos.y += 50 * dt;
            this.node.setPosition(pos);
            this._timer += dt;

            if (this._timer > 991) {
              this._loadEarthMap(new Vec3(pos.x, pos.y - 80, pos.z));

              log('res');
              this._timer = 0;
            }
          }
        }

        _loadEarthMap(pos) {
          resources.load('prefabs/Earth', Prefab, (err, prefab) => {
            if (err) {
              log('err', err);
              return;
            }

            let earthMap = instantiate(prefab);
            earthMap.setParent(find('Canvas/MapNodes'));
            earthMap.setPosition(pos);
          });
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=MapNodes.js.map