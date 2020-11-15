import { NUM_TILES_HEIGHT, NUM_TILES_WIDTH } from '../constants/constants.js'
import Stack from './stack.js'
import Cell from './cell.js'

export class Maze {
    constructor() {
        this.mazeStates = []
        this.maze = new Array(NUM_TILES_HEIGHT)
        for (let i = 0; i < this.maze.length; i++) {
            this.maze[i] = new Array(NUM_TILES_WIDTH)
        }

        this.temp = new Array(NUM_TILES_HEIGHT)
        for (let i = 0; i < this.temp.length; i++) {
            this.temp[i] = new Array(NUM_TILES_WIDTH)
        }

        for (let i = 0; i < NUM_TILES_HEIGHT; i++) {
            for (let j = 0; j < NUM_TILES_WIDTH; j++) {
                this.maze[i][j] = new Cell(i, j)
            }
        }

        this.visited = new Array(NUM_TILES_HEIGHT)
        for (let i = 0; i < this.maze.length; i++) {
            this.visited[i] = new Array(NUM_TILES_WIDTH).fill(false)
        }

        this.row = Math.floor((Math.random() * NUM_TILES_HEIGHT))
        this.col = Math.floor((Math.random() * NUM_TILES_WIDTH))

        this.stack = new Stack()

        this.mazeStates = []
        this.dfs(this.maze, this.visited, this.row, this.col, this.stack)
    }

    dfs(maze, visited, row, col, stack) {
        this.mazeStates.push(this.getMazeState(maze))

        //  check if edge, add border wall
        if (row === 0) maze[row][col].top = true
        if (row === NUM_TILES_HEIGHT - 1) maze[row][col].bottom = true
        if (col === 0) maze[row][col].left = true
        if (col === NUM_TILES_WIDTH - 1) maze[row][col].right = true

        visited[row][col] = true

        //  find valid neighbors
        const validNeighbors = []
        if (col - 1 >= 0 && !visited[row][col - 1]) validNeighbors.push('left')
        if (col + 1 < NUM_TILES_WIDTH && !visited[row][col + 1]) validNeighbors.push('right')
        if (row - 1 >= 0 && !visited[row - 1][col]) validNeighbors.push('up')
        if (row + 1 < NUM_TILES_HEIGHT && !visited[row + 1][col]) validNeighbors.push('down')

        //  select a random neighbor and dfs until all neighbors are visited
        if (validNeighbors.length > 0) {
            const random = validNeighbors[Math.floor((Math.random() * validNeighbors.length))]

            if (random === 'left') {
                maze[row][col].left = false
                maze[row][col - 1].right = false
                stack.push(maze[row][col - 1])

                this.dfs(maze, visited, row, col - 1, stack)
            } else if (random === 'right') {
                maze[row][col].right = false
                maze[row][col + 1].left = false
                stack.push(maze[row][col + 1])

                this.dfs(maze, visited, row, col + 1, stack)
            } else if (random === 'up') {
                maze[row][col].top = false
                maze[row - 1][col].bottom = false
                stack.push(maze[row - 1][col])

                this.dfs(maze, visited, row - 1, col, stack)
            } else if (random === 'down') {
                maze[row][col].bottom = false
                maze[row + 1][col].top = false
                stack.push(maze[row + 1][col])

                this.dfs(maze, visited, row + 1, col, stack)
            }
        } else {
            //  else no valid neighbors, go back to last element in stack and dfs
            while (!stack.isEmpty()) {
                const backtrack = stack.pop()
                this.dfs(maze, visited, backtrack.row, backtrack.col, stack)
            }
        }
    }

    getMaze() {
        return this.maze
    }

    getMazeState(maze) {
        const mazeState = []
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[0].length; j++) {
                mazeState.push({
                    row: i,
                    col: j,
                    top: maze[i][j].top,
                    bottom: maze[i][j].bottom,
                    left: maze[i][j].left,
                    right: maze[i][j].right
                })
            }
        }

        return mazeState
    }
}
