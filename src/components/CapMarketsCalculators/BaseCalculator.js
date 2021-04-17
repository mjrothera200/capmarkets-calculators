import React, { Component } from 'react';

class BaseCalculator extends Component {

    formatCurrency(value) {
        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        return formatter.format(value)

    }

    validateNumber(value) {
        if (!isNaN(value)) {
            return true
        } else {
            return false
        }
    }

    validateNumberAndSet(event, fieldname, errorstring) {
        if (this.validateNumber(event.target.value)) {
            var myObj = { }
            myObj[fieldname] = event.target.value
            myObj['error'] = null
            this.setState(myObj)
        } else {
            this.setState({
                error: errorstring
            })
        }
    }
    validateChoiceAndSet(event, fieldname, errorstring, choices) {
        if (choices.includes(event.target.value)) {
            var myObj = { }
            myObj[fieldname] = event.target.value
            myObj['error'] = null
            this.setState(myObj)
        } else {
            this.setState({
                error: errorstring
            })
        }
    }

}

export { BaseCalculator };