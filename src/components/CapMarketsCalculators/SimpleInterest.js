import React from 'react';
import { BaseCalculator } from './BaseCalculator';
import './capmarkets-calculators.css';


class SimpleInterestCalculator extends BaseCalculator {

    state = {}
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            loanamount: props.loanamount,
            periods: props.periods,
            interestrate: props.interestrate,
            futurevalue: 0,
            rateofreturn: 0,
            error: null
        }
        this.calculate = this.calculate.bind(this)
        this.handleLoanAmountChange = this.handleLoanAmountChange.bind(this)
        this.handlePeriodsChange = this.handlePeriodsChange.bind(this)
        this.handleInterestRateChange = this.handleInterestRateChange.bind(this)
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
    handleSubmit(event) {
        this.calculate()
        event.preventDefault();
    }
    // Randomly Adjust Data for Chart Movement
    calculate() {
        // Interest rate is expressed as a percentage - convert it
        const rate = (parseFloat(this.state.interestrate) / 100)
        const fv = parseFloat(this.state.loanamount) + (parseFloat(this.state.loanamount) * parseInt(this.state.periods) * rate)
        const rr = (fv - parseFloat(this.state.loanamount)) ** (1 / parseInt(this.state.periods)) - 1

        this.setState({
            futurevalue: this.formatCurrency(fv),
            rateofreturn: rr.toFixed(2) + "%"
        })
        if (this.props.resultscallback) {
            const results = {
                inputs: {
                    rate,
                    periods: parseInt(this.state.periods),
                    loanamount: parseFloat(this.state.loanamount)
                },
                results: {
                    fv,
                    rr
                }
            }
            this.props.resultscallback(results)
        }
    }

    // Lifecycle methods
    componentDidMount() {
        console.log("Simple Interest Calculator mounted")
        this.calculate()
    }

    componentWillUnmount() {
        console.log("Simple Interest Calculator mounted")

    }
    render() {
        return (
            <div className="capmarkets-calculator">
                {this.state.title && <p>{this.state.title}</p>}
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
                    <input className="calculate-button" type="submit" value="Calculate" />
                </form>
                <div className="answerfield">Future Value:&nbsp;<div className="answervalue">{this.state.futurevalue}</div></div>
                <div className="answerfield">Rate of Return:&nbsp;<div className="answervalue">{this.state.rateofreturn}</div></div>
            </div>
        );
    }
}


SimpleInterestCalculator.defaultProps = {
    title: 'Simple Interest Calculator',
    loanamount: '10000',
    periods: '5',
    interestrate: '4',
    resultscallback: null
}


export { SimpleInterestCalculator };