import React from 'react';
import { BaseCalculator } from './BaseCalculator';
import './capmarkets-calculators.css';


class BondPriceCalculator extends BaseCalculator {

    state = {}
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            facevalue: props.facevalue,         // Principle or Par Value
            bondterm: props.bondterm,               // Length of Bond Term
            discountrate: props.discountrate,   // Interest Rate periodic basis
            couponrate: props.couponrate,       // Annual coupon rate
            compounding: props.compounding,     // Compounding method
            price: 0,
            error: null
        }
        this.calculate = this.calculate.bind(this)
        this.handleFaceValueChange = this.handleFaceValueChange.bind(this)
        this.handleBondTermChange = this.handleBondTermChange.bind(this)
        this.handleDiscountRateChange = this.handleDiscountRateChange.bind(this)
        this.handleCouponRateChange = this.handleCouponRateChange.bind(this)
        this.handleCompoundingChange = this.handleCompoundingChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFaceValueChange(event) {
        this.validateNumberAndSet(event, 'facevalue', 'Please enter a valid face value or par amount (i.e 10000)')
    }
    handleBondTermChange(event) {
        this.validateNumberAndSet(event, 'bondterm', 'Please enter a valid bond term (i.e 5, 10, etc..)')
    }
    handleDiscountRateChange(event) {
        this.validateNumberAndSet(event, 'discountrate', 'Please enter a valid discount date (i.e 10)')
    }
    handleCouponRateChange(event) {
        this.validateNumberAndSet(event, 'couponrate', 'Please enter a valid interest rate (i.e 3.2)')
    }
    handleCompoundingChange(event) {
        this.validateChoiceAndSet(event, 'compounding', 'Please enter a valid compounding value (i.e Annual)', ['Annual', 'Semi-Annual', 'Monthly'])
    }
    handleSubmit(event) {
        this.calculate()
        event.preventDefault();
    }
    // Randomly Adjust Data for Chart Movement
    calculate() {
        // Interest rate is expressed as a percentage - convert it
        var discountrate = (parseFloat(this.state.discountrate) / 100)
        var compoundperiods = parseInt(this.state.bondterm)
        var periodcoupon = (parseFloat(this.state.couponrate) / 100)
        const facevalue = parseFloat(this.state.facevalue)
        // Adjust based on compounding period
        if (this.state.compounding === 'Semi-Annual') {
            discountrate = discountrate / 2
            compoundperiods = compoundperiods * 2
            periodcoupon = periodcoupon / 2
        } else if (this.state.compounding === 'Monthly') {
            discountrate = discountrate / 12
            compoundperiods = compoundperiods * 12
            periodcoupon = periodcoupon / 12
        }
        var i;
        let p = 0;
        for (i = 1; i <= compoundperiods; i++) {
            const pvfactor = (1 / (1 + discountrate) ** i)
            const cashflow = ( periodcoupon * facevalue )
            p = p + ( cashflow * pvfactor)
        }
        // Add back the Face Value at the end
        p = p + ( ( facevalue ) * (1 / (1 + discountrate) ** compoundperiods) )
        
        this.setState({
            price: this.formatCurrency(p)
        })
        if (this.props.resultscallback) {
            const results = {
                inputs: {
                    discountrate,
                    compoundperiods,
                    periodcoupon,
                    facevalue: parseFloat(this.state.facevalue)
                },
                results: {
                    p
                }
            }
            this.props.resultscallback(results)
        }
    }

    // Lifecycle methods
    componentDidMount() {
        console.log("Compound Interest Calculator mounted")
        this.calculate()
    }

    componentWillUnmount() {
        console.log("Compound Interest Calculator mounted")

    }
    render() {
        return (
            <div className="capmarkets-calculator">
            {this.state.title && <p>{this.state.title}</p>}
                { this.state.error && <div className="inputerror">{this.state.error}</div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="inputfield"> Face Value:&nbsp;
                <input className="inputvalue" type="input" value={this.state.facevalue} onChange={this.handleFaceValueChange} />
                    </div>
                    <div className="inputfield"> Bond Term:&nbsp;
                    <input className="inputvalue" type="input" value={this.state.bondterm} onChange={this.handleBondTermChange} />
                    </div>
                    <div className="inputfield"> Discount Rate:&nbsp;
                        <input className="inputvalue" type="input" value={this.state.discountrate} onChange={this.handleDiscountRateChange} />
                    </div>
                    <div className="inputfield"> Coupon Rate:&nbsp;
                    <input className="inputvalue" type="input" value={this.state.couponrate} onChange={this.handleCouponRateChange} />
                    </div>
                    <div className="inputfield"> Compounding:&nbsp;
                    <select className="inputselect" value={this.state.compounding} onChange={this.handleCompoundingChange}>
                            <option value="Annual">Annual</option>
                            <option value="Semi-Annual">Semi-Annual</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <input className="calculate-button" type="submit" value="Calculate" />
                </form>
                <div className="answerfield">Bond Price:&nbsp;<div className="answervalue">{this.state.price}</div></div> 
            </div>
        );
    }
}


BondPriceCalculator.defaultProps = {
    title: null,
    compounding: 'Semi-Annual',
    facevalue: '1000',
    bondterm: '5',
    discountrate: '10',
    couponrate: '7',
    resultscallback: null
}


export { BondPriceCalculator };