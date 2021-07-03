
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// creates a <td> element with a value of 'X', when clicked with delete the <tr> it belongs to
function appendDeleteBtn(tr){
  const btn = document.createElement('td');
  btn.innerText = 'X';

  btn.addEventListener('click', function(e){
    if(e){
      let tr = e.target.parentElement;
      if (tr.tagName === 'TR') {
        delete allServers[tr.id];
        delete allPayments[tr.id];
        tr.remove();
      }
    }
  })

  tr.append(btn);
}