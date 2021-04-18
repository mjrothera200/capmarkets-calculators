
import './App.css';
import React, { Component } from 'react';
import { SimpleInterestCalculator, CompoundInterestCalculator, BondPriceCalculator } from './components/CapMarketsCalculators'

class App extends Component {

  constructor(props) {
    super(props)
    this.results = this.results.bind(this)
  }

  results(e) {
      console.log(e)
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <BondPriceCalculator 
        />
      </header>
    </div>
  );
  }
}

export default App;
