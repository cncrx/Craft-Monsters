System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, TiledMap;

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

      ({
        ccclass,
        property
      } = _decorator);

      _export("TiledMap", TiledMap = (_dec = ccclass('TiledMap'), _dec(_class = (_temp = class TiledMap extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_moving", false);

          _defineProperty(this, "_timer", 0);
        }

        start() {
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.TILE_MOVE, () => {
            this._setMovement(true);
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_WIN, () => {
            this._setMovement(false);
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, () => {
            this._setMovement(false);
          }, this);
        }

        update(dt) {
          if (this._moving) {
            let pos = this.node.getPosition();
            pos.y += 50 * dt;
            this.node.setPosition(pos);
          }
        }

        _setMovement(moving) {
          this._moving = moving;
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TiledMap.js.map