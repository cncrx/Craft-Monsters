System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, TiledMap;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "26b23Fh43NEPpe/LMj+gym3", "TiledMap", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("TiledMap", TiledMap = (_dec = ccclass('TiledMap'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TiledMap, _Component);

        function TiledMap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_moving", false);

          _defineProperty(_assertThisInitialized(_this), "_timer", 0);

          return _this;
        }

        var _proto = TiledMap.prototype;

        _proto.start = function start() {
          var _this2 = this;

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.TILE_MOVE, function () {
            _this2._setMovement(true);
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_WIN, function () {
            _this2._setMovement(false);
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, function () {
            _this2._setMovement(false);
          }, this);
        };

        _proto.update = function update(dt) {
          if (this._moving) {
            var pos = this.node.getPosition();
            pos.y += 50 * dt;
            this.node.setPosition(pos);
          }
        };

        _proto._setMovement = function _setMovement(moving) {
          this._moving = moving;
        };

        return TiledMap;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TiledMap.js.map