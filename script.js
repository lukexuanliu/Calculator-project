const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let current = '';
let operator = '';
let operand = '';

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

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;
    if (!isNaN(val)) {
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

