System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Contact2DType, PolygonCollider2D, director, Vec3, GameManager, _dec, _class, _temp, _crd, ccclass, property, Monsters;

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
      Contact2DType = _cc.Contact2DType;
      PolygonCollider2D = _cc.PolygonCollider2D;
      director = _cc.director;
      Vec3 = _cc.Vec3;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ecf84VfB5VKXZ+t0TNyho6B", "Monsters", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Monsters", Monsters = (_dec = ccclass('Monsters'), _dec(_class = (_temp = class Monsters extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_inProcess", false);
        }

        start() {
          let collider = this.getComponent(PolygonCollider2D);
          collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          if (selfCollider.node.name === otherCollider.node.name) {
            try {
              selfCollider.node.active = false;
              this.scheduleOnce(() => {
                selfCollider.node.destroy();
              }, 1);
            } catch (error) {}

            let v2Pos = selfCollider.node.position;
            let v3Pos = new Vec3(v2Pos.x, v2Pos.y, 0);
            let score = "";

            switch (selfCollider.node.name) {
              case "monster_1":
                score = "1000";
                break;

              case "monster_2":
                score = "2000";
                break;

              case "monster_3":
                score = "3000";
                break;

              case "monster_4_half":
                score = "4000";
                break;
            }

            if (!this._inProcess) {
              this.scheduleOnce(() => {
                this._inProcess = true;
                director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).State.CRAFT, selfCollider.node.name, v3Pos, this); // 可以生成下一级怪物

                director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).State.SCORE_SPAWN, score, v3Pos); // 分数增加

                this.scheduleOnce(() => {
                  this._inProcess = false;
                }, 0.1);
              }, 0.1); // 给 0.1 秒，等碰撞运算完
            }
          } else if (otherCollider.node.name === "Wall_Top") {
            // 触顶后游戏失败
            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).GameState.GAME_OVER);
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Monsters.js.map