System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Prefab, find, resources, instantiate, director, Vec3, RigidBody2D, view, log, warn, GameManager, _dec, _class, _temp, _crd, ccclass, property, MonsterManager;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
      Prefab = _cc.Prefab;
      find = _cc.find;
      resources = _cc.resources;
      instantiate = _cc.instantiate;
      director = _cc.director;
      Vec3 = _cc.Vec3;
      RigidBody2D = _cc.RigidBody2D;
      view = _cc.view;
      log = _cc.log;
      warn = _cc.warn;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d3238dR465KhrVoJXrJfXx/", "MonsterManager", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("MonsterManager", MonsterManager = (_dec = ccclass('MonsterManager'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MonsterManager, _Component);

        function MonsterManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_inProcess", false);

          _defineProperty(_assertThisInitialized(_this), "_canvas", null);

          _defineProperty(_assertThisInitialized(_this), "_visibleSize", null);

          _defineProperty(_assertThisInitialized(_this), "_touchX", null);

          _defineProperty(_assertThisInitialized(_this), "_curMonsterPrefab", null);

          _defineProperty(_assertThisInitialized(_this), "_cur_level_1", 0);

          _defineProperty(_assertThisInitialized(_this), "_cur_level_2", 0);

          _defineProperty(_assertThisInitialized(_this), "_cur_level_3", 0);

          _defineProperty(_assertThisInitialized(_this), "_monsterSpawnList", []);

          _defineProperty(_assertThisInitialized(_this), "_nextSpawnIndex", 0);

          return _this;
        }

        var _proto = MonsterManager.prototype;

        // 在数组里，下一个要生成怪物的 index
        _proto.onLoad = function onLoad() {
          this._visibleSize = view.getVisibleSize();
        };

        _proto.start = function start() {
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.CRAFT, this._craftMonster, this);
          this._canvas = find('Canvas');
        };

        _proto.touchMove = function touchMove(event) {
          if (this._curMonsterPrefab) {
            this._touchX = event.getUILocation().x;
            var followTouchPos = new Vec3(this._touchX, this._visibleSize.height * 0.8, 0); // 世界坐标

            this._curMonsterPrefab.setWorldPosition(followTouchPos);
          }
        };

        _proto.touch = function touch(event) {
          if (this._curMonsterPrefab) {
            this._touchX = event.getUILocation().x;
            var touchPos = new Vec3(this._touchX, this._visibleSize.height * 0.8, 0); // 世界坐标

            this._curMonsterPrefab.setWorldPosition(touchPos);
          }
        };

        _proto.touchEnd = function touchEnd(event) {
          var _this2 = this;

          if (this._curMonsterPrefab) {
            var monsterLevel = Number(this._curMonsterPrefab.name.slice(-1));
            var monsterLeft = 0;

            switch (monsterLevel) {
              case 1:
                monsterLeft = --this._cur_level_1;
                break;

              case 2:
                monsterLeft = --this._cur_level_2;
                break;

              case 3:
                monsterLeft = --this._cur_level_3;
                break;
            }

            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).State.MONSTER_CHANGE, monsterLevel, monsterLeft);

            var curMonsteRigidBody = this._curMonsterPrefab.getComponent(RigidBody2D);

            this._curMonsterPrefab = null;
            curMonsteRigidBody.wakeUp(); // 唤醒刚体

            this.scheduleOnce(function () {
              _this2.spawnMonsterOnce(); // 一秒后生成下一只怪物

            }, 1);
          }
        };

        _proto.spawnMonsterOnce = function spawnMonsterOnce() {
          // 根据数组一次一次来生成怪物
          var monsterLevel = this._monsterSpawnList[this._nextSpawnIndex];
          var path = "monsters/monster_" + monsterLevel;
          var initPos = new Vec3(this._visibleSize.width * 0.5, this._visibleSize.height * 0.8, 0); // 50% 宽、80% 高处显示

          this._loadPrefab(path, initPos, true); //this._curMonsterPrefab = Utils.loadPrefab(path, this._canvas, initPos, true)
          //log("this._curMonsterPrefab", this._curMonsterPrefab)


          this._nextSpawnIndex += 1;
        };

        _proto.generateMonsterSpawnList = function generateMonsterSpawnList() {
          /*
              let min_level_1: number = 16
              let min_level_2: number = 8
              let min_level_3: number = 4
                至少需要 16 个 monster_1,
              8 个 monster_2,
              4 个 monster_3,
              4 个 monster_3 可以合成 2 个最终怪物的一半
              而 2 个最终怪物的一半 可以合成最终的大怪物，取得游戏胜利
          */
          this._monsterSpawnList = [1]; // 开始时第一个怪物指定是 monster_1

          this._nextSpawnIndex = 0;
          this._cur_level_1 = 0;
          this._cur_level_2 = 0;
          this._cur_level_3 = 0;
          var max_level_1 = 20;
          var max_level_2 = 10;
          var max_level_3 = 6;
          var maxLegth = max_level_1 + max_level_2 + max_level_3; // 数组 maxLenth

          var randomNum = 0;

          for (var i = 1; this._monsterSpawnList.length !== maxLegth; i++) {
            // 从 1 开始，数组长度直到满足 maxLegth 才停止循环
            randomNum = Math.ceil(Math.random() * 3); // 向上取值，避免取到 0

            switch (randomNum) {
              case 1:
                if (this._cur_level_1 < max_level_1) {
                  // 如果当前数组的 1 数量小于 max_1
                  this._monsterSpawnList.push(randomNum);

                  this._cur_level_1++;
                }

                break;

              case 2:
                if (this._cur_level_2 < max_level_2) {
                  this._monsterSpawnList.push(randomNum);

                  this._cur_level_2++;
                }

                break;

              case 3:
                if (this._cur_level_3 < max_level_3) {
                  this._monsterSpawnList.push(randomNum);

                  this._cur_level_3++;
                }

                break;
            }
          }

          director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.INIT, this._cur_level_1, this._cur_level_2, this._cur_level_3);
          log("this._monsterSpawnList generated", this._monsterSpawnList);
        };

        _proto._craftMonster = function _craftMonster(curMonsterName, _curMonsterPos) {
          var _this3 = this;

          // 两同等级怪物碰撞时生成下一级怪物
          if (!this._inProcess) {
            this._inProcess = true; // 占用

            var nextMonsterLevel = null;
            var nextMonsterPath = null;

            if (curMonsterName === 'monster_3') {
              nextMonsterPath = 'monsters/monster_4_half';
            } else if (curMonsterName === 'monster_4_half') {
              // 游戏胜利
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).GameState.GAME_WIN);
              nextMonsterPath = 'monsters/monster_4';

              this._loadPrefab(nextMonsterPath, _curMonsterPos);

              this.scheduleOnce(function () {
                _this3._inProcess = false; // 释放占用
              }, 0.1);
              return;
            } else {
              nextMonsterLevel = Number(curMonsterName.slice(-1)) + 1;
              nextMonsterPath = "monsters/monster_" + nextMonsterLevel;
            }

            this._loadPrefab(nextMonsterPath, _curMonsterPos);

            this.scheduleOnce(function () {
              _this3._inProcess = false; // 释放占用
            }, 0.1);
          }
        };

        _proto.clearLevel = function clearLevel() {
          this._curMonsterPrefab = null;
          var canvas = find('Canvas');

          for (var _iterator = _createForOfIteratorHelperLoose(canvas.children), _step; !(_step = _iterator()).done;) {
            var node = _step.value;

            if (node.name.slice(0, 7) === 'monster') {
              // 销毁名字以 monster 开头的节点
              node.destroy();
            }
          }
        };

        _proto._loadPrefab = function _loadPrefab(prefabPath, prefabPos, worldPosition) {
          var _this4 = this;

          if (worldPosition === void 0) {
            worldPosition = false;
          }

          resources.load(prefabPath, Prefab, function (err, prefab) {
            if (err) {
              warn("err:", err);
            }

            if (worldPosition) {
              // worldPosition 为真，即当前是通过 touch 方式触发来生成的怪物
              _this4._curMonsterPrefab = instantiate(prefab);

              _this4._curMonsterPrefab.setParent(find('Canvas'));

              _this4._curMonsterPrefab.setWorldPosition(prefabPos);
            } else {
              // worldPosition 为假，即当前是通过两个同等级怪物碰撞而生成的怪物
              var monster = instantiate(prefab);
              monster.setParent(find('Canvas'));
              monster.setPosition(prefabPos);
            }
          });
        };

        return MonsterManager;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=MonsterManager.js.map