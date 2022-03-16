import React from "react";
import QRCode from "react-qr-code";

export default function AddressCard(props){
    return(
    <>
    <div style={{backgroundColor : "white", width: 'fit-content', padding: "10px", borderRadius:'10px'}}>
    <QRCode value={props.address} />
    </div>
    
    </>
    )
}