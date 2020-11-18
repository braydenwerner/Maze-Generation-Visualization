import { NUM_TILES_HEIGHT, NUM_TILES_WIDTH } from './constants/constants.js'
import { renderMaze, clearMaze, resetClearMazeIndex, generateNewMaze } from './render.js'

const canvas = document.getElementById('canvas')
const generateMazeButton = document.getElementById('generateMazeButton')
const clearMazeButton = document.getElementById('clearMazeButton')

let generateMazeInterval
let clearMazeInterval

window.onload = initCanvas
window.onresize = initCanvas

export let tileWidth, tileHeight

let canGenerateMaze = true
let canClearMaze = false

generateMazeButton.onclick = () => {
    if (canGenerateMaze) {
        generateNewMaze()

        clearInterval(clearMazeInterval)
        generateMazeInterval = setInterval(renderMaze, 40)

        canGenerateMaze = false
        canClearMaze = true
    }
}

clearMazeButton.onclick = () => {
    if (canClearMaze) {
        resetClearMazeIndex()

        clearInterval(generateMazeInterval)
        clearMazeInterval = setInterval(clearMaze, 1)

        canGenerateMaze = true
        canClearMaze = false
    }
}

function initCanvas() {
    const less = (window.innerHeight > window.innerWidth) ? window.innerWidth : window.innerHeight
    canvas.width = less / 1.5
    canvas.height = less / 1.5

    tileWidth = canvas.width / NUM_TILES_WIDTH
    tileHeight = canvas.height / NUM_TILES_HEIGHT

    renderMaze()
}