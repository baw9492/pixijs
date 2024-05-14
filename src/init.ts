import {Application, Assets, Container} from 'pixi.js'
/* 为了避免管理困难, 不要在此进行任何自定义模块导入 */

export const app = new Application()
export const gameContainer = new Container()
app.stage.addChild(gameContainer)

export async function preload() {
  const assets = [
    {
      alias: 'background',
      src: '/fish-pond/pond_background.jpg',
    },
    {
      alias: 'fish1',
      src: '/fish-pond/fish1.png',
    },
    {
      alias: 'fish2',
      src: '/fish-pond/fish2.png',
    },
    {
      alias: 'fish3',
      src: '/fish-pond/fish3.png',
    },
    {
      alias: 'fish4',
      src: '/fish-pond/fish4.png',
    },
    {
      alias: 'fish5',
      src: '/fish-pond/fish5.png',
    },
    {
      alias: 'overlay',
      src: '/fish-pond/wave_overlay.png',
    },
    {
      alias: 'displacement',
      src: '/fish-pond/displacement_map.png',
    },
  ]
  await Assets.load(assets)
}

export const gameState = {state: 0, scoure: 0, nowFishCount: 0}

const mousePosition = {x: 0, y: 0}
gameContainer.interactive = true
gameContainer.on('pointermove', (e) => {
  mousePosition.x = e.data.globalX
  mousePosition.y = e.data.globalY
  console.log(mousePosition)
})
export const useMousePositon = () => {
  return mousePosition
}
