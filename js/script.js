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

const colorPicker = new iro.ColorPicker("#colorPicker")
let pickedColor = localStorage.getItem("pickColor")

if (!pickedColor) {
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

        localStorage.setItem("pickColor", "value")
        // localStorage.setItem("money", 40)                   //40
        // localStorage.setItem("maling", 0)                   //0
        // localStorage.setItem("mis", 0)                      //0
        // localStorage.setItem("mpc", 1)                      //1
        // localStorage.setItem("mpp", 1)                      //1
        // localStorage.setItem("pigment", 0)                  //0
        // localStorage.setItem("pigmentPrice", 5)             //5
        // localStorage.setItem("storage", 200)                //200
        // localStorage.setItem("price", 20)                   //20
        // localStorage.setItem("chanceMax", 50)               //50

        // console.log(localStorage.getItem("money"))

        localStorage.setItem("color", color)
    }
}

let money = parseFloat(localStorage.getItem("money")) || 4000
let maling = parseFloat(localStorage.getItem("maling")) || 0
let mis = parseFloat(localStorage.getItem("mis")) || 0
let malingPerClick = parseFloat(localStorage.getItem("mpc")) || 1
let malingPerPigment = parseFloat(localStorage.getItem("mpp")) || 1

let pigment = parseFloat(localStorage.getItem("pigment")) || 0
let pigmentPrice = parseFloat(localStorage.getItem("pigmentPrice")) || 5

let storage = parseFloat(localStorage.getItem("storage")) || 200
let price = parseFloat(localStorage.getItem("price")) || 20
let maxPrice = 50

let chanceMax = parseFloat(localStorage.getItem("chanceMax")) || 50
let color

console.log(localStorage.getItem("money"))

update()

function update() {
    localStorage.setItem("money", parseFloat(money))
    localStorage.setItem("maling", parseFloat(maling))
    localStorage.setItem("mis", parseFloat(mis))
    localStorage.setItem("mpc", parseFloat(malingPerClick))
    localStorage.setItem("mpp", parseFloat(malingPerPigment))
    localStorage.setItem("pigment", parseFloat(pigment))
    localStorage.setItem("pigmentPrice", parseFloat(pigmentPrice))
    localStorage.setItem("storage", parseFloat(storage))
    localStorage.setItem("price", parseFloat(price))
    localStorage.setItem("chanceMax", parseFloat(chanceMax))

    // console.log(money)

    money = parseFloat(localStorage.getItem("money"))
    maling = parseFloat(localStorage.getItem("maling"))
    mis = parseFloat(localStorage.getItem("mis"))
    malingPerClick = parseFloat(localStorage.getItem("mpc"))
    malingPerPigment = parseFloat(localStorage.getItem("mpp"))

    pigment = parseFloat(localStorage.getItem("pigment"))
    pigmentPrice = parseFloat(localStorage.getItem("pigmentPrice"))

    storage = parseFloat(localStorage.getItem("storage"))
    price = parseFloat(localStorage.getItem("price"))

    chanceMax = parseFloat(localStorage.getItem("chanceMax"))

    document.getElementById("malingTotal").innerText = maling.toFixed(1)
    document.getElementById("money").innerText = money.toFixed(1)
    document.getElementById("price").innerText = price.toFixed(1)
    document.getElementById("mis").innerText = mis.toFixed(1)
    document.getElementById("chanceToSell").innerText = (100 - (price / chanceMax) * 100).toFixed(1)
    document.getElementById("pigmentTotal").innerText = pigment.toFixed(1)
    document.getElementById("storageTotal").innerText = storage.toFixed(1)
    document.getElementById("storageLeft").innerText = (storage - maling).toFixed(1)

    updateUpgrade()

    // money += parseFloat(localStorage.getItem("moneyFromMaling"))
    // localStorage.setItem("moneyFromMaling", 0)

    if (mis <= 0 && maling <= 0 && pigment <= 0 && money < pigmentPrice) {
        alert(`Ser ut som om du har soft locket degselv \n Her er ${pigmentPrice - money}kr for å få deg tilbake`)
        money += pigmentPrice - money
        update()
    }

    //setTimeout(update, 100)
}

function updateUpgrade() {
    if (money >= 200) {
        document.getElementById("basicMpp").style.display = "block"
    }
    if (money >= 450) {
        document.getElementById("firstMalingKost").style.display = "block"
    }
}

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

// function test() {
//     money += mps
//     update()
//     setTimeout(test, 1000)
// }

// test()

function queuePaintDrip() {
    if (maling >= 10) {
        dripPaint()
    }
    setTimeout(queuePaintDrip, 1000)
}

queuePaintDrip()

function reset() {
    localStorage.clear()
    location.reload()
}