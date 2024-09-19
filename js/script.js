let isDark = false

function darkBk() {
    if (!isDark) {
        document.getElementById("darkBk").style = `
        z-index: 1;
        opacity: 1;`
        isDark = true
    }
    else {
        document.getElementById("darkBk").style = `
        z-index: -1;
        opacity: 0;`
        isDark = false
    }
}

function introPickColor() {
    darkBk()
    document.getElementById("introColor").style.display = "flex"
}

function confirmColor() {
    if (colorPicker.color.hexString == "#ffffff") {
        document.getElementById("errorColor").innerText = "cmon be more creative, \n CHOOSE A DIFFERENT COLOR"
    }
    else {
        color = colorPicker.color.hexString
        darkBk()
        document.getElementById("introColor").style.display = "none"
        console.log(color)
    }
}

introPickColor()

let money = 40              //40
let maling = 0              //0
let mis = 0                 //0
let malingPerClick = 1      //1
let malingPerPigment = 1    //1

let pigment = 0             //0
let pigmentPrice = 5        //5

let storage = 200           //200
let price = 20              //20
let maxPrice = 50           //50

let chanceMax = 50          //50

// const colorPicker = new iro.ColorPicker("#colorPicker")
// let pickedColor = localStorage.getItem("pickColor")

// if (!pickedColor) {
//     darkBk()
//     document.getElementById("introColor").style.display = "flex"
// }

// function confirmColor() {
//     if (colorPicker.color.hexString == "#ffffff") {
//         document.getElementById("errorColor").innerText = "cmon be more creative, \n CHOOSE A DIFFERENT COLOR"
//     }
//     else {
//         color = colorPicker.color.hexString
//         darkBk()
//         document.getElementById("introColor").style.display = "none"
//         console.log(color)

//         localStorage.setItem("pickColor", "value")
//         localStorage.setItem("color", color)
//     }
// }
let color

let harKost = false         //false

function update() {
    document.getElementById("malingTotal").innerText = maling.toFixed(1)
    document.getElementById("money").innerText = money.toFixed(1)
    document.getElementById("price").innerText = price.toFixed(1)
    document.getElementById("mis").innerText = mis.toFixed(1)
    document.getElementById("chanceToSell").innerText = (100 - (price / chanceMax) * 100).toFixed(1)
    document.getElementById("pigmentTotal").innerText = pigment.toFixed(1)
    document.getElementById("storageTotal").innerText = storage.toFixed(1)
    document.getElementById("storageLeft").innerText = (storage - maling).toFixed(1)

    // updateUpgrade()

    if (mis <= 0 && maling <= 0 && pigment <= 0 && money < pigmentPrice) {
        alert(`Ser ut som om du har soft locket degselv \n Her er ${pigmentPrice - money}kr for å få deg tilbake`)
        money += pigmentPrice - money
        update()
    }

    setTimeout(update, 100)
}

// function updateUpgrade() {
//     if (money >= 200) {
//         document.getElementById("basicMpp").style.display = "block"
//     }
//     if (money >= 450) {
//         document.getElementById("firstMalingKost").style.display = "block"
//     }
// }
update()
function clickPaint() {
    if (maling + malingPerClick <= storage && pigment >= malingPerClick / malingPerPigment) {
        maling += malingPerClick
        pigment -= malingPerClick / malingPerPigment
    }
    else if (maling + malingPerClick >= storage){
        alert("Du har ikke nok lagring!")
        // document.getElementById("errorClickPaint").innerText = "Du har nådd din lager kapasitet \n Kjøp mer lagerplass!"
        // setTimeout(() => {
        //     document.getElementById("errorClickPaint").innerText = ""
        // }, 3500);
    }
    else {
        alert("Du mangler pigment!")
        // document.getElementById("errorClickPaint").innerText = "Du mangler pigment \n Kjøp pigment!"
        // setTimeout(() => {
        //     document.getElementById("errorClickPaint").innerText = ""
        // }, 3500);
    }
    update()
}

function plusPrice() {
    if (price < maxPrice) {
        price += 1
        update()
    }
}

function minusPrice() {
    if (price > 1) {
        price -= 1
        update()
    }
}

function sellPaint() {
    let chance = Math.floor(Math.random() * chanceMax)

    if (chance >= price - 1 && maling > 0) {
        money += price
        maling -= 1
        update()
    }
    setTimeout(sellPaint, 1000)
}

sellPaint()

function buyPigment() {
    if (money >= pigmentPrice) {
        money -= pigmentPrice
        pigment += 1
        update()
    }
}

function buyBasicUpg(element, price, mpc, betterChance, mpp) {
    if (money >= price) {
        element.style.display = "none"
        money -= price
        malingPerClick += mpc
        chanceMax += betterChance
        malingPerPigment += mpp
        console.log(malingPerClick)
    }
    update()
}

function buyMalingUpg(element, price, moneyUpg, time, width) {
    console.log("works")
    if (money >= price) {
        console.log("works aswell")
        element.style.display = "none"
        money -= price
        upgMult += moneyUpg
        inMins -= time
        draw_width += width
    }
    update()
}

function buyFirstKost(element) {
    if (money >= 1000) {
        harKost = false
        money -= 1000

        element.style.display = "none"
        document.getElementById("paintUpg").style.display = "block"

        intMG()
    }
    update()
}

let workerRunning = false

function changeWOrker() {
    workerRunning = false
    darkBk()
    document.getElementById("changeWorker").style.display = "block"
}

function misWorker() {
    if (workerRunning) {
        if (maling < storage && pigment > 0) {
            maling += 1
            pigment -= malingPerClick / malingPerPigment

            update()
        }

        setTimeout(misWorker, 1000)
    }
    else {
        return
    }
}

