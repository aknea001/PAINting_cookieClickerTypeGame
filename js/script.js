let money = 40
let price = 20
let maxPrice = 100
let mps = 0

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


function testPaint() {
    document.getElementById("paintBall").style.animation = "fallingPaint 4s"
}