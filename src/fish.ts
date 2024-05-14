import {ColorMatrixFilter, Container, Sprite, Ticker} from 'pixi.js'
import {app, gameContainer, gameState} from './init'
import {startButton} from './ui'
import {player} from './player'

type Fish = Sprite &
  Record<string, any> & {outStage?: boolean; touched?: boolean}

const _count = 60
export const fishes: Fish[] = []
let gameTickerIsRunning = false

export function addFishes() {
  const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5']
  const fishContainer = new Container()
  for (let i = 0; i < _count; i++) {
    const fish: Fish = Sprite.from(
      fishAssets[fishes.length % fishAssets.length]
    )
    fish.anchor.set(0.5)
    fish.scale.set(0.5)
    fish.direction = Math.random() * Math.PI * 2
    fish.rotation = Math.PI + fish.direction
    fish.speed = Math.random() * 2 + 3
    const edge = Math.floor(Math.random() * 4)
    /* 单上下双左右 */
    if (edge === 0) {
      fish.y = -100
    } else if (edge === 2) {
      fish.y = app.screen.height + 100
    } else if (edge === 1) {
      fish.x = -100
    } else if (edge === 3) {
      fish.x = app.screen.width + 100
    }
    if (edge % 2) {
      fish.y = Math.random() * app.screen.height
    } else {
      fish.x = Math.random() * app.screen.width
    }
    fish.visible = false
    fish.outStage = true

    fishes.push(fish)
    gameState.nowFishCount += 1
    fishContainer.addChild(fish)
    gameContainer.addChild(fishContainer)
  }
}

export function animateFishes() {
  console.log('run me')

  if (!gameTickerIsRunning) {
    app.ticker.add(gameTicker)
    gameTickerIsRunning = true
  }
}

export const gameTicker = (t: Ticker) => {
  if (fishes.length && fishes.every((v) => v.none)) {
    app.ticker.remove(gameTicker)
    console.log('已移除 gameTicker')
  }
  const stagePadding = 100
  const boundWidth = app.screen.width + stagePadding * 2
  const boundHeight = app.screen.height + stagePadding * 2

  for (let i = 0; i < _count; i++) {
    const fish = fishes[i]
    if (fish.outStage && fish.visible === false) continue

    const {x, y} = player.position
    if (
      fish.visible &&
      gameState.state &&
      fish.getBounds().containsPoint(x, y)
    ) {
      console.log('game over')
      app.stage.cursor = ''
      gameState.state = 0
      tiaose(fish)
      fish.touched = true
      startButton.view.visible = true
      // document.getElementById('app')!.style.cursor = ''
      fishes.forEach((v) => (v.outStage = true))
      player.hide()
    }

    fish.y += Math.sin(fish.direction) * fish.speed * t.deltaTime
    fish.x += Math.cos(fish.direction) * fish.speed * t.deltaTime

    if (fish.x < -stagePadding) {
      fish.x += boundWidth
      changeFishByGameState(fish)
    } else if (fish.x > app.screen.width + stagePadding) {
      fish.x -= boundWidth
      changeFishByGameState(fish)
    }
    if (fish.y < -stagePadding) {
      fish.y += boundHeight
      changeFishByGameState(fish)
    } else if (fish.y > app.screen.height + stagePadding) {
      fish.y -= boundHeight
      changeFishByGameState(fish)
    }
  }
}

/** 游到边缘时 */
function changeFishByGameState(fish: Fish) {
  if (gameState.state === 0 && fish.outStage) {
    fish.visible = false
  }
  if (fish.touched) {
    fish.filters = []
  }
}

function tiaose(fish: Fish) {
  const colorMatrix = new ColorMatrixFilter()

  // 设置颜色矩阵为绿色
  colorMatrix.matrix = [
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  ]
  fish.filters = [colorMatrix]
}

// enum FishState {
//   退场,
//   在场,
//   屏幕内,
//   屏幕外,
// }
// 当游戏结束时, 数组内所有🐟设置为退场
// 当游戏开始时, 让🐟逐个上场
// 退场的鱼将游出屏幕, 并呆在屏幕外, 且visiable = false
// 在场的鱼 visiable = true, 且运行完整的帧动画
