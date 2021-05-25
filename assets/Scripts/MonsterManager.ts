
import { _decorator, Component, Node, Prefab, find, resources, instantiate, director, Vec3, EventTouch, RigidBody2D, view, Size, tween, UITransform, log, warn } from 'cc';
import { GameManager } from './GameManager';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('MonsterManager')
export class MonsterManager extends Component {


    private _inProcess: boolean = false
    private _canvas: Node = null!
    private _visibleSize: Size = null!
    private _touchX: number = null!

    private _curMonsterPrefab: Node = null! // 当前通过 touch 来操作移动的怪物

    private _cur_level_1: number = 0 // 当前 _monsterSpawnList 数组里有几个 monster_1
    private _cur_level_2: number = 0
    private _cur_level_3: number = 0
    private _monsterSpawnList: number[] = []
    private _nextSpawnIndex: number = 0 // 在数组里，下一个要生成怪物的 index


    onLoad() {
        this._visibleSize = view.getVisibleSize()
    }


    start() {
        director.on(GameManager.State.CRAFT, this._craftMonster, this)
        this._canvas = find('Canvas')!
    }


    public touchMove(event: EventTouch) {
        if (this._curMonsterPrefab) {
            this._touchX = event.getUILocation().x
            let followTouchPos = new Vec3(this._touchX, this._visibleSize.height * 0.8, 0) // 世界坐标
            this._curMonsterPrefab.setWorldPosition(followTouchPos)
        }
    }


    public touch(event: EventTouch) {
        if (this._curMonsterPrefab) {
            this._touchX = event.getUILocation().x
            let touchPos = new Vec3(this._touchX, this._visibleSize.height * 0.8, 0) // 世界坐标
            this._curMonsterPrefab.setWorldPosition(touchPos)
        }
    }


    public touchEnd(event: EventTouch) {
        if (this._curMonsterPrefab) {
            
            let monsterLevel = Number(this._curMonsterPrefab.name.slice(-1))
            let monsterLeft = 0
            switch (monsterLevel) {
                case 1:
                    monsterLeft = --this._cur_level_1
                    break
                case 2:
                    monsterLeft = --this._cur_level_2
                    break
                case 3:
                    monsterLeft = --this._cur_level_3
                    break
            }
            director.emit(GameManager.State.MONSTER_CHANGE, monsterLevel, monsterLeft)

            let curMonsteRigidBody = this._curMonsterPrefab.getComponent(RigidBody2D)
            this._curMonsterPrefab = null!
            curMonsteRigidBody!.wakeUp() // 唤醒刚体
            
            
            this.scheduleOnce(() => {
                this.spawnMonsterOnce() // 一秒后生成下一只怪物
            }, 1)

        }
    }


    public spawnMonsterOnce() { // 根据数组一次一次来生成怪物
        let monsterLevel = this._monsterSpawnList[this._nextSpawnIndex]
        let path = `monsters/monster_${monsterLevel}`
        let initPos = new Vec3(this._visibleSize.width * 0.5, this._visibleSize.height * 0.8, 0) // 50% 宽、80% 高处显示

        this._loadPrefab(path, initPos, true)
        //this._curMonsterPrefab = Utils.loadPrefab(path, this._canvas, initPos, true)
        //log("this._curMonsterPrefab", this._curMonsterPrefab)

        this._nextSpawnIndex += 1
    }


    public generateMonsterSpawnList() {
        
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

        this._monsterSpawnList = [1,] // 开始时第一个怪物指定是 monster_1
        this._nextSpawnIndex = 0
        this._cur_level_1 = 0
        this._cur_level_2 = 0
        this._cur_level_3 = 0

        let max_level_1: number = 20
        let max_level_2: number = 10
        let max_level_3: number = 6
        let maxLegth: number = max_level_1 + max_level_2 + max_level_3 // 数组 maxLenth
        let randomNum: number = 0

        for (let i = 1; this._monsterSpawnList.length !== maxLegth; i++) { // 从 1 开始，数组长度直到满足 maxLegth 才停止循环
            
            randomNum = Math.ceil(Math.random() * 3) // 向上取值，避免取到 0
            switch (randomNum) {
                case 1:
                    if (this._cur_level_1 < max_level_1) { // 如果当前数组的 1 数量小于 max_1
                        this._monsterSpawnList.push(randomNum)
                        this._cur_level_1++
                    }
                    break
                case 2:
                    if (this._cur_level_2 < max_level_2) {
                        this._monsterSpawnList.push(randomNum)
                        this._cur_level_2++
                    }
                    break
                case 3:
                    if (this._cur_level_3 < max_level_3) {
                        this._monsterSpawnList.push(randomNum)
                        this._cur_level_3++
                    }
                    break
            }
        }

        director.emit(GameManager.State.INIT, this._cur_level_1, this._cur_level_2, this._cur_level_3)
        log("this._monsterSpawnList generated", this._monsterSpawnList)
    }


    private _craftMonster(curMonsterName: string, _curMonsterPos: Vec3) { // 两同等级怪物碰撞时生成下一级怪物

        if (!this._inProcess) {
            this._inProcess = true // 占用
        
            let nextMonsterLevel: number = null!
            let nextMonsterPath: string = null!

            if (curMonsterName === 'monster_3') {
                nextMonsterPath = 'monsters/monster_4_half'
            } else if (curMonsterName === 'monster_4_half') { // 游戏胜利
                director.emit(GameManager.GameState.GAME_WIN)

                nextMonsterPath = 'monsters/monster_4'
                this._loadPrefab(nextMonsterPath, _curMonsterPos)

                this.scheduleOnce(() => {
                    this._inProcess = false // 释放占用
                }, 0.1)
                return
            } else {
                nextMonsterLevel = Number(curMonsterName.slice(-1)) + 1
                nextMonsterPath = `monsters/monster_${nextMonsterLevel}`
            }

            this._loadPrefab(nextMonsterPath, _curMonsterPos)

            this.scheduleOnce(() => {
                this._inProcess = false // 释放占用
            }, 0.1)
        }

    }


    public clearLevel() {
        this._curMonsterPrefab = null!

        let canvas: Node = find('Canvas')!
        for (let node of canvas.children) {
            if (node.name.slice(0,7) === 'monster') { // 销毁名字以 monster 开头的节点
                node.destroy()
            }
        }
    }


    private _loadPrefab(prefabPath: string, prefabPos: Vec3, worldPosition: boolean = false) {
        resources.load(prefabPath, Prefab, (err: any, prefab: Prefab) => {
            if (err) {
                warn("err:", err)
            }

            if (worldPosition) {
                // worldPosition 为真，即当前是通过 touch 方式触发来生成的怪物

                this._curMonsterPrefab = instantiate(prefab) as Node

                this._curMonsterPrefab.setParent(find('Canvas'))
                this._curMonsterPrefab.setWorldPosition(prefabPos)
            } else {
                // worldPosition 为假，即当前是通过两个同等级怪物碰撞而生成的怪物

                let monster = instantiate(prefab) as Node

                monster.setParent(find('Canvas'))
                monster.setPosition(prefabPos)
            }
        })
    }

    
    

}

