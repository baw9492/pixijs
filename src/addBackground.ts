import {Sprite} from 'pixi.js'
import {app, gameContainer} from './init'

export function addBackground() {
  const background = Sprite.from('background')

  background.anchor.set(0.5)
  const ratio_app = app.screen.width / app.screen.height
  const ratio_bg = background.width / background.height
  if (ratio_app > ratio_bg) {
    background.width = app.screen.width
    background.scale.y = background.scale.x
  } else {
    background.height = app.screen.height
    background.scale.x = background.scale.y
  }

  // console.log(app.screen.height, background.height)

  background.position = {x: app.screen.width / 2, y: app.screen.height / 2}
  // Add the background to the stage.
  gameContainer.addChild(background)
}
