import { NUM_TILES_HEIGHT, NUM_TILES_WIDTH, setWidth, setHeight } from './constants/constants.js'
import { renderMaze, clearMaze, resetClearMazeIndex, generateNewMaze } from './render.js'

const canvas = document.getElementById('canvas')
const generateMazeButton = document.getElementById('generateMazeButton')
const clearMazeButton = document.getElementById('clearMazeButton')

const dimensionInput1 = document.getElementById('dimensionInput1')
const dimensionInput2 = document.getElementById('dimensionInput2')
const dimensionHeader1 = document.getElementById('dimensionHeader1')
const dimensionHeader2 = document.getElementById('dimensionHeader2')

dimensionInput1.oninput = () => {
    if (clearMazeInterval) clearInterval(clearMazeInterval)

    setWidth(parseInt(dimensionInput1.value))
    dimensionHeader1.innerText = 'Width: ' + dimensionInput1.value

    generateNewMaze()
    initCanvas()
}

dimensionInput2.oninput = () => {
    if (clearMazeInterval) clearInterval(clearMazeInterval)

    setHeight(parseInt(dimensionInput2.value))
    dimensionHeader2.innerText = 'Height: ' + dimensionInput2.value

    generateNewMaze()
    initCanvas()
}

let generateMazeInterval
let clearMazeInterval

window.onload = initCanvas
window.onresize = initCanvas

export let tileWidth, tileHeight

let canGenerateMaze = true

generateMazeButton.onclick = () => {
    if (canGenerateMaze) {
        generateNewMaze()

        clearInterval(clearMazeInterval)
        generateMazeInterval = setInterval(renderMaze, 40)

        canGenerateMaze = false
    }
}

clearMazeButton.onclick = () => {
    resetClearMazeIndex()

    clearInterval(generateMazeInterval)

    if (clearMazeInterval) clearInterval(clearMazeInterval)
    clearMazeInterval = setInterval(clearMaze, 1)

    canGenerateMaze = true
}

function initCanvas() {
    const less = (window.innerHeight > window.innerWidth) ? window.innerWidth : window.innerHeight
    canvas.width = less / 1.5
    canvas.height = less / 1.5

    tileWidth = canvas.width / NUM_TILES_WIDTH
    tileHeight = canvas.height / NUM_TILES_HEIGHT

    renderMaze()
}