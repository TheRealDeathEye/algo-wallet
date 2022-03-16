import logo from '../imgs/logo.png';
import copyIcon from '../imgs/copyIcon.png';
import receiveIcon from '../imgs/receive.png';
import send from '../imgs/send.png';
import connect from '../imgs/connect.png';
import Card from 'react-bootstrap/Card';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from 'react';
import AddressCard from './AddressCard';

export default function Home() {
    const total = 400;
    const [connected, set_connected] = useState(false);
    const [address, set_address] = useState('');
    const [balance, set_balance] = useState('');
    const [receive, set_receive] = useState('');
    const connect_func = async () => {
        await window.ethereum.request({
            method: 'wallet_enable',
            params: [{
              wallet_snap: { ["npm:algorand"]: {} },
            }]
          })
        await getAddress();
        await getBalance();
        set_connected(true);

    }
    const getBalance = async () => {
      console.log("getting balance");
        let bal = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", {
              method: 'returnBalance'
            }]
          })
        console.log(bal);
        set_balance(bal/1000000);
    }
    const getAddress = async () => {
        let address = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", {
              method: 'getAddress'
            }]
          })
        set_address(address);
      }
    const toggleReceive = () => {
        set_receive(!receive);
    }
    return(
        <div>
            <div align='center'>
                <br/>
                <img style={{width:'200px'}} src={logo} alt='' />
                
            </div>
            <div align='center' style={{marginTop:'60px'}}>
                
                <h1>{balance} ALGO</h1>
                {connected ?
                <div style={{display:'flex', justifyContent: 'center'}}>
                  <p style={{fontSize: '75%', marginRight:'5px'}}>{address}</p>
                  <CopyToClipboard text={address}>
                  <img style={{width: '20px', height: '20px', cursor:'pointer'}} src={copyIcon}/>
                  </CopyToClipboard>
                </div>
                :
                null
                }
                
                
                <div className='row' style={{paddingTop:'20px', maxWidth:'350px'}}>
                    <div className='col'>
                    <Card onClick={connect_func} style={{backgroundColor:'transparent'}}>
                        <Card.Img variant='top' src={connect} />
                        <Card.Text >Connect</Card.Text>
                    </Card>
                    </div>
                    <div className='col'>
                    <Card style={{backgroundColor:'transparent'}}>
                        <Card.Img onClick={toggleReceive} variant='top' src={receiveIcon} />
                        <Card.Text onClick={toggleReceive}>Receive</Card.Text>
                    </Card>
                    </div>
                    <div className='col'>
                    <Card style={{backgroundColor:'transparent'}}>
                        <Card.Img variant='top' src={send} />
                        <Card.Text>Send</Card.Text>
                    </Card>
                    </div>
                </div>
                <br/>
                {receive?
                  <div>
                    {connected?<AddressCard address={address}/>:<p>connect wallet first</p>}
                  </div>
                        :
                        null
                        }
            </div>
        </div>
    );
}