// use strict - строгий режим ввода, без варианта совместимости со старыми версиями JS!

// 8 типов данных :
/* number - для целых и вещественных чисел.
   bigint - для работы с целыми числами.
   string - для строк.
   boolean - для логических значиний (true / false).
   null - "пустое значение" или "значение не существует".
   undefined - "значение не задано".
   object / symbol - сложные структуры данных и уникальные идентификаторы.*/


const cols = document.querySelectorAll('.col')

document.addEventListener('keydown' , (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = 
        event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
    }
})

function genRandomColor() {
    const hexCodes = '012345678ABCDEF'
    let color = ''
        for (let i = 0; i < 6; i++) {
           color += hexCodes[Math.floor(Math.random() * hexCodes.length)] 
        }
        return '#' + color
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}


function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

         if (isLocked) {
            colors.push(text.textContent)
            return
         }

         const color = isInitial 
         ? colors[index]
            ? colors[index]
               : chroma.random() 
         : chroma.random()
         if (!isInitial) {
         colors.push(color)
        }

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })
}

function setTextColor(text, color) {
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors=[]) {
    document.location.hash = colors
    .map((col) => {
        return col.toString().substring(1)
    })
    .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}


setRandomColors(true)