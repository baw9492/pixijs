import {Button} from '@pixi/ui'
import {app, gameContainer, gameState} from './init'
import {Container, Graphics, Text} from 'pixi.js'
import {animateFishes, fishes} from './fish'
import {player} from './player'

export const startButton = new Button(
  new Graphics().rect(0, 0, 160, 80).fill('black')
)

export function addButton() {
  const container = new Container()
  const startText = new Text({
    text: 'START',
    style: {
      fill: 'white',
      fontWeight: 'bold',
      fontFamily: 'Consolas',
      fontSize: 36,
    },
  })
  setCenter(startText)
  startText.position.set(
    startButton.view.width / 2,
    startButton.view.height / 2
  )
  startButton.view.addChild(startText)

  startButton.onHover.connect(() => {
    startText.style.fill = 'red'
  })
  startButton.onOut.connect(() => {
    startText.style.fill = 'white'
  })

  startButton.onPress.connect(() => {
    startButton.view.visible = false
    app.stage.cursor = 'none'

    /* 初始化游戏状态 */
    gameState.state = 1
    gameState.nowFishCount = 0
    gameState.scoure = 0
    animateFishes()

    let index: number | null = null
    index = setInterval(() => {
      if (gameState.state === 2) return
      if (gameState.state === 0) {
        clearInterval(index!)
        return
      }
      const len = gameState.nowFishCount
      if (gameState.nowFishCount < fishes.length) {
        fishes[gameState.nowFishCount].visible = true
        fishes[gameState.nowFishCount].outStage = false
        console.log('add a 🐟')
      }
      gameState.nowFishCount += 1
      gameState.scoure += 1
    }, 1000)
    player.show()
  })

  const text = new Text({
    text: '0',
    style: {
      fontFamily: 'short-stack',
      fill: 'white',
    },
  })

  container.addChild(text)
  text.position.set(10, 10)
  startButton.view.position.set(app.screen.width / 2, app.screen.height / 2)

  setCenter(startButton.view)

  container.addChild(startButton.view)
  app.stage.addChild(container)
  app.ticker.add(() => {
    text.text = gameState.scoure
  })
}

function setCenter(container: Container) {
  container.pivot.set(container.width / 2, container.height / 2)
}
