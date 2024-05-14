import {Texture, TilingSprite} from 'pixi.js'
import {app, gameContainer} from './init'

// Reference to the water overlay.
let overlay: TilingSprite

export function addWaterOverlay() {
  const texture = Texture.from('overlay')

  overlay = new TilingSprite({
    texture,
    width: app.screen.width,
    height: app.screen.height,
  })
  gameContainer.addChild(overlay)
  animateWaterOverlay()
}

export function animateWaterOverlay() {
  app.ticker.add((t) => {
    const dt = t.deltaTime
    overlay.tilePosition.x -= dt
    overlay.tilePosition.y -= dt
  })
}
