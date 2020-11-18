
function generateDiagonalWaveTraversal(NUM_TILES_WIDTH, NUM_TILES_HEIGHT) {
    const queue = []
    const order = []

    //  fill with false
    const memo = new Array(NUM_TILES_HEIGHT)
    for (let i = 0; i < NUM_TILES_HEIGHT; i++) {
        memo[i] = new Array(NUM_TILES_WIDTH)
        memo[i].fill(false)
    }

    queue.push({
        row: 0,
        col: 0
    })

    bfsHelper(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, queue, order, memo)
    return order
}

//  create wave pattern using a queue and adding neighbors of each cell to queue
function bfsHelper(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, queue, order, memo) {
    while (queue.length > 0) {
        order.push(queue[0])

        addNeighbors(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, queue[0].row, queue[0].col, queue, memo)
        queue.shift()
    }
}

function addNeighbors(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, row, col, queue, memo) {
    if (col + 1 < NUM_TILES_WIDTH && !memo[row][col + 1]) {
        memo[row][col + 1] = true
        queue.push({
            col: col + 1,
            row: row
        })
    }

    if (row + 1 < NUM_TILES_HEIGHT && !memo[row + 1][col]) {
        memo[row + 1][col] = true
        queue.push({
            col: col,
            row: row + 1
        })
    }
}


export { generateDiagonalWaveTraversal }
