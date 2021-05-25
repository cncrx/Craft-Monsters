System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, _dec, _class, _temp, _crd, ccclass, property, GameData;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5d569T8Q0VKf42YXk/1xbvr", "GameData", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("GameData", GameData = (_dec = ccclass('GameData'), _dec(_class = (_temp = /*#__PURE__*/function () {
        function GameData() {
          _defineProperty(this, "_monsterSpawnList", []);
        }

        var _proto = GameData.prototype;

        //static monsterSpawnList: number[] = []
        _proto.generateMonsterSpawnList = function generateMonsterSpawnList() {
          // 怪物1 最少多少个... 怪物2 最少多少个... etc.
          this._monsterSpawnList = [1, 2, 1, 2, 1, 3, 2, 2, 3];
          return this._monsterSpawnList;
        };

        return GameData;
      }(), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=GameData.js.map