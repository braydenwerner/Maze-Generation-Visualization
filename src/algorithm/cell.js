export default class Cell {
	constructor(row, col) {
		this.row = row
		this.col = col

		this.left = true
		this.right = true
		this.top = true
		this.bottom = true
	}
}
