let money = 40
let price = 20
let maxPrice = 100
let mps = 0
let color

function update() {
    document.getElementById("money").innerText = money
    document.getElementById("price").innerText = price
}

update()

function plusPrice() {
    if (price < 100) {
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

// function test() {
//     money += mps
//     update()
//     setTimeout(test, 1000)
// }

// test()

const colorPicker = new iro.ColorPicker("#colorPicker")

function test() {
    console.log(colorPicker.color.hexString)
    setTimeout(test, 200)
}

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