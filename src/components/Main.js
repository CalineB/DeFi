import React, { Component } from "react";
import tether from "../tether.png";

class Main extends Component {
  render() {
    console.log(this.props.rwdBalance);
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "white" }}>
              <th scope="col"> Staking balance</th>
              <th scope="col"> Reward token</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "white" }}>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'ether')} USDT</td>
              <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'ether')} RWD</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form className="mn-3">
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "8px" }}>
                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'ether')} ETH
              </span>
              <div className="input-group mb-4">
                <input type="text"
                placeholder="0"
                required />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} alt="tether" height="32"/>
                    &nbsp;&nbsp;&nbsp; USDT
                  </div>
                </div>
              </div>
              <button type='submit' className='btn btn-primary btn-md btn-block'>DEPOSIT</button>
            </div>
          </form>
          <button className='btn btn-primary btn-md btn-block'  style={{backgroundColor: 'goldenrod'}}>WITHDRAW</button>
          <div className='card-body text-center' style={{color:' blue'}}>AIRDROP</div>
        </div>
      </div>
    );
  }
}

export default Main;
