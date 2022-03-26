import { Send, Clipboard } from 'react-bootstrap-icons';
import { useState} from 'react';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../index.css';


export default function SendCard(props){
    const [address, set_address] = useState('');
    const [amount, set_amount] = useState('');
    const sendTransaction = async () => {
          await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", {
              method: 'transfer',
              testnet: props.testnet,
              to: address,
              amount: amount*1000000
            }]
          })
    }
    return(
        <div style={{width: '70vw'}}>
        
        
        <div className='row'>
            <div className='col-8'>
            <input onChange={e=>set_address(e.target.value)} style={{color:'black', width:'100%', fontSize:"75%"}} id="address" placeholder='address' outline/>
            </div>
            <div className='col-1'>
            <Clipboard style={{height:'100%'}} color="white"/>
            </div>
            <div className='col-2'>   
            <input onChange={e=>set_amount(e.target.value)} style={{color:'black'}} min="0" step="0.1" type="number" id="amount" outline/>
            </div>
            <div onClick={sendTransaction} className='col-1'>
            <Send style={{height:'100%'}} color="white"/>
            </div>
        </div>
        </div>
    );
}