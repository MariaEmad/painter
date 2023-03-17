const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    toolBtns = document.querySelectorAll(".tool"),
    sizeSlider = document.querySelector("#size-slider"),
    fillColor = document.querySelector("#fill-color"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearBtn = document.querySelector(".clear-canvas"),
    saveBtn=document.querySelector(".save-img")
    let prevMouseX,prevMouseY,snapshot,
        brushWidth = 5,
    selectedColor = "#000"

let isDrawing = false
    selectedTool= "brush"
//=================================================================//
window.onload = function (){
    canvas.width = canvas.offsetWidth
    canvas.height= canvas.offsetHeight
}
const drawCircle = (e) => {
    ctx.beginPath()
    let raduis = Math.sqrt(Math.pow((prevMouseX-e.offsetX),2)+Math.pow((prevMouseY-e.offsetY),2))
    ctx.arc(prevMouseX, prevMouseY, raduis, 0, 2 * Math.PI)
    fillColor.checked? ctx.fill() : ctx.stroke()
    
}
const drawTriangle = (e) => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fillColor.checked ? ctx.fill() : ctx.stroke()
    
    // to do line

}
const drawLine = (e) => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}
const drawRect = (e) => {
    if (!fillColor.checked) {
    return ctx.strokeRect(e.offsetX,e.offsetY,(prevMouseX-e.offsetX),(prevMouseY-e.offsetY))

    } else {
        ctx.fillRect(e.offsetX,e.offsetY,(prevMouseX-e.offsetX),(prevMouseY-e.offsetY))

    }
    }
const startDraw  = (e) => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = selectedColor
    ctx.fillStyle =selectedColor
    snapshot= ctx.getImageData(0,0,canvas.width,canvas.height)
}
canvas.onmouseup=()=>{isDrawing = false}
function drawing(e) {
    if (!isDrawing) return
    ctx.putImageData(snapshot, 0 ,0)

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle= selectedTool === "eraser"? "#fff" : selectedColor
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke();
        
        
    } else if (selectedTool === "rectangle") {
        drawRect(e)
    } else if (selectedTool === "circle") {
        drawCircle(e)
    } else if(selectedTool === "triangle") {
        drawTriangle(e)
    } else if (selectedTool === "line") {
        drawLine(e)
    }
}
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active")
        selectedTool = btn.id
        
        console.log(selectedTool);
    })
});
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected")
       selectedColor= getComputedStyle(btn).getPropertyValue("background-color")
    })
    
});
colorPicker, addEventListener("change", () => {
    colorPicker.parentElement.style.backgroundColor = colorPicker.value
    colorPicker.click()
})
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
})
saveBtn.onclick = () => {
    const link = document.createElement("a")
    link.download = `${Date.now}.jpg`
    link.href = canvas.toDataURL()
    link.click()
}
sizeSlider.addEventListener("change",()=> brushWidth=sizeSlider.value)
canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("mousemove",drawing)
//https://www.codingnepalweb.com/build-drawing-app-html-canvas-javascript/
//https://www.youtube.com/watch?v=y84tBZo8GFo&list=PLpwngcHZlPadhRwryAXw3mJWX5KH3T5L3&index=8
//40.17
//for eatch btn color