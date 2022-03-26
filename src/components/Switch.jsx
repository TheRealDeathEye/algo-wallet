import React, {useState} from 'react';
import './switch.css';
const Switch = ({ onClick, onColor }) => {
    const [on, setOn] = useState(false);
    return (
      <>
        <button
          onClick = {(e)=>{
            setOn(!on);  
            onClick(e);
            }}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="button"
        />
        <label
          style={{ 
              background: on && '#76F935',
              width: on && '50px',
            }}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
  };
  
  export default Switch;