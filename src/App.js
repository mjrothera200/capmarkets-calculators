
import './App.css';
import { SimpleInterestCalculator, CompoundInterestCalculator } from './components/CapMarketsCalculators'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CompoundInterestCalculator 
            loanamount="10000"
            periods="5"
            interestrate="4"
        />
      </header>
    </div>
  );
}

export default App;
