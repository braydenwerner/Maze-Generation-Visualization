//30
let NUM_TILES_WIDTH = 25
let NUM_TILES_HEIGHT = 25

const colors = {
    themeBlueForeground: '#292D3E',
    themeBlueBackground: '#1B1E2B',
    themeGreen: '#C3E88D',
    themeRed: '#CE392B',
    themePurple: '#C777A7',
    themeYellow: '#FFCB6B',
    themeGray: '#A6ACB2'
}

function setWidth(width) {
    NUM_TILES_WIDTH = width
}

function setHeight(height) {
    NUM_TILES_HEIGHT = height
}


export { NUM_TILES_WIDTH, NUM_TILES_HEIGHT, colors, setWidth, setHeight }
