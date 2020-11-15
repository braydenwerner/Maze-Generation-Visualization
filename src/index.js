import { NUM_TILES_HEIGHT, NUM_TILES_WIDTH } from './constants/constants.js'
import { renderMaze, clearMaze, mazeIsClear } from './render.js'

const canvas = document.getElementById('canvas')
const generateMazeButton = document.getElementById('generateMazeButton')
const clearMazeButton = document.getElementById('clearMazeButton')

let isGenerating = false
let generateMazeInterval
let clearMazeInterval

window.onload = initCanvas
window.onresize = initCanvas

export let tileWidth, tileHeight

generateMazeButton.onclick = () => {
    if (!isGenerating && mazeIsClear) {
        clearInterval(clearMazeInterval)
        generateMazeInterval = setInterval(renderMaze, 1)
        isGenerating = true;
    }
}

clearMazeButton.onclick = () => {
    clearInterval(generateMazeInterval)
    clearMazeInterval = setInterval(clearMaze, 1)
    isGenerating = true
}

function initCanvas() {
    canvas.width = window.innerWidth / 1.5
    canvas.height = window.innerHeight / 1.5
    console.log(canvas.width)

    tileWidth = canvas.width / NUM_TILES_WIDTH
    tileHeight = canvas.height / NUM_TILES_HEIGHT

    renderMaze()
}