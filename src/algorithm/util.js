
function generateDiagonalWaveTraversal(NUM_TILES_WIDTH, NUM_TILES_HEIGHT) {
    const queue = []
    const order = []

    //  fill with false
    const memo = new Array(NUM_TILES_HEIGHT)
    for (let i = 0; i < NUM_TILES_WIDTH; i++) {
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

function bfsHelper(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, queue, order, memo) {
    while (queue.length > 0) {
        //  add item to answer
        order.push(queue[0])

        //  add item's neighbors to the q, then remove item
        addNeighbors(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, queue[0].row, queue[0].col, queue, memo)
        queue.shift()
    }
}

function addNeighbors(NUM_TILES_WIDTH, NUM_TILES_HEIGHT, row, col, queue, memo) {
    //  add right, then down to queue
    if (col + 1 < NUM_TILES_WIDTH && row < NUM_TILES_HEIGHT && !memo[row][col + 1]) {
        memo[row][col + 1] = true
        queue.push({
            col: col + 1,
            row: row
        })
    }

    if (row + 1 < NUM_TILES_HEIGHT && col < NUM_TILES_WIDTH && !memo[row + 1][col]) {
        memo[row + 1][col] = true
        queue.push({
            col: col,
            row: row + 1
        })
    }
}

export { generateDiagonalWaveTraversal }
