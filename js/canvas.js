const canvas = document.getElementById("canvas")

canvas.width = 500
canvas.height = 500

let context = canvas.getContext("2d")
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)

let color = "black"
let draw_width = "100"
let is_drawing = "false"

function intMG() {
    document.getElementById("bkMiniGame").style = `
    z-index: 1;
    opacity: 1;`

    canvas.addEventListener("mousedown", start, false)
    canvas.addEventListener("mousemove", draw, false)
    canvas.addEventListener("mouseup", stopDrawing, false)
}

function start(event) {
    is_drawing = true
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    event.preventDefault()
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        context.strokeStyle = color
        context.lineWidth = draw_width
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    }
    event.preventDefault()
}

function stopDrawing(event) {
    if (is_drawing) {
        context.stroke()
        context.closePath()
        is_drawing = false
    }
    event.preventDefault()
}

function checkFiled() {
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data

    let filledPixels = 0

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
            filledPixels += 1
        }
    }

    const totalPixels = canvas.width * canvas.height
    const filledPercentage = (filledPixels / totalPixels) * 100

    console.log(`Filled Percentage: ${filledPercentage}%`)

    document.getElementById("MGDisplayPrc").innerText = `Prosent fyllet: ${filledPercentage}%`
    setTimeout(restartMG, 4000)

    function restartMG() {
        document.getElementById("bkMiniGame").style = `
        z-index: -1;
        opacity: 0%;`
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillRect(0, 0, canvas.width, canvas.height)
        document.getElementById("MGDisplayPrc").innerText = ""
    }
}
