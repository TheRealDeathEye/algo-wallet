import { Send, Clipboard } from 'react-bootstrap-icons';

import { MDBFormInline, MDBInput } from "mdbreact";
import { useState} from 'react';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../index.css';


export default function SendCard(props){
    const [address, set_address] = useState('');
    const [amount, set_amount] = useState('');
    const sendTransaction = async () => {
          const tx = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", {
              method: 'transfer',
              to: address,
              amount: amount*1000000
            }]
          })
    }
    return(
        <div style={{width: '70vw'}}>
        
        
        <div className='row'>
            <div className='col-10'>
            <MDBInput onChange={e=>set_address(e.target.value)} style={{color:'white', fontSize:"75%"}} id="address" placeholder='address' outline/>
            </div>
            <div className='col-2'>
            <Clipboard style={{height:'100%'}} color="white"/>
            </div>
        </div>


        
        <div className='row'>
            <div className='col-10'>   
            <MDBInput onChange={e=>set_amount(e.target.value)} style={{color:'white'}} min="0" step="0.1" type="number" id="amount" outline/>
            </div>
            <div onClick={sendTransaction} className='col-2'>
            <Send style={{height:'100%'}} color="white"/>
            </div>
        </div>
        
        </div>
    );
}