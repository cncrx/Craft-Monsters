
import { _decorator, Component, Node, Vec3, director, log } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('TiledMap')
export class TiledMap extends Component {
    
    private _moving: boolean = false
    private _timer: number = 0


    start () {
        director.on(GameManager.GameState.TILE_MOVE, () => {this._setMovement(true)}, this)
        director.on(GameManager.GameState.GAME_WIN, () => {this._setMovement(false)}, this)
        director.on(GameManager.GameState.GAME_OVER, () => {this._setMovement(false)}, this)
    }


    update(dt: number) {
        if (this._moving) {
            let pos: Vec3 = this.node.getPosition()
            pos.y += 50 * dt
            this.node.setPosition(pos)
        }
    }


    private _setMovement(moving: boolean) {
        this._moving = moving
    }

}