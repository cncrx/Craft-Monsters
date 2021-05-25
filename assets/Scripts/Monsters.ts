
import { _decorator, Component, Node, Contact2DType, PolygonCollider2D, IPhysics2DContact, director, Vec3, log } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Monsters')
export class Monsters extends Component {
    private _inProcess: boolean = false


    start() {
        let collider = this.getComponent(PolygonCollider2D)!
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    
    onBeginContact(selfCollider: PolygonCollider2D, otherCollider: PolygonCollider2D, contact: IPhysics2DContact | null) {
        if (selfCollider.node.name === otherCollider.node.name) { 
            try {
                selfCollider.node.active = false
                this.scheduleOnce(() => {
                    selfCollider.node.destroy()
                }, 1)
            } catch (error) {
                
            }

            let v2Pos = selfCollider.node.position
            let v3Pos = new Vec3(v2Pos.x, v2Pos.y, 0)
            
            let score: string = ""
            switch(selfCollider.node.name) {
                case "monster_1":
                    score = "1000"
                    break
                case "monster_2":
                    score = "2000"
                    break
                case "monster_3":
                    score = "3000"
                    break
                case "monster_4_half":
                    score = "4000"
                    break
            }

            if (!this._inProcess) {
                this.scheduleOnce(() => {
                    this._inProcess = true

                    director.emit(GameManager.State.CRAFT, selfCollider.node.name, v3Pos, this) // 可以生成下一级怪物
                    director.emit(GameManager.State.SCORE_SPAWN, score, v3Pos) // 分数增加

                    this.scheduleOnce(() => {
                        this._inProcess = false
                    }, 0.1)
                }, 0.1) // 给 0.1 秒，等碰撞运算完
            }

        } else if (otherCollider.node.name === "Wall_Top") { // 触顶后游戏失败
            director.emit(GameManager.GameState.GAME_OVER)
        }

    }


}
