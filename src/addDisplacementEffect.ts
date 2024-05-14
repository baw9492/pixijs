import {Sprite, DisplacementFilter} from 'pixi.js'
import {app, gameContainer} from './init'

export function addDisplacementEffect() {
  const sprite = Sprite.from('displacement')
  sprite.texture.baseTexture.wrapMode = 'repeat'

  const filter = new DisplacementFilter({
    sprite,
    scale: 50,
    width: app.screen.width,
    height: app.screen.height,
  })

  gameContainer.filters = [filter]
}
