const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const printf = (text) => console.log(text)

const RADIUS = 10
const START_POS = [300, 300]

let selected_index = null

ctx.lineWidth = 5

function Distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

class Newron {
    constructor(x, y, color, enable = true) {
        this.x = x
        this.y = y
        this.color = color
        this.enable = enable
    }
    draw() {
        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.moveTo(START_POS[0], START_POS[1])
        ctx.lineTo(this.x, this.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.x, this.y, RADIUS, 0, Math.PI * 2, false)
        ctx.fill()
    }
    setPos(x, y) {
        this.x = x
        this.y = y
    }
    isWithinRange(x, y) {
        if (Distance(this.x, this.y, x, y) <= RADIUS) {
            return true
        }
        return false
    }
}

const NewronList = [
    new Newron(200, 100, "blue"),
    new Newron(100, 200, "red"),
]

const SumNewron = new Newron(0, 0, "green", false)

const RenderList = []
NewronList.forEach(i => RenderList.push(i))
RenderList.push(SumNewron)



function render() {
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (i of RenderList) {
        i.draw()
    }
}

function frame() {
    render()
    requestAnimationFrame(frame)
}

render()

canvas.addEventListener("mousedown", (event) => {
    const evtPos = [event.offsetX, event.offsetY]
    for (var i = 0; i < NewronList.length; i++) {
        if (NewronList[i].isWithinRange(evtPos[0], evtPos[1])) {
            selected_index = i
            break
        }
    }

})

canvas.addEventListener("mouseup", (event) => {
    selected_index = null
})

canvas.addEventListener("mouseleave", (event) => {
    selected_index = null
})

canvas.addEventListener("mousemove", (event) => {
    const evtPos = [event.offsetX, event.offsetY]
    if (selected_index !== null) {
        RenderList[selected_index].setPos(evtPos[0], evtPos[1])
        SumNewron.setPos(-START_POS[0] + RenderList[0].x + RenderList[1].x, -START_POS[0] + RenderList[0].y + RenderList[1].y)
        render()
    }
})
