System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, log, instantiate, find, Vec3, resources, Prefab, _dec, _dec2, _class, _class2, _descriptor, _temp, _crd, ccclass, property, TiledMapManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      log = _cc.log;
      instantiate = _cc.instantiate;
      find = _cc.find;
      Vec3 = _cc.Vec3;
      resources = _cc.resources;
      Prefab = _cc.Prefab;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "577a0vifNVAIpL/tTqq7IEX", "TiledMapManager", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("TiledMapManager", TiledMapManager = (_dec = ccclass('TiledMapManager'), _dec2 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TiledMapManager, _Component);

        function TiledMapManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "basedMap", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_isAscend", true);

          _defineProperty(_assertThisInitialized(_this), "_timer", 0);

          _defineProperty(_assertThisInitialized(_this), "_cur", 1);

          return _this;
        }

        var _proto = TiledMapManager.prototype;

        // TODO: change var name later
        _proto.start = function start() {// 一上来就要生成10 个 Earth先！
        };

        _proto.update = function update(dt) {
          if (this._isAscend) {
            var basedMapPos = this.basedMap.getPosition();
            basedMapPos.y += 50 * dt;
            this.basedMap.setPosition(basedMapPos);
            this._timer += dt;

            if (this._timer > 0.5) {
              this._loadEarthMap(new Vec3(basedMapPos.x, basedMapPos.y - 50 * this._cur, basedMapPos.z));

              this._cur++;
              this._timer = 0;
            }
          }
        };

        _proto._loadEarthTiledMap = function _loadEarthTiledMap(pos) {
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

        return TiledMapManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "basedMap", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TiledMapManager.js.map