function pigWorker() {
    if (workerRunning) {
        buyPigment()
        update()

        setTimeout(pigWorker, 1000)
    }
    else {
        return
    }
}

function intWorker(num) {
    workerRunning = true
    darkBk()
    document.getElementById("changeWorker").style.display = "none"

    if (num == 0) {
        misWorker()
    }
    else {
        pigWorker()
    }
}

// function test() {
//     money += mps
//     update()
//     setTimeout(test, 1000)
// }

// test()

// <<<<<<< HEAD
// function queuePaintDrip() {
//     if (maling >= 10) {
//         dripPaint()
//     }
//     setTimeout(queuePaintDrip, 1000)
// }

// queuePaintDrip()

// function reset() {
//     localStorage.clear()
//     location.reload()
// =======
const colorPicker = new iro.ColorPicker("#colorPicker")

function qDrip() {
    if (maling >= 10) {
        dripPaint()
    }
    setTimeout(qDrip, 1000)
}

qDrip()

//------________-_--_-___________--__-_-______--------_______--______Canvas shit---------_________--_-___________-_-_-----_______---

const canvas = document.getElementById("canvas")

canvas.width = 500
canvas.height = 500

let context = canvas.getContext("2d")
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)

let draw_width = 10           //10
let is_drawing = "false"

let maxPenger
let upgMult = 1                 //1

let maxTimeBetweenJob
let inMins = 3
let timeBetweenJob

function intMG() {
    document.getElementById("darkBk").style = `
    z-index: 1;
    opacity: 1;`

    document.getElementById("confirmJob").style.display = "block"

    let choosePic = "man3"
    const navn = document.getElementById("navnOfClient")
    const maxPengerElement = document.getElementById("maxPenger")
    let randomPerson = Math.floor(Math.random() * 6)

    function setMaxMoney(max, min) {
        maxPenger = Math.floor(Math.random() * ((max * upgMult) - (min * upgMult) + 1) + min * upgMult)
        maxPengerElement.innerText = maxPenger
    }

    if (randomPerson == 0) {
        choosePic = "man1"
        navn.innerText = "Muhamed"

        setMaxMoney(150, 120)
    }
    else if (randomPerson == 1) {
        choosePic = "man2"
        navn.innerText = "George"

        setMaxMoney(120, 99)
    }
    else if (randomPerson == 2) {
        choosePic = "man3"
        navn.innerText = "Pål"

        setMaxMoney(53, 20)
    }
    else if (randomPerson == 3) {
        choosePic = "woman1"
        navn.innerText = "Sofie"

        setMaxMoney(123, 101)
    }
    else if (randomPerson == 4) {
        choosePic = "woman2"
        navn.innerText = "Pauline"

        setMaxMoney(140, 111)
    }
    else if (randomPerson == 5) {
        choosePic = "woman3"
        navn.innerText = "Daniel"

        setMaxMoney(183, 153)
    }

    document.getElementById("picOfPerson").setAttribute("src", `people/${choosePic}.png`)
}

function closeJobOffer() {
    document.getElementById("darkBk").style = `
    z-index: -1;
    opacity: 0;`

    document.getElementById("confirmJob").style.display = "none"

    maxTimeBetweenJob = (inMins * 60) * 1000
    timeBetweenJob = Math.floor(Math.random() * maxTimeBetweenJob)
    console.log((timeBetweenJob / 1000) / 60)
    setTimeout(intMG, timeBetweenJob)
}

function confirmJob() {
    document.getElementById("confirmJob").style.display = "none"

    document.getElementById("miniGame").style.display = "flex"

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

function checkFilled() {
    document.getElementById("miniGame").style.display = "none"
    document.getElementById("finishMG").style.display = "block"

    const data = context.getImageData(0, 0, canvas.width, canvas.height).data

    let filledPixels = 0

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
            filledPixels += 1
        }
    }

    const totalPixels = canvas.width * canvas.height
    let filledPercentage = ((filledPixels / totalPixels) * 100).toFixed(2)

    if (filledPercentage > 98.5) {
        filledPercentage = 100
    }

    // console.log(`Filled Percentage: ${filledPercentage}%`)

    document.getElementById("MGDisplayPrc").innerText = filledPercentage

    let amountEarned = parseFloat((maxPenger * (filledPercentage / 100)).toFixed(1))

    document.getElementById("x").innerText = maxPenger
    document.getElementById("y").innerText = filledPercentage
    document.getElementById("xy").innerText = amountEarned
    document.getElementById("amountEarned").innerText = amountEarned

    money += amountEarned

    update()
    // setTimeout(restartMG, 500)
}

function restartMG() {
    document.getElementById("darkBk").style = `
    z-index: -1;
    opacity: 0;`
    document.getElementById("miniGame").style.display = "none"
    document.getElementById("finishMG").style.display = "none"
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)

    maxTimeBetweenJob = (inMins * 60) * 1000
    timeBetweenJob = Math.floor(Math.random() * maxTimeBetweenJob)
    console.log((timeBetweenJob / 1000) / 60)
    setTimeout(intMG, timeBetweenJob)
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
    let fadeOpacity
    let randomX
    let dripSpeed = 4
    let trailUpdates = dripSpeed * 1000 / 20

    if (readyForDrip) {
        const paintBall = document.getElementById("paintBall")
        randomX = Math.floor(Math.random() * window.innerWidth)

        document.documentElement.style.setProperty("--animationSpeed", `${dripSpeed}s`)
        paintBall.style.left = `${randomX - 20}px`
        paintBall.style.backgroundColor = color
        paintBall.classList.add("dripAni")

        // console.log(randomX)

        bkctx.beginPath()
        bkctx.strokeStyle = color
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

        if (trailUpdates > 0) {
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
                bkctx.strokeStyle = color
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