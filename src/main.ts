import {addWaterOverlay} from './WaterOverlay'
import {addBackground} from './addBackground'
import {addButton} from './ui'
import {app, gameState, preload} from './init'
import {player} from './player'
import {addFishes} from './fish'
import {addDisplacementEffect} from './addDisplacementEffect'
;(async () => {
  await preload()
  await app.init({background: '#1099bb', width: 1600, height: 900})
  app.canvas.style.maxHeight = '100%'
  app.canvas.style.maxWidth = '100%'
  document.getElementById('app')!.appendChild(app.canvas)

  addBackground()
  addFishes()
  addWaterOverlay()
  addDisplacementEffect()
  addButton()

  app.stage.on('globalmousemove', (e) => {
    player.setPositions(e.globalX, e.globalY)
  })
  app.stage.eventMode = 'static'

  // initMousePotion()

  let lastState = 0
  window.addEventListener('blur', () => {
    app.ticker.stop()
    lastState = gameState.state
    gameState.state = 2
  })
  window.addEventListener('focus', () => {
    app.ticker.start()
    gameState.state = lastState
  })
})()
