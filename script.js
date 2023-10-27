const rgbArea = document.getElementById('rgbArea')
const buttonRGB1 = document.getElementById('buttonRGB1');
const buttonRGB2 = document.getElementById('buttonRGB2');
const buttonRGB3 = document.getElementById('buttonRGB3');
const result = document.getElementById('result')
const buttonArray = [buttonRGB1, buttonRGB2, buttonRGB3];
let hexArray = [];
let hexColor;

// functions

const getData = async () => {
    const url = 'https://x-colors.yurace.pro/api/random';
    try {
        for (let i = 0; i < 3; i++) {
            const response = await fetch(url);
            const data = await response.json();
            hexArray.push(data.hex)
        }
        updatingButtonsWithRgb(hexArray)
        result.textContent = '';
    } catch (error) {
        console.log('Error fetching data: ', error);
    }
}

const updatingButtonsWithRgb = (hexArray) => {
    for (let i = hexArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [hexArray[i], hexArray[j]] = [hexArray[j], hexArray[i]];
    }
    const random = Math.floor(Math.random() * buttonArray.length);
    buttonArray[0].textContent = hexArray[0];
    buttonArray[1].textContent = hexArray[1];
    buttonArray[2].textContent = hexArray[2];
    hexColor = hexArray[random];
    rgbArea.style.background = hexArray[random];
}

const checkRightOrWrong = (button) => {
    if (button.textContent === hexColor) {
        result.textContent = 'Right';
        result.classList.add('green');
        hexArray = [];
        setTimeout(() => {
            getData();
        }, 1000 / 2);
    } else {
        result.classList.remove('green');
        result.textContent = 'Wrong, Try Again!!';
        result.classList.add("red");
    }
}

// Event Listeners

buttonRGB1.addEventListener('click', () => {
    checkRightOrWrong(buttonRGB1)
});

buttonRGB2.addEventListener('click', () => {
    checkRightOrWrong(buttonRGB2)
});

buttonRGB3.addEventListener('click', () => {
    checkRightOrWrong(buttonRGB3)
});


getData()