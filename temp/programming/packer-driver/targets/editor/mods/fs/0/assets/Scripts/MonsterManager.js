System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Prefab, find, resources, instantiate, director, Vec3, RigidBody2D, view, log, warn, GameManager, _dec, _class, _temp, _crd, ccclass, property, MonsterManager;

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

      ({
        ccclass,
        property
      } = _decorator);

      _export("MonsterManager", MonsterManager = (_dec = ccclass('MonsterManager'), _dec(_class = (_temp = class MonsterManager extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_inProcess", false);

          _defineProperty(this, "_canvas", null);

          _defineProperty(this, "_visibleSize", null);

          _defineProperty(this, "_touchX", null);

          _defineProperty(this, "_curMonsterPrefab", null);

          _defineProperty(this, "_cur_level_1", 0);

          _defineProperty(this, "_cur_level_2", 0);

          _defineProperty(this, "_cur_level_3", 0);

          _defineProperty(this, "_monsterSpawnList", []);

          _defineProperty(this, "_nextSpawnIndex", 0);
        }

        // 在数组里，下一个要生成怪物的 index
        onLoad() {
          this._visibleSize = view.getVisibleSize();
        }

        start() {
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).State.CRAFT, this._craftMonster, this);
          this._canvas = find('Canvas');
        }

        touchMove(event) {
          if (this._curMonsterPrefab) {
            this._touchX = event.getUILocation().x;
            let followTouchPos = new Vec3(this._touchX, this._visibleSize.height * 0.8, 0); // 世界坐标

            this._curMonsterPrefab.setWorldPosition(followTouchPos);
          }
        }

        touch(event) {
          if (this._curMonsterPrefab) {
            this._touchX = event.getUILocation().x;
            let touchPos = new Vec3(this._touchX, this._visibleSize.height * 0.8, 0); // 世界坐标

            this._curMonsterPrefab.setWorldPosition(touchPos);
          }
        }

        touchEnd(event) {
          if (this._curMonsterPrefab) {
            let monsterLevel = Number(this._curMonsterPrefab.name.slice(-1));
            let monsterLeft = 0;

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

            let curMonsteRigidBody = this._curMonsterPrefab.getComponent(RigidBody2D);

            this._curMonsterPrefab = null;
            curMonsteRigidBody.wakeUp(); // 唤醒刚体

            this.scheduleOnce(() => {
              this.spawnMonsterOnce(); // 一秒后生成下一只怪物
            }, 1);
          }
        }

        spawnMonsterOnce() {
          // 根据数组一次一次来生成怪物
          let monsterLevel = this._monsterSpawnList[this._nextSpawnIndex];
          let path = `monsters/monster_${monsterLevel}`;
          let initPos = new Vec3(this._visibleSize.width * 0.5, this._visibleSize.height * 0.8, 0); // 50% 宽、80% 高处显示

          this._loadPrefab(path, initPos, true); //this._curMonsterPrefab = Utils.loadPrefab(path, this._canvas, initPos, true)
          //log("this._curMonsterPrefab", this._curMonsterPrefab)


          this._nextSpawnIndex += 1;
        }

        generateMonsterSpawnList() {
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
          let max_level_1 = 20;
          let max_level_2 = 10;
          let max_level_3 = 6;
          let maxLegth = max_level_1 + max_level_2 + max_level_3; // 数组 maxLenth

          let randomNum = 0;

          for (let i = 1; this._monsterSpawnList.length !== maxLegth; i++) {
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
        }

        _craftMonster(curMonsterName, _curMonsterPos) {
          // 两同等级怪物碰撞时生成下一级怪物
          if (!this._inProcess) {
            this._inProcess = true; // 占用

            let nextMonsterLevel = null;
            let nextMonsterPath = null;

            if (curMonsterName === 'monster_3') {
              nextMonsterPath = 'monsters/monster_4_half';
            } else if (curMonsterName === 'monster_4_half') {
              // 游戏胜利
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).GameState.GAME_WIN);
              nextMonsterPath = 'monsters/monster_4';

              this._loadPrefab(nextMonsterPath, _curMonsterPos);

              this.scheduleOnce(() => {
                this._inProcess = false; // 释放占用
              }, 0.1);
              return;
            } else {
              nextMonsterLevel = Number(curMonsterName.slice(-1)) + 1;
              nextMonsterPath = `monsters/monster_${nextMonsterLevel}`;
            }

            this._loadPrefab(nextMonsterPath, _curMonsterPos);

            this.scheduleOnce(() => {
              this._inProcess = false; // 释放占用
            }, 0.1);
          }
        }

        clearLevel() {
          this._curMonsterPrefab = null;
          let canvas = find('Canvas');

          for (let node of canvas.children) {
            if (node.name.slice(0, 7) === 'monster') {
              // 销毁名字以 monster 开头的节点
              node.destroy();
            }
          }
        }

        _loadPrefab(prefabPath, prefabPos, worldPosition = false) {
          resources.load(prefabPath, Prefab, (err, prefab) => {
            if (err) {
              warn("err:", err);
            }

            if (worldPosition) {
              // worldPosition 为真，即当前是通过 touch 方式触发来生成的怪物
              this._curMonsterPrefab = instantiate(prefab);

              this._curMonsterPrefab.setParent(find('Canvas'));

              this._curMonsterPrefab.setWorldPosition(prefabPos);
            } else {
              // worldPosition 为假，即当前是通过两个同等级怪物碰撞而生成的怪物
              let monster = instantiate(prefab);
              monster.setParent(find('Canvas'));
              monster.setPosition(prefabPos);
            }
          });
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=MonsterManager.js.map