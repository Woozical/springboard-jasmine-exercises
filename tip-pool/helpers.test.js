describe('Helper Function tests', function(){
    beforeEach(function(){
        // ...
        billAmtInput.value = '40';
        tipAmtInput.value = '5';
        submitPaymentInfo();
        billAmtInput.value = '20';
        tipAmtInput.value = '2';
        submitPaymentInfo();
        billAmtInput.value = '8';
        tipAmtInput.value = '1.5';
        submitPaymentInfo();

    })

    //sumPaymentTotal
    it('should accurately sum all payment types from allPayments', function(){
        expect(sumPaymentTotal('tipAmt')).toEqual(8.5);
        expect(sumPaymentTotal('billAmt')).toEqual(68);
        expect(sumPaymentTotal('tipPercent')).toBeCloseTo(42, 2);
    })

    //calculateTipPercent
    it('should calculate a rounded tip percentage', function(){
        expect(calculateTipPercent(10, 1)).toEqual(10);
        expect(calculateTipPercent(100, 33)).toEqual(33);
        expect(calculateTipPercent(25, 5)).toEqual(20);
    })

    it('should return a tip percentage as an integer', function(){
        expect(calculateTipPercent(33023.23235, 3290.0345)).toBeInstanceOf(Number);
        expect(Number.isInteger(calculateTipPercent(2532, 2392.234))).toBe(true);
        expect(Number.isInteger(calculateTipPercent(30.312, 20.2))).toBe(true);
        expect(Number.isInteger(calculateTipPercent(5.2, 10))).toBe(true);
        expect(Number.isInteger(calculateTipPercent(1, 3.1))).toBe(true);
        expect(Number.isInteger(calculateTipPercent(7, 0))).toBe(true);
    })

    //appendTd
    it('should append a <td> element to a <tr> element', function(){
        const testRow = document.createElement('tr');
        appendTd(testRow, 'yes');
        expect(testRow.children.length).toBe(1);

        appendTd(testRow, '');
        expect(testRow.children.length).toBe(2);

        for (let elem of testRow.children){
            expect(elem.tagName).toBe('TD');
        }
    })

    //appendDeleteBtn
    it('should append a <td> delete button', function(){
        const testRow = document.createElement('tr');

        appendDeleteBtn(testRow);
    
        expect(testRow.children.length).toBe(1);
        expect(testRow.firstChild.innerHTML).toBe('X');
    })

    afterEach(function(){
        // ...
        allPayments = {};
        paymentId = 0;
        updateServerTable();
        updateSummary();
        paymentTbody.innerHTML = '';
    })
})