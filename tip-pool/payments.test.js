describe('Payments tests (with set-up and tear-down)', function(){
    beforeEach(function(){
        billAmtInput.value = '30';
        tipAmtInput.value = '4.20';
    })

    it('should only submit a valid payment entry', function(){
        submitPaymentInfo();
        expect(paymentTbody.children.length).toEqual(1);
        submitPaymentInfo();
        expect(paymentTbody.children.length).toEqual(1);
        billAmtInput.value = '100';
        tipAmtInput.value = '20';
        submitPaymentInfo();
        expect(paymentTbody.children.length).toEqual(2);
        billAmtInput.value = '100';
        tipAmtInput.value = 'none';
        expect(paymentTbody.children.length).toEqual(2);
    })

    it('should create an undefined payment when given invalid input', function(){
        expect(createCurPayment()).toBeDefined();
        billAmtInput.value = '30';
        tipAmtInput.value = '-4.20';
        expect(createCurPayment()).toBeUndefined();
        billAmtInput.value = 'cat';
        tipAmtInput.value = '100';
        expect(createCurPayment()).toBeUndefined();
        billAmtInput.value = '0';
        tipAmtInput.value = '0';
        expect(createCurPayment()).toBeUndefined();
    })

    it('should only append <tr> elements to the payment table in the DOM', function(){
        submitPaymentInfo();
        billAmtInput.value = '100';
        tipAmtInput.value = '20';
        submitPaymentInfo();
        for (let elem of paymentTbody.children){
            expect(elem.tagName).toBe('TR');
        }
    })

    it('should properly calculate the average tip % of all checks', function(){
        submitPaymentInfo();
        billAmtInput.value = '100';
        tipAmtInput.value = '20';
        submitPaymentInfo();
        //0.14, 0.20
        expect(summaryTds[2].innerHTML).toEqual('17%')
    })

    afterEach(function(){
        allPayments = {};
        paymentId = 0;
        updateServerTable();
        updateSummary();
        paymentTbody.innerHTML = '';
    })
})