import React, {Component} from 'react';
import bank from '../bank.png';

class Navbar extends Component{
    render() {
    return(
        <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor: 'grey', height: '50px'}}>
            <a className='navbar-brand col-sm-3 col-md-2 mr-0' 
            style={{color: 'white', fontWeight: 'bold'}}> 
            <img src={bank} width='35px' height= '30px' className= 'd-inline-block align-top' alt='bank logo'/>
            DAPP staking (Decentralized Banking)
            </a>
            <ul className='navbar nav px-3'>
                <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                    <small id='' style={{color: 'goldenrod'}}>Account Number: {this.props.account}</small>
                </li>
            </ul>
        </nav>
    )}
}

export default Navbar;