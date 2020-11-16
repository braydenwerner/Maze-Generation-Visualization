import { maze, NUM_TILES_HEIGHT, NUM_TILES_WIDTH, colors } from './constants/constants.js'
import { generateDiagonalWaveTraversal } from './algorithm/util.js'
import { tileWidth, tileHeight } from './index.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const mazeGenerationSpeed = 1
export let mazeGenerationIndex = 0
let mazeGenerationInterval

const mazeClearSpeed = 1
export let mazeClearIndex = 0
let mazeClearInterval
const order = generateDiagonalWaveTraversal(NUM_TILES_WIDTH, NUM_TILES_HEIGHT)

export function renderMaze() {
    const currentMaze = maze.mazeStates[mazeGenerationIndex]

    mazeGenerationIndex += mazeGenerationSpeed
    if (mazeGenerationIndex >= maze.mazeStates.length) {
        mazeGenerationIndex = maze.mazeStates.length - 1
    }

    ctx.fillStyle = colors.themeBlueForeground
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < currentMaze.length; i++) {
        if (currentMaze[i].left) {
            ctx.beginPath()
            ctx.moveTo(currentMaze[i].col * tileWidth, currentMaze[i].row * tileHeight)
            ctx.lineTo(currentMaze[i].col * tileWidth, currentMaze[i].row * tileHeight, tileHeight)
            ctx.strokeStyle = colors.themeGreen
            ctx.stroke()
        }

        if (currentMaze[i].right) {
            ctx.beginPath()
            ctx.moveTo(currentMaze[i].col * tileWidth + tileWidth, currentMaze[i].row * tileHeight)
            ctx.lineTo(currentMaze[i].col * tileWidth + tileWidth, currentMaze[i].row * tileHeight + tileHeight)
            ctx.stroke()
        }

        if (currentMaze[i].top) {
            ctx.beginPath()
            ctx.moveTo(currentMaze[i].col * tileWidth, currentMaze[i].row * tileHeight)
            ctx.lineTo(currentMaze[i].col * tileWidth + tileWidth, currentMaze[i].row * tileHeight)
            ctx.stroke()
        }

        if (currentMaze[i].bottom) {
            ctx.beginPath()
            ctx.moveTo(currentMaze[i].col * tileWidth, currentMaze[i].row * tileHeight + tileHeight)
            ctx.lineTo(currentMaze[i].col * tileWidth + tileWidth, currentMaze[i].row * tileHeight + tileHeight)
            ctx.stroke()
        }
    }


    if (mazeGenerationIndex === maze.mazeStates.length - 1) {
        clearInterval(mazeGenerationInterval)
    }
}

export function clearMaze() {
    mazeClearIndex += mazeClearSpeed
    if (mazeClearIndex >= NUM_TILES_WIDTH * NUM_TILES_HEIGHT) {
        mazeClearIndex = NUM_TILES_WIDTH * NUM_TILES_HEIGHT
    }

    ctx.fillStyle = colors.themeBlueForeground
    for (let i = 0; i < mazeClearIndex; i++) {
        ctx.fillRect(order[i].col * tileWidth, order[i].row * tileHeight, tileWidth, tileHeight)
    }

    if (mazeClearIndex === NUM_TILES_WIDTH * NUM_TILES_HEIGHT) {
        clearInterval(mazeClearInterval)
    }
}
