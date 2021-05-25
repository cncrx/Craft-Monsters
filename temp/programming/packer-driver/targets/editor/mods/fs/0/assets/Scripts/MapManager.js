System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Vec3, resources, find, instantiate, log, Prefab, view, director, GameManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _crd, ccclass, property, MapManager;

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
      Vec3 = _cc.Vec3;
      resources = _cc.resources;
      find = _cc.find;
      instantiate = _cc.instantiate;
      log = _cc.log;
      Prefab = _cc.Prefab;
      view = _cc.view;
      director = _cc.director;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3508bVC+X9E2qgc52krW91J", "MapManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MapManager", MapManager = (_dec = ccclass('MapManager'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = class MapManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mapNodes", _descriptor, this);

          _initializerDefineProperty(this, "basedMap", _descriptor2, this);

          _defineProperty(this, "_basedMapPos", null);

          _defineProperty(this, "_earthTileNum", Math.floor(view.getVisibleSize().y / 80));
        }

        start() {
          this._basedMapPos = this.basedMap.getWorldPosition();
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.HARD_MODE, this._spawnEarthTile, this);
        }

        _spawnEarthTile() {
          let cur = 1;

          for (let i = 0; i < this._earthTileNum; i++) {
            this._loadEarthTile(new Vec3(0, this._basedMapPos.y - 95 * cur, this._basedMapPos.z));

            cur++;
          }

          this.scheduleOnce(() => {
            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).GameState.TILE_MOVE);
          }, 1);
        }

        _loadEarthTile(pos) {
          resources.load('prefabs/Earth', Prefab, (err, prefab) => {
            if (err) {
              log('err', err);
              return;
            }

            let earthTile = instantiate(prefab);
            earthTile.setParent(find('Canvas/MapNodes'));
            earthTile.setPosition(pos);
          });
        }

        resetTile(mode) {
          this.basedMap.setParent(find('Canvas'));
          this.mapNodes.removeAllChildren();
          this.basedMap.setParent(this.mapNodes);
          this.basedMap.setWorldPosition(this._basedMapPos);

          if (mode === 'hard') {
            this.scheduleOnce(() => {
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).GameState.TILE_MOVE);
            }, 1);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mapNodes", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "basedMap", [_dec3], {
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
//# sourceMappingURL=MapManager.js.map