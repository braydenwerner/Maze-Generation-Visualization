import { NUM_TILES_HEIGHT, NUM_TILES_WIDTH } from './constants/constants.js'
import { renderMaze, clearMaze, mazeGenerationIndex, mazeClearIndex } from './render.js'

const canvas = document.getElementById('canvas')
const generateMazeButton = document.getElementById('generateMazeButton')
const clearMazeButton = document.getElementById('clearMazeButton')

let generateMazeInterval
let clearMazeInterval

window.onload = initCanvas
window.onresize = initCanvas

export let tileWidth, tileHeight

let canGenerateMaze = true;

generateMazeButton.onclick = () => {
    if (canGenerateMaze) {
        canGenerateMaze = false
        console.log("Generating maze")
        clearInterval(clearMazeInterval)
        generateMazeInterval = setInterval(renderMaze, 1)
    }
}

clearMazeButton.onclick = () => {
    canGenerateMaze = true
    mazeClearIndex = 0;

    clearInterval(generateMazeInterval)
    clearMazeInterval = setInterval(clearMaze, 1)
}

function initCanvas() {
    canvas.width = window.innerWidth / 1.5
    canvas.height = window.innerHeight / 1.5
    console.log(canvas.width)

    tileWidth = canvas.width / NUM_TILES_WIDTH
    tileHeight = canvas.height / NUM_TILES_HEIGHT

    renderMaze()
}