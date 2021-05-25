System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Label, director, find, instantiate, Prefab, resources, Animation, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp, _crd, ccclass, property, UIManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
      Node = _cc.Node;
      Label = _cc.Label;
      director = _cc.director;
      find = _cc.find;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      Animation = _cc.Animation;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "79e1aYX7XhLLbC1ssowxHG9", "UIManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Label
      }), _dec7 = property({
        type: Label
      }), _dec8 = property({
        type: Label
      }), _dec9 = property({
        type: Label
      }), _dec10 = property({
        type: Node
      }), _dec11 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = class UIManager extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_inProcess", false);

          _initializerDefineProperty(this, "menuUI", _descriptor, this);

          _initializerDefineProperty(this, "resultUI", _descriptor2, this);

          _initializerDefineProperty(this, "inGameUI", _descriptor3, this);

          _initializerDefineProperty(this, "modeUI", _descriptor4, this);

          _initializerDefineProperty(this, "monster_1_left_label", _descriptor5, this);

          _initializerDefineProperty(this, "monster_2_left_label", _descriptor6, this);

          _initializerDefineProperty(this, "monster_3_left_label", _descriptor7, this);

          _initializerDefineProperty(this, "timerLabel", _descriptor8, this);

          _initializerDefineProperty(this, "scoreNode", _descriptor9, this);

          _initializerDefineProperty(this, "resultLabel", _descriptor10, this);
        }

        onLoad() {
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.INIT, this._initMonsterLabel, this); // 初始化怪物剩余数量

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.INIT, this._initScoreLabel, this); // 初始化分数

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.MONSTER_CHANGE, this._changeMonsterLabelNumber, this); // 怪物剩余数量变化

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.SCORE_SPAWN, this._loadScore, this); // 生成分数

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.SCORE_ADD, this._setScoreLabel, this); // 分数增加

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_WIN, () => {
            this._setResultLabel(true);
          }, this); // 游戏结束更改结算 Label

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, () => {
            this._setResultLabel(false);
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_WIN, this.setResultUIActive, this); // 游戏结束打开结算 UI

          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, this.setResultUIActive, this);
        }

        _initMonsterLabel(init_level_1, init_level_2, init_level_3) {
          this.monster_1_left_label.string = String(init_level_1);
          this.monster_2_left_label.string = String(init_level_2);
          this.monster_3_left_label.string = String(init_level_3);
        }

        _initScoreLabel() {
          this.scoreNode.getComponent(Label).string = "0000";
        }

        _changeMonsterLabelNumber(monsterLevel, monsterLeft) {
          switch (monsterLevel) {
            case 1:
              this.monster_1_left_label.string = String(monsterLeft);
              break;

            case 2:
              this.monster_2_left_label.string = String(monsterLeft);
              break;

            case 3:
              this.monster_3_left_label.string = String(monsterLeft);
              break;
          }
        }

        _loadScore(scoreNum, pos) {
          if (!this._inProcess) {
            this._inProcess = true;
            resources.load("effect/score", Prefab, (err, prefab) => {
              if (err) {
                console.warn("err:", err);
              }

              let score = instantiate(prefab);
              score.getComponent(Label).string = `+ ${scoreNum}`;
              score.setParent(find('Canvas/UI/'));
              score.setPosition(pos);
            });
            this.scheduleOnce(() => {
              this._inProcess = false;
            }, 0.1);
          }
        }

        setTimerLabel(min, sec) {
          this.timerLabel.string = `本局用时 ${min} 分 ${sec} 秒`;
        }

        _setScoreLabel(scoreNum) {
          let label = this.scoreNode.getComponent(Label);
          let curScore = Number(label.string); // 目前有的分数

          curScore += scoreNum;
          label.string = String(curScore);
          let anim = this.scoreNode.getComponent(Animation);
          anim.play("score_add");
        }

        _setResultLabel(win) {
          win ? this.resultLabel.string = '胜利！\n游戏结束！' : this.resultLabel.string = '失败！\n游戏结束！';
        }

        resultGotoMenu() {
          // 结算界面去主菜单的按钮回调
          this.setResultUIActive(false);
          this.setInGameUIActive(false);
          this.setMenuUIActive();
        }

        setMenuUIActive(active = true) {
          this.menuUI.active = active;
        }

        setResultUIActive(active = true) {
          this.resultUI.active = active;
        }

        setInGameUIActive(active = true) {
          this.inGameUI.active = active;
        }

        setModeUIActive(active = true) {
          this.modeUI.active = active;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "menuUI", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resultUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inGameUI", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "modeUI", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "monster_1_left_label", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "monster_2_left_label", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "monster_3_left_label", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "scoreNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=UIManager.js.map