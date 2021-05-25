
import { _decorator, Component, Node, PhysicsSystem2D, director, log } from 'cc';
import { MapManager } from './MapManager';
import { MonsterManager } from './MonsterManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;


enum GameState {
    MENU = 'menu',
    START = 'start',
    HARD_MODE = 'hard-mode',
    TILE_MOVE = 'tile-move',
    IN_GAME = 'in-game',
    GAME_WIN = 'game-win', // 游戏胜利
    GAME_OVER = 'game-over' // 游戏失败
}

enum State {
    INIT = 'init', // 怪物初始数量
    CRAFT = 'craft', // 怪物合成
    MONSTER_CHANGE = 'monster-change', // 怪物数量变化
    SCORE_SPAWN = 'score-spawn', // 生成分数
    SCORE_ADD = 'score-add', // 分数增加
}


@ccclass('GameManager')
export class GameManager extends Component {

    @property({
        type: MonsterManager
    })
    monsterManager: MonsterManager = null!
    @property({
        type: UIManager
    })
    uiManager: UIManager = null!
    @property({
        type: MapManager
    })
    mapManager: MapManager = null!


    public static State = State
    public static GameState = GameState

    private _timer: number = 0
    private _counting: boolean = false
    

    start () {
        this.uiManager.setMenuUIActive() // 游戏开始时打开菜单 UI
        PhysicsSystem2D.instance.enable = true

        director.on(GameManager.GameState.GAME_OVER, this._timeCountFinished, this) // 游戏结束时停止统计时长
        director.on(GameManager.GameState.GAME_OVER, () => {this._setInputActive(false)}, this) // 游戏结束时禁止操作
        director.on(GameManager.GameState.GAME_WIN, this._timeCountFinished, this) // 游戏结束时停止统计时长
        director.on(GameManager.GameState.GAME_WIN, () => {this._setInputActive(false)}, this) // 游戏结束时禁止操作

        this.node.on('touch-move', this.monsterManager.touchMove, this.monsterManager) // 手指移动
        this.node.on('touch-start', this.monsterManager.touch, this.monsterManager) // 手指点击
        this.node.on('touch-end', this.monsterManager.touchEnd, this.monsterManager) // 手指松开
    }


    update(dt: number) {
        if (this._counting) {
            this._timer += dt
        }
    }


    init(event: Event, mode: string) {
        this._timer = 0 // 重置计时

        this.uiManager.setMenuUIActive(false) // 关闭菜单 UI
        this.uiManager.setResultUIActive(false) // 关闭结算 UI
        this.uiManager.setModeUIActive(false) // 关闭菜单 UI
        this.uiManager.setInGameUIActive() // 打开游戏 UI

        this.monsterManager.clearLevel() // 清空关卡
        this.mapManager.resetTile(mode) // reset Tile

        this.scheduleOnce(() => {
            this.monsterManager.generateMonsterSpawnList() // 生成数组
            this.monsterManager.spawnMonsterOnce() // 生成第一只怪物
            this._counting = true // 开始计时
        }, 1)

        director.emit(GameState.START)
        if (mode === 'hard') {
            director.emit(GameState.HARD_MODE)
        }

        this._setInputActive() // 游戏开始再允许操作
    }


    exit() {
        console.info("exit game button................")
    }

    private _timeCountFinished() {
        this._counting = false
        let min: number | string = 0
        let sec: number | string = 0

        this._timer = Math.floor(this._timer)
        min = Math.floor(this._timer / 60)
        sec = this._timer - (min * 60)

        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec

        this.uiManager.setTimerLabel(min, sec)
    }

    private _setInputActive(active: boolean = true) {
        if (active) {
            this.node.on('touch-move', this.monsterManager.touchMove, this.monsterManager) // 手指移动
            this.node.on('touch-start', this.monsterManager.touch, this.monsterManager) // 手指点击
            this.node.on('touch-end', this.monsterManager.touchEnd, this.monsterManager) // 手指松开
        } else {
            this.node.off('touch-move') // 手指移动
            this.node.off('touch-start') // 手指点击
            this.node.off('touch-end') // 手指松开
        }
    }

}
