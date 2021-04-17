import React from 'react';
import { BaseCalculator } from './BaseCalculator';
import './capmarkets-calculators.css';


class CompoundInterestCalculator extends BaseCalculator {

    state = {}
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            loanamount: props.loanamount,
            periods: props.periods,
            interestrate: props.interestrate,
            compounding: props.compounding,
            futurevalue: 0,
            rateofreturn: 0,
            error: null
        }
        this.calculate = this.calculate.bind(this)
        this.handleLoanAmountChange = this.handleLoanAmountChange.bind(this)
        this.handlePeriodsChange = this.handlePeriodsChange.bind(this)
        this.handleInterestRateChange = this.handleInterestRateChange.bind(this)
        this.handleCompoundingChange = this.handleCompoundingChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleLoanAmountChange(event) {
        this.validateNumberAndSet(event, 'loanamount', 'Please enter a valid loan amount (i.e 10000)')
    }
    handlePeriodsChange(event) {
        this.validateNumberAndSet(event, 'periods', 'Please enter a valid number of periods (i.e 10)')
    }
    handleInterestRateChange(event) {
        this.validateNumberAndSet(event, 'interestrate', 'Please enter a valid interest rate (i.e 3.2)')
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
        var rate = (parseFloat(this.state.interestrate) / 100)
        var compoundperiods = parseInt(this.state.periods)
        // Adjust based on compounding period
        if (this.state.compounding === 'Semi-Annual') {
            rate = rate / 2
            compoundperiods = compoundperiods * 2
        } else if (this.state.compounding === 'Monthly') {
            rate = rate / 12
            compoundperiods = compoundperiods * 12
        }

        const fv = parseFloat(this.state.loanamount) * (1 + rate) ** compoundperiods
        const rr = (fv - parseFloat(this.state.loanamount)) ** (1 / parseInt(this.state.periods)) - 1

        this.setState({
            futurevalue: this.formatCurrency(fv),
            rateofreturn: rr.toFixed(2) + "%"
        })
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
                <p>{this.state.title}</p>
                { this.state.error && <div className="inputerror">{this.state.error}</div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="inputfield"> Loan Amount:&nbsp;
                <input className="inputvalue" type="input" value={this.state.loanamount} onChange={this.handleLoanAmountChange} />
                    </div>
                    <div className="inputfield"> Periods:&nbsp;
                    <input className="inputvalue" type="input" value={this.state.periods} onChange={this.handlePeriodsChange} />
                    </div>
                    <div className="inputfield"> Interest Rate:&nbsp;
                        <input className="inputvalue" type="input" value={this.state.interestrate} onChange={this.handleInterestRateChange} />
                    </div>
                    <div className="inputfield"> Compounding:&nbsp;
                    <select className="inputselect" value={this.state.compounding} onChange={this.handleCompoundingChange}>
                            <option value="Annual">Annual</option>
                            <option value="Semi-Annual">Semi-Annual</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <input className="calculate-button" type="submit" value="Submit" />
                </form>
                <div className="answerfield">Future Value:&nbsp;<div className="answervalue">{this.state.futurevalue}</div></div>
                <div className="answerfield">Rate of Return:&nbsp;<div className="answervalue">{this.state.rateofreturn}</div></div>
            </div>
        );
    }
}


CompoundInterestCalculator.defaultProps = {
    title: 'Compound Interest Calculator',
    compounding: 'Monthly'
}


export { CompoundInterestCalculator };