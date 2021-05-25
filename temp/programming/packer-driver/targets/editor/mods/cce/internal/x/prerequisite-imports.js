System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: async function () {
      // Auto generated represents the prerequisite imports of project modules.
      await (async () => {
        const requests = [() => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/GameManager.ts'), () => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/MapManager.ts'), () => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/MonsterManager.ts'), () => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/Monsters.ts'), () => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/Score.ts'), () => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/TiledMap.ts'), () => _context.import('file:///D:/Craft-Monsters/Craft-Monsters/assets/Scripts/UIManager.ts')];

        for (const request of requests) {
          try {
            await request();
          } catch (_err) {// The error should have been caught by executor.
          }
        }
      })();
    }
  };
});
//# sourceMappingURL=prerequisite-imports.js.map