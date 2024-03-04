let money = 40
let maling = 0
let storage = 150
let price = 20
let maxPrice = 50
let mis = 0
let color

function update() {
    document.getElementById("malingTotal").innerText = maling
    document.getElementById("money").innerText = money
    document.getElementById("price").innerText = price
    document.getElementById("mis").innerText = mis
    document.getElementById("chanceToSell").innerText = (50 - price) * 2
}

update()

function clickPaint() {
    if (maling < storage) {
        maling += 1
    }
    else {
        document.getElementById("errorStorage").innerText = "Du har nådd din lager kapasitet \n Kjøp mer lagerplass!"
        setTimeout(() => {
            document.getElementById("errorStorage").innerText = ""
        }, 3500);
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
    let chance = Math.floor(Math.random() * 50)

    if (chance >= price - 1 && maling > 0) {
        money += price
        maling -= 1
        update()
    }
    setTimeout(sellPaint, 1000)
}

sellPaint()

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
    document.getElementById("introColor").style.display = "block"
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