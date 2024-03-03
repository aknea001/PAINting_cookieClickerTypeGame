const canvas = document.getElementById("canvas")

canvas.width = 500
canvas.height = 500

let context = canvas.getContext("2d")
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)

let drawColor = localStorage.getItem("color")
let draw_width = "100"
let is_drawing = "false"

function intMG() {
    document.getElementById("darkBk").style = `
    z-index: 1;
    opacity: 1;`
    document.getElementById("miniGame").style.display = "block"

    drawColor = localStorage.getItem("color")

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
        context.strokeStyle = drawColor
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
    setTimeout(restartMG, 500)

    function restartMG() {
        document.getElementById("darkBk").style = `
        z-index: -1;
        opacity: 0;`
        document.getElementById("miniGame").style.display = "none"
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillRect(0, 0, canvas.width, canvas.height)
        document.getElementById("MGDisplayPrc").innerText = ""
    }
}


// -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_PAINT DRIP IN BACKGROUND-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_


let readyForDrip = true

const bkCanvas = document.getElementById("bkCanvas")

bkCanvas.width = window.innerWidth
bkCanvas.height = window.innerHeight

let bkctx = bkCanvas.getContext("2d")
bkctx.fillStyle = "white"
bkctx.fillRect(0, 0, bkCanvas.width, bkCanvas.height)

let trailWidth = 35


function dripPaint() {
    drawColor = localStorage.getItem("color")

    let fadeOpacity
    let randomX
    let dripSpeed = 4
    let trailUpdates = dripSpeed * 1000 / 20

    if (readyForDrip) {
        const paintBall = document.getElementById("paintBall")
        randomX = Math.floor(Math.random() * window.innerWidth)

        document.documentElement.style.setProperty("--animationSpeed", `${dripSpeed}s`)
        paintBall.style.left = `${randomX - 20}px`
        paintBall.style.backgroundColor = drawColor
        paintBall.classList.add("dripAni")

        // console.log(randomX)

        bkctx.beginPath()
        bkctx.strokeStyle = drawColor
        bkctx.lineWidth = trailWidth
        bkctx.lineCap = "round"

        fadeOpacity = 1

        trail()
    }

    function trail() {
        readyForDrip = false

        let ballYcoords = paintBall.getBoundingClientRect().top

        bkctx.globalAlpha = fadeOpacity
        bkctx.lineTo(randomX, ballYcoords + 20)
        bkctx.stroke()
        trailUpdates -= 1

        if (trailUpdates >= 1) {
            setTimeout(trail, 20)
        }
        else {
            paintBall.classList.remove("dripAni")

            fadeThatShit()
            
            function fadeThatShit() {
                bkctx.globalAlpha = fadeOpacity

                bkctx.clearRect(0, 0, bkCanvas.width, bkCanvas.height)
                bkctx.fillStyle = "white"
                bkctx.fillRect(0, 0, bkCanvas.width, bkCanvas.height)
                bkctx.beginPath()
                bkctx.moveTo(randomX, 0)
                bkctx.strokeStyle = drawColor
                bkctx.lineWidth = trailWidth
                bkctx.lineCap = "round"
                bkctx.lineTo(randomX, window.innerHeight)
                fadeOpacity -= 0.1
                bkctx.stroke()

                if (fadeOpacity > 0) {
                    setTimeout(fadeThatShit, 50)
                }
                else {
                    bkctx.clearRect(0, 0, bkCanvas.width, bkCanvas.height)
                    bkctx.fillStyle = "white"
                    bkctx.fillRect(0, 0, bkCanvas.width, bkCanvas.height)

                    readyForDrip = true
                }
            }
        }
    }
}