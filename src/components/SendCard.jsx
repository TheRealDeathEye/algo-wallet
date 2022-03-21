import { Send, Clipboard } from 'react-bootstrap-icons';

import { MDBFormInline, MDBInput } from "mdbreact";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../index.css';
export default function SendCard(props){

    return(
        <div style={{width: '70vw'}}>
        
        
        <div>
            <MDBInput style={{color:'white', fontSize:"75%"}} id="address" outline/>
            <Clipboard style={{width:"30px"}} color="white"/>
        </div>


        
        <div style={{display:"inline"}}>    
          <MDBInput style={{color:'white'}} min="0" step="0.1" type="number" id="amount" outline/>
          <Send color="white"/>
        </div>
        
        </div>
    );
}