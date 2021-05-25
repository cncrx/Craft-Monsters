System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./MapManager", "./MonsterManager", "./UIManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, PhysicsSystem2D, director, MapManager, MonsterManager, UIManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, _crd, ccclass, property, GameState, State, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMapManager(extras) {
    _reporterNs.report("MapManager", "./MapManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMonsterManager(extras) {
    _reporterNs.report("MonsterManager", "./MonsterManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./UIManager", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      director = _cc.director;
    }, function (_MapManager) {
      MapManager = _MapManager.MapManager;
    }, function (_MonsterManager) {
      MonsterManager = _MonsterManager.MonsterManager;
    }, function (_UIManager) {
      UIManager = _UIManager.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0527e0XM+lBiKLzIaxLlv+E", "GameManager", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      (function (GameState) {
        GameState["MENU"] = "menu";
        GameState["START"] = "start";
        GameState["HARD_MODE"] = "hard-mode";
        GameState["TILE_MOVE"] = "tile-move";
        GameState["IN_GAME"] = "in-game";
        GameState["GAME_WIN"] = "game-win";
        GameState["GAME_OVER"] = "game-over";
      })(GameState || (GameState = {}));

      (function (State) {
        State["INIT"] = "init";
        State["CRAFT"] = "craft";
        State["MONSTER_CHANGE"] = "monster-change";
        State["SCORE_SPAWN"] = "score-spawn";
        State["SCORE_ADD"] = "score-add";
      })(State || (State = {}));

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: _crd && MonsterManager === void 0 ? (_reportPossibleCrUseOfMonsterManager({
          error: Error()
        }), MonsterManager) : MonsterManager
      }), _dec3 = property({
        type: _crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
          error: Error()
        }), UIManager) : UIManager
      }), _dec4 = property({
        type: _crd && MapManager === void 0 ? (_reportPossibleCrUseOfMapManager({
          error: Error()
        }), MapManager) : MapManager
      }), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);

        function GameManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "monsterManager", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "uiManager", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mapManager", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_timer", 0);

          _defineProperty(_assertThisInitialized(_this), "_counting", false);

          return _this;
        }

        var _proto = GameManager.prototype;

        _proto.start = function start() {
          var _this2 = this;

          this.uiManager.setMenuUIActive(); // 游戏开始时打开菜单 UI

          PhysicsSystem2D.instance.enable = true;
          director.on(GameManager.GameState.GAME_OVER, this._timeCountFinished, this); // 游戏结束时停止统计时长

          director.on(GameManager.GameState.GAME_OVER, function () {
            _this2._setInputActive(false);
          }, this); // 游戏结束时禁止操作

          director.on(GameManager.GameState.GAME_WIN, this._timeCountFinished, this); // 游戏结束时停止统计时长

          director.on(GameManager.GameState.GAME_WIN, function () {
            _this2._setInputActive(false);
          }, this); // 游戏结束时禁止操作

          this.node.on('touch-move', this.monsterManager.touchMove, this.monsterManager); // 手指移动

          this.node.on('touch-start', this.monsterManager.touch, this.monsterManager); // 手指点击

          this.node.on('touch-end', this.monsterManager.touchEnd, this.monsterManager); // 手指松开
        };

        _proto.update = function update(dt) {
          if (this._counting) {
            this._timer += dt;
          }
        };

        _proto.init = function init(event, mode) {
          var _this3 = this;

          this._timer = 0; // 重置计时

          this.uiManager.setMenuUIActive(false); // 关闭菜单 UI

          this.uiManager.setResultUIActive(false); // 关闭结算 UI

          this.uiManager.setModeUIActive(false); // 关闭菜单 UI

          this.uiManager.setInGameUIActive(); // 打开游戏 UI

          this.monsterManager.clearLevel(); // 清空关卡

          this.mapManager.resetTile(mode); // reset Tile

          this.scheduleOnce(function () {
            _this3.monsterManager.generateMonsterSpawnList(); // 生成数组


            _this3.monsterManager.spawnMonsterOnce(); // 生成第一只怪物


            _this3._counting = true; // 开始计时
          }, 1);
          director.emit(GameState.START);

          if (mode === 'hard') {
            director.emit(GameState.HARD_MODE);
          }

          this._setInputActive(); // 游戏开始再允许操作

        };

        _proto.exit = function exit() {
          console.info("exit game button................");
        };

        _proto._timeCountFinished = function _timeCountFinished() {
          this._counting = false;
          var min = 0;
          var sec = 0;
          this._timer = Math.floor(this._timer);
          min = Math.floor(this._timer / 60);
          sec = this._timer - min * 60;
          min = min < 10 ? '0' + min : min;
          sec = sec < 10 ? '0' + sec : sec;
          this.uiManager.setTimerLabel(min, sec);
        };

        _proto._setInputActive = function _setInputActive(active) {
          if (active === void 0) {
            active = true;
          }

          if (active) {
            this.node.on('touch-move', this.monsterManager.touchMove, this.monsterManager); // 手指移动

            this.node.on('touch-start', this.monsterManager.touch, this.monsterManager); // 手指点击

            this.node.on('touch-end', this.monsterManager.touchEnd, this.monsterManager); // 手指松开
          } else {
            this.node.off('touch-move'); // 手指移动

            this.node.off('touch-start'); // 手指点击

            this.node.off('touch-end'); // 手指松开
          }
        };

        return GameManager;
      }(Component), _defineProperty(_class3, "State", State), _defineProperty(_class3, "GameState", GameState), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "monsterManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uiManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mapManager", [_dec4], {
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
//# sourceMappingURL=GameManager.js.map