let money = 1000              //40
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
let color

let totalPaint = 0
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

    updateUpgrade()

    if (mis <= 0 && maling <= 0 && pigment <= 0 && money < pigmentPrice) {
        alert(`Ser ut som om du har soft locket degselv \n Her er ${pigmentPrice - money}kr for å få deg tilbake`)
        money += pigmentPrice - money
        update()
    }

    // console.log(totalPaint)
}

function updateUpgrade() {
    if (money >= 200) {
        document.getElementById("basicMpp").style.display = "block"
    }
    if (money >= 450) {
        document.getElementById("firstMalingKost").style.display = "block"
    }
}

update()

function clickPaint() {
    if (maling + malingPerClick <= storage && pigment >= malingPerClick / malingPerPigment) {
        maling += malingPerClick
        totalPaint += malingPerClick
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

function buyFirstKost() {
    if (money >= 1000) {
        harKost = false

        document.getElementById("firstMalingKost").style.display = "none"
        document.getElementById("paintUpg").style.display = "block"

        intMG()
    }
}

// function test() {
//     money += mps
//     update()
//     setTimeout(test, 1000)
// }

// test()

const colorPicker = new iro.ColorPicker("#colorPicker")

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

        localStorage.setItem("color", color)
    }
}

let qDrip = 0
function intDripPaint() {

    if (totalPaint >= 10) {
        qDrip = totalPaint / 10
    }

    if (qDrip >= 1) {
        dripPaint()
        qDrip -= 1
    }
}

intDripPaint()