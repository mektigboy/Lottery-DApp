import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  // web3.eth.getAccounts().then(console.log);

  // constructor(props) {
  //   super(props);

  //   this.state = { manager: '' };

  // }

  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h1>Lottery Contract</h1>
        <p>
          This contract is managed by: <b>{this.state.manager}</b>.
        </p>
        <p>
          There are currently <b>{this.state.players.length}</b> people entered,
          competing to win{" "}
          <b>{web3.utils.fromWei(this.state.balance, "ether")} ETH</b>!
        </p>
        <hr />
        <form>
          <div>
            <h3>Test your luck!</h3>
            <label>
              Amount of <b>ETH</b>:
            </label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
