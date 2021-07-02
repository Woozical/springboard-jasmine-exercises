
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount:200000,years:15,rate:0.06})).toEqual('$1687.71');
  expect(calculateMonthlyPayment({amount:5000,years:2,rate:0.05})).toEqual('$219.36');
  expect(calculateMonthlyPayment({amount:1200,years:1,rate:0})).toEqual('$100.00');
});


it("should return a result with 2 decimal places", function() {

  function getDecString(values){
    let result = calculateMonthlyPayment(values);
    return result.slice(result.indexOf('.')+1);
  }

  expect(getDecString({amount:20000,years:15,rate:0.30}).length).toEqual(2);
  expect(getDecString({amount:200.00,years:1.5,rate:30}).length).toEqual(2);
  expect(getDecString({amount:209253246,years:102315,rate:3.00023523500000}).length).toEqual(2);
});

it("should handle fringe and invalid inputs", function(){
  let errStr = 'Invalid input.\nTry again.';
  expect(calculateMonthlyPayment({amount:300,years:-12,rate:342})).toEqual(errStr);
  expect(calculateMonthlyPayment({})).toEqual(errStr);
  expect(calculateMonthlyPayment({amount:0, years:0, rate:0})).toEqual(errStr);
  expect(calculateMonthlyPayment({amount:'300',years:true,rate:0.3})).toEqual(errStr);
});

/// etc
