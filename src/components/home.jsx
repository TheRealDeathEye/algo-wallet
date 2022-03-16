import logo from '../imgs/logo.png';
import receive from '../imgs/receive.png';
import send from '../imgs/send.png';
import connect from '../imgs/connect.png';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';

export default function Home() {
    const total = 400;
    const [connected, set_connected] = useState(false);
    const [address, set_address] = useState('');
    const connect_func = async () => {
        await window.ethereum.request({
            method: 'wallet_enable',
            params: [{
              wallet_snap: { ["npm:algorand"]: {} },
            }]
          })
        getAddress();
        set_connected(true);

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

    return(
        <div>
            <div align='center'>
                <br/>
                <img style={{width:'200px'}} src={logo} alt='' />
                <p>{address}</p>
            </div>
            <div align='center' style={{marginTop:'100px'}}>
                
                <h1>{total} Algo</h1>
                
                <h5 style={{paddingTop:'10px'}}>~ $400</h5>
                <div className='row' style={{paddingTop:'40px', maxWidth:'350px'}}>
                    <div className='col'>
                    <Card onClick={connect_func} style={{backgroundColor:'transparent'}}>
                        <Card.Img variant='top' src={connect} />
                        <Card.Text >Connect</Card.Text>
                    </Card>
                    </div>
                    <div className='col'>
                    <Card style={{backgroundColor:'transparent'}}>
                        <Card.Img variant='top' src={receive} />
                        <Card.Text>Receive</Card.Text>
                    </Card>
                    </div>
                    <div className='col'>
                    <Card style={{backgroundColor:'transparent'}}>
                        <Card.Img variant='top' src={send} />
                        <Card.Text>Send</Card.Text>
                    </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}