
import { _decorator, Component, Node, Vec3, log, find, director, Label } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {
    private _scoreLabel: Node = null!
    private _scoreLabelPos: Vec3 = null!
    private _scorePos: Vec3 = null!

    private _distance: number = 100


    start () {
        this._scoreLabel = find('Canvas/UI/Score_UI/score_label')!
    }


    update(dt: number) {
        if (this._distance >= 30) {

            this._scoreLabelPos = this._scoreLabel.getPosition()
            this._scorePos = this.node.getPosition()
    
            let direction: Vec3 = this._scoreLabelPos.subtract(this._scorePos)
            this._distance = direction.length()
            direction.normalize()

            this.node.setPosition(this.node.getPosition().add(direction.multiplyScalar(650 * dt)))
        } else {
            let scoreNum: number = Number(this.node.getComponent(Label)!.string.slice(1)) // 获取分数
            director.emit(GameManager.State.SCORE_ADD, scoreNum)

            this.node.destroy()
        }
        
    }
}