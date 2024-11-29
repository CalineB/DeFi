import React, {Component} from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import Rwd from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main.js';
import ParticleSettings from './ParticleSettings.js';


class App extends Component {
    // We want to call our loadWeb3 function before rendering.
    // ComponentDidMount is called before mounting occures.
    
    async componentDidMount() {
        await this.loadWeb3()
        // Load the blockchain data
        await this.loadBlockchainData()
    }


    // If ETH is detected (from metamask) enable it in our window.
    async loadWeb3(){
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        }
        else if(window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            } else {
                window.alert('No Eth browser detected. Connect your metamask account')
            };
        };

    async loadBlockchainData(){
        const web3 = window.web3
        // Display wallet address
        const account = await web3.eth.getAccounts();
        // Display account address
        this.setState({account: account[0]});
        const networkId = await web3.eth.net.getId();
        
        // Load tether contract
        const tetherData = Tether.networks[networkId];
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            this.setState({tether});
            // Load balance
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
            this.setState({tetherBalance: tetherBalance.toString()})
            console.log({balance: tetherBalance})
        } else {
            window.alert('Error,Tether contract not deployed - no detected network')
        }

            // Load reward contract
            const rwdData = Rwd.networks[networkId];
            if(rwdData) {
                const rwd = new web3.eth.Contract(Rwd.abi, rwdData.address);
                this.setState({rwd});
                // Load balance
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
                console.log(rwdBalance)
            this.setState({rwdBalance: rwdBalance.toString()})
                console.log({balance: rwdBalance})
            } else {
                    window.alert('Error,Reward contract not deployed - no detected network')
                }

                    // Load DecentralBank contract
                    const decentralBankData = DecentralBank.networks[networkId];
                    if(decentralBankData) {
                        const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
                        this.setState({decentralBank});
                        // Load staking balance
                    let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
                        console.log(stakingBalance)
                    this.setState({stakingBalance: stakingBalance.toString()})
                        console.log({balance: stakingBalance})
                    } else {
                            window.alert('Error, DecentralBank contract not deployed - no detected network')
                        }    
                        console.log("Setting loadingMsg to false.");
            this.setState({loadingMsg: false});
            console.log("Blockchain data loaded successfully.");
    }

    // Staking & Unstaking function
    stakeTokens = (amount) => {   
        this.setState({loadingMsg: true});
        // Approuve transaction
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {

        // Grabe our token from decentralBank and set it to the input amout.
        this.state.decentralBank.methods.depositeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loadingMsg: false});
        });
     });
}
    unstakeTokens = (amount) => {
        this.setState({loadingMsg: true});
       
            this.state.decentralBank.methods.unstakeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loadingMsg: false});  
            })
    }
    
    constructor(props){
        super(props)
        this.state={
            // Default address before fetching our account
            account: 'N.C',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance :'0',
            stakingBalance: '0',
            loadingMsg: true,
        }
    }

   
    render() {
        let content;
        // If loading is true, display message or load the main.
        
        /*
        {this.state.loadingMsg ? content =
        <p id= 'loader' className='text-center' style={{marging:'30px'}}>
        LOADING, PLEASE HOLD ON...</p> : content = <Main/>}
        */

        content = this.state.loadingMsg ?
        <p id='loader' className='text-center' style={{ margin: '30px', color:'white' }}>LOADING, PLEASE HOLD ON...</p> : 
        <Main
        tetherBalance={this.state.tetherBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        />


        return(
            <div className='App' style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}>
                <ParticleSettings/>
                </div>
                <Navbar account={this.state.account}/> 
                    <div className='container-fluid mt-5'>
                        <div className='row'>
                            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth: '600px', minHeight: '100vm'}}>
                                <div>
                                    {content}
                                </div>
                            </main>
                        </div>
                    </div>
            </div>
        )
    }
}
export default App;

