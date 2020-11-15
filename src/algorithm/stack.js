export default class Stack {
  constructor() {
    this.data = []
    this.top = 0
  }

  push(element) {
    this.data[this.top] = element
    this.top = this.top + 1
  }

  length() {
    return this.top
  }

  peek() {
    return this.data[this.top - 1]
  }

  isEmpty() {
    return this.top === 0
  }

  pop() {
    if (this.isEmpty() === false) {
      this.top = this.top - 1
      return this.data.pop()
    }
  }
}
