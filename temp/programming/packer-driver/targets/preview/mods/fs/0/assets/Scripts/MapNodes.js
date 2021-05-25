System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, find, instantiate, log, Prefab, resources, Vec3, _dec, _class, _temp, _crd, ccclass, property, MapNodes;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("MapNodes", MapNodes = (_dec = ccclass('MapNodes'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MapNodes, _Component);

        function MapNodes() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_isAscend", true);

          _defineProperty(_assertThisInitialized(_this), "_timer", 0);

          return _this;
        }

        var _proto = MapNodes.prototype;

        _proto.start = function start() {};

        _proto.update = function update(dt) {
          if (this._isAscend) {
            var pos = this.node.getPosition();
            pos.y += 50 * dt;
            this.node.setPosition(pos);
            this._timer += dt;

            if (this._timer > 991) {
              this._loadEarthMap(new Vec3(pos.x, pos.y - 80, pos.z));

              log('res');
              this._timer = 0;
            }
          }
        };

        _proto._loadEarthMap = function _loadEarthMap(pos) {
          resources.load('prefabs/Earth', Prefab, function (err, prefab) {
            if (err) {
              log('err', err);
              return;
            }

            var earthMap = instantiate(prefab);
            earthMap.setParent(find('Canvas/MapNodes'));
            earthMap.setPosition(pos);
          });
        };

        return MapNodes;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=MapNodes.js.map