window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const amountInput = document.querySelector('#loan-amount');
  const yearsInput = document.querySelector('#loan-years');
  const rateInput = document.querySelector('#loan-rate');

  amountInput.value = 5000;
  yearsInput.value = 2;
  rateInput.value = .05;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  // let currentVal = getCurrentUIValues();
  // let monthlyStr = calculateMonthlyPayment(currentVal);
  // updateMonthly(monthlyStr);
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if (!values){
    return 'Invalid input.\nTry again.'
  }
  
  const interest = values.rate / 12;
  const payments = values.years * 12;
  let mPay;

  // Check for invalid object values on parameter 'values'
  if(!values.amount || (!values.rate && values.rate !== 0) || !values.years ||
  values.years < 0 || values.amount < 0 || values.rate < 0 ||
  values.amount === true || values.years === true || values.rate === true){
    return 'Invalid input.\nTry again.'
  }  

  // Prevent dividing by 0
  if (interest === 0){
    mPay = values.amount / payments;
  } else {
    mPay = (values.amount * (interest)) / (1 - ((1 + interest)**(payments * -1)));
  }
  return '$' + mPay.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector('#monthly-payment').innerText = monthly;
}
