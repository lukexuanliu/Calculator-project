const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const sciModeToggle = document.getElementById('sciMode');
let current = '';
let operator = '';
let operand = '';
let lastAnswer = null;

// Scientific functions
function calculateSin() {
  const rad = current * Math.PI / 180;
  current = Math.sin(rad).toString();
  updateDisplay(current);
}

function calculateCos() {
  const rad = current * Math.PI / 180;
  current = Math.cos(rad).toString();
  updateDisplay(current);
}

function calculateTan() {
  const rad = current * Math.PI / 180;
  current = Math.tan(rad).toString();
  updateDisplay(current);
}

function calculateSqrt() {
  current = Math.sqrt(Number(current)).toString();
  updateDisplay(current);
}

function calculateSquare() {
  current = (Number(current) * Number(current)).toString();
  updateDisplay(current);
}

function calculateLog() {
  current = Math.log10(Number(current)).toString();
  updateDisplay(current);
}

function calculateLn() {
  current = Math.log(Number(current)).toString();
  updateDisplay(current);
}

function calculateFactorial() {
  let num = Number(current);
  if (num < 0 || !Number.isInteger(num)) {
    updateDisplay("Error");
    return;
  }
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  current = result.toString();
  updateDisplay(current);
}

function insertPi() {
  current += Math.PI.toFixed(10);
  updateDisplay(current);
}

function insertE() {
  current += Math.E.toFixed(10);
  updateDisplay(current);
}

function insertLastAnswer() {
  if (lastAnswer !== null) {
    current = lastAnswer.toString();
    updateDisplay(current);
  }
}

function deleteLastDigit() {
  current = current.slice(0, -1);
  updateDisplay(current);
}

function updateDisplay(val) {
  display.value = val;
  if (val.length > 10) {
    display.classList.add('shrink');
  } else {
    display.classList.remove('shrink');
  }
  // Scroll to the right if overflow
  setTimeout(() => {
    display.scrollLeft = display.scrollWidth;
  }, 0);
}

// Toggle scientific mode
sciModeToggle.addEventListener('change', () => {
  const sciButtons = document.querySelector('.sci-buttons');
  const basicButtons = document.querySelector('.basic-buttons');
  
  if (sciModeToggle.checked) {
    sciButtons.style.display = 'grid';
    basicButtons.style.gridTemplateColumns = 'repeat(4, 1fr)';
  } else {
    sciButtons.style.display = 'none';
    basicButtons.style.gridTemplateColumns = 'repeat(4, 1fr)';
  }
});

// Add event listeners for all buttons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;
    
    // Handle scientific functions
    if (val === 'sin') calculateSin();
    else if (val === 'cos') calculateCos();
    else if (val === 'tan') calculateTan();
    else if (val === '√') calculateSqrt();
    else if (val === 'x²') calculateSquare();
    else if (val === 'log') calculateLog();
    else if (val === 'ln') calculateLn();
    else if (val === '!') calculateFactorial();
    else if (val === 'π') insertPi();
    else if (val === 'e') insertE();
    else if (val === 'Ans') insertLastAnswer();
    else if (val === 'DEL') deleteLastDigit();
    
    // Handle basic calculator functions
    else if (!isNaN(val)) {
      current += val;
      updateDisplay(current);
    } else if (val === 'C') {
      current = '';
      operator = '';
      operand = '';
      updateDisplay('');
    } else if (val === '=') {
      if (operator && operand !== '' && current !== '') {
        current = eval(operand + operator + current).toString();
        updateDisplay(current);
        operator = '';
        operand = '';
        lastAnswer = Number(current);
      }
    } else { // operator
      if (current !== '') {
        operand = current;
        operator = val;
        current = '';
      }
    }
  });
});

