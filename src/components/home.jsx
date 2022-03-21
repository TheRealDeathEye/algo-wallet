import logo from '../imgs/logo.png';
import copyIcon from '../imgs/copyIcon.png';
import receiveIcon from '../imgs/receive.png';
import sendIcon from '../imgs/send.png';
import connect from '../imgs/connect.png';
import Card from 'react-bootstrap/Card';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from 'react';
import AddressCard from './AddressCard';
import SendCard from './SendCard';

export default function Home() {
    const total = 400;
    const [connected, set_connected] = useState(false);
    const [address, set_address] = useState('');
    const [balance, set_balance] = useState('');
    const [receive, set_receive] = useState('');
    const [send, set_send] = useState('');
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
        if(send){
          set_send(false);
        }
        set_receive(!receive);
    }
    const toggleSend = () => {
      if(receive){
        set_receive(false);
      }
      set_send(!send);
    }

    const blink = () => {
      document.getElementById('blinkable').style.color='#76F935';
      setTimeout(function(){
        document.getElementById('blinkable').style.color='white';
      }, 100);
    }

    return(
        <div>
            <div align='center'>
                <br/>
                <img style={{width:'200px'}} src={logo} alt='' />
                
            </div>
            <div align='center' style={{marginTop:'60px'}}>

                <h1 style={{color:'#76F935'}}>{balance} ALGO</h1>
                {connected ?
                <div style={{display:'flex', justifyContent: 'center', paddingTop:'20px'}}>
                  <p style={{fontSize: '1.5vw', marginRight:'5px'}} id='blinkable'>{address}</p>
                  <CopyToClipboard text={address}>
                  <img onClick={blink} style={{width: '20px', height: '20px', cursor:'pointer'}} src={copyIcon}/>
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
                        <Card.Img variant='top' onClick={toggleSend} src={sendIcon} />
                        <Card.Text onClick={toggleSend}>Send</Card.Text>
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
                {send?connected?<SendCard/>:<p>Connect wallet first</p>:null}
            </div>
        </div>
    );
}