
import { _decorator, Component, Node, Vec3, resources, find, instantiate, log, Prefab, view, director, Vec2, Size } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {
    
    @property(Node)
    mapNodes: Node = null!

    @property(Node)
    basedMap: Node = null!


    private _basedMapPos: Vec3 = null!
    private _earthTileNum: number = Math.floor(view.getVisibleSize().y / 80)


    start () {
        this._basedMapPos = this.basedMap.getWorldPosition()
        director.on(GameManager.GameState.HARD_MODE, this._spawnEarthTile, this)
    }

    
    private _spawnEarthTile() {
        let cur: number = 1

        for (let i=0; i<this._earthTileNum; i++) {
            this._loadEarthTile(new Vec3(0, this._basedMapPos.y - 95*cur, this._basedMapPos.z))
            cur ++
        }

        this.scheduleOnce(() => {
            director.emit(GameManager.GameState.TILE_MOVE)
        }, 1)
    }


    private _loadEarthTile(pos: Vec3) {
        resources.load('prefabs/Earth', Prefab, (err: any, prefab: Prefab) => {
            if (err) {
                log('err', err)
                return
            }

            let earthTile = instantiate(prefab) as Node
            earthTile.setParent(find('Canvas/MapNodes'))
            earthTile.setPosition(pos)
        })
    }


    public resetTile(mode: string) {
        this.basedMap.setParent(find('Canvas'))
        this.mapNodes.removeAllChildren()
        this.basedMap.setParent(this.mapNodes)
        this.basedMap.setWorldPosition(this._basedMapPos)

        if (mode === 'hard') {
            this.scheduleOnce(() => {
                director.emit(GameManager.GameState.TILE_MOVE)
            }, 1)
        }
    }
}
