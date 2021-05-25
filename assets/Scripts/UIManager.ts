
import { _decorator, Component, Node, Label, director, Vec3, log, find, instantiate, Prefab, resources, Animation } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    private _inProcess: boolean = false


    @property({
        type: Node
    })
    public menuUI: Node = null!
    @property({
        type: Node
    })
    public resultUI: Node = null!
    @property({
        type: Node
    })
    public inGameUI: Node = null!
    @property({
        type: Node
    })
    public modeUI: Node = null!

    
    @property({
        type: Label
    })
    monster_1_left_label: Label = null! // 还剩多少个 monster_1
    @property({
        type: Label
    })
    monster_2_left_label: Label = null!
    @property({
        type: Label
    })
    monster_3_left_label: Label = null!
    @property({
        type: Label
    })
    timerLabel: Label = null!
    @property({
        type: Node
    })
    scoreNode: Node = null!
    @property({
        type: Label
    })
    resultLabel: Label = null!


    onLoad () {
        director.on(GameManager.State.INIT, this._initMonsterLabel, this) // 初始化怪物剩余数量
        director.on(GameManager.State.INIT, this._initScoreLabel, this) // 初始化分数
        director.on(GameManager.State.MONSTER_CHANGE, this._changeMonsterLabelNumber, this) // 怪物剩余数量变化

        director.on(GameManager.State.SCORE_SPAWN, this._loadScore, this) // 生成分数
        director.on(GameManager.State.SCORE_ADD, this._setScoreLabel, this) // 分数增加

        director.on(GameManager.GameState.GAME_WIN, () => {this._setResultLabel(true)}, this) // 游戏结束更改结算 Label
        director.on(GameManager.GameState.GAME_OVER, () => {this._setResultLabel(false)}, this)

        director.on(GameManager.GameState.GAME_WIN, this.setResultUIActive, this) // 游戏结束打开结算 UI
        director.on(GameManager.GameState.GAME_OVER, this.setResultUIActive, this)
    }


    private _initMonsterLabel(init_level_1: number, init_level_2: number, init_level_3: number) {
        this.monster_1_left_label.string = String(init_level_1)
        this.monster_2_left_label.string = String(init_level_2)
        this.monster_3_left_label.string = String(init_level_3)
    }

    private _initScoreLabel() {
        this.scoreNode.getComponent(Label)!.string = "0000"
    }


    private _changeMonsterLabelNumber(monsterLevel: number, monsterLeft: number) {
        switch(monsterLevel) {
            case 1:
                this.monster_1_left_label.string = String(monsterLeft)
                break
            case 2:
                this.monster_2_left_label.string = String(monsterLeft)
                break
            case 3:
                this.monster_3_left_label.string = String(monsterLeft)
                break
        }
    }


    private _loadScore(scoreNum: number, pos: Vec3) {
        if (!this._inProcess) {
            this._inProcess = true

            resources.load("effect/score", Prefab, (err: any, prefab: Prefab) => {
                if (err) {
                    console.warn("err:", err)
                }

                let score = instantiate(prefab) as Node
                score.getComponent(Label)!.string = `+ ${scoreNum}`
                score.setParent(find('Canvas/UI/'))
                score.setPosition(pos)
            })

            this.scheduleOnce(() => {
                this._inProcess = false
            }, 0.1)
        }
    }


    public setTimerLabel(min: number | string, sec: number | string) {
        this.timerLabel.string =  `本局用时 ${min} 分 ${sec} 秒`
    }


    private _setScoreLabel(scoreNum: number) {
        let label = this.scoreNode.getComponent(Label)!
        let curScore: number = Number(label.string) // 目前有的分数
        curScore += scoreNum
        label.string = String(curScore)

        let anim = this.scoreNode.getComponent(Animation)!
        anim.play("score_add")
    }


    private _setResultLabel(win: boolean) {
        win ? this.resultLabel.string = '胜利！\n游戏结束！' : this.resultLabel.string = '失败！\n游戏结束！'
    }


    public resultGotoMenu() { // 结算界面去主菜单的按钮回调
        this.setResultUIActive(false)
        this.setInGameUIActive(false)
        this.setMenuUIActive()
    }


    public setMenuUIActive(active: boolean = true) {
        this.menuUI.active = active
    }


    public setResultUIActive(active: boolean = true) {
        this.resultUI.active = active
    }


    public setInGameUIActive(active: boolean = true) {
        this.inGameUI.active = active
    }

    public setModeUIActive(active: boolean = true) {
        this.modeUI.active = active
    }

}
