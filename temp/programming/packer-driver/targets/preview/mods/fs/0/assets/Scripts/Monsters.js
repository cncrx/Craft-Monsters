System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Contact2DType, PolygonCollider2D, director, Vec3, GameManager, _dec, _class, _temp, _crd, ccclass, property, Monsters;

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Monsters", Monsters = (_dec = ccclass('Monsters'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Monsters, _Component);

        function Monsters() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_inProcess", false);

          return _this;
        }

        var _proto = Monsters.prototype;

        _proto.start = function start() {
          var collider = this.getComponent(PolygonCollider2D);
          collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          var _this2 = this;

          if (selfCollider.node.name === otherCollider.node.name) {
            try {
              selfCollider.node.active = false;
              this.scheduleOnce(function () {
                selfCollider.node.destroy();
              }, 1);
            } catch (error) {}

            var v2Pos = selfCollider.node.position;
            var v3Pos = new Vec3(v2Pos.x, v2Pos.y, 0);
            var score = "";

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
              this.scheduleOnce(function () {
                _this2._inProcess = true;
                director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).State.CRAFT, selfCollider.node.name, v3Pos, _this2); // 可以生成下一级怪物

                director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).State.SCORE_SPAWN, score, v3Pos); // 分数增加

                _this2.scheduleOnce(function () {
                  _this2._inProcess = false;
                }, 0.1);
              }, 0.1); // 给 0.1 秒，等碰撞运算完
            }
          } else if (otherCollider.node.name === "Wall_Top") {
            // 触顶后游戏失败
            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).GameState.GAME_OVER);
          }
        };

        return Monsters;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Monsters.js.map