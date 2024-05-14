import {DisplacementFilter, Graphics, Ticker} from 'pixi.js'
import {app, gameContainer, gameState, useMousePositon} from './init'

export class Player {
  private _self: Graphics

  constructor() {
    this._self = new Graphics().circle(0, 0, 10)
    this._self.fill('red')
    console.log('创建了一个玩家')
  }
  ticker = () => {}
  show() {
    console.log('添加到画布')
    gameContainer.addChild(this._self)
    this._self.visible = true
    // app.ticker.add(this.ticker)
  }
  hide() {
    gameContainer.removeChild(this._self)
    this._self.visible = false
    // app.ticker.remove(this.ticker)
  }
  setPositions(x: number, y: number) {
    this._self.position.set(
      bidui(x, app.screen.width),
      bidui(y, app.screen.height)
    )
  }
  get position() {
    return this._self.position
  }
}

export const player = new Player()

function bidui(num1: number, num2: number): number {
  if (num1 < 0) {
    return 0
  } else if (num1 > num2) {
    return num2
  } else {
    return num1
  }
}
