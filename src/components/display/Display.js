import React, { useState, useRef } from 'react'

import { FaCheckCircle, FaCopy, FaSyncAlt, FaCircleNotch } from 'react-icons/fa';

import './Display.css';
import Container from '../container/Container';
import { generatePassword, copyToClipBoard } from '../../utils/Helper';

const Display = () => {
    const [password, setPassword] = useState('');
    const [rangeValue, setRange] = useState();
    const [passwordProps, setPasswordProps] = useState();
    const passwordRef = useRef(null);

    let pwdDescription = '';

    const generateNewPassword = () => {
        const pwd = generatePassword(passwordProps, rangeValue);
        setPassword(pwd);
    }

    const copyClipBoard = (e) => {
        e.preventDefault();
        copyToClipBoard(passwordRef.current);
    }


    //change background 
    const setBackgroundColor = (password) => {
        if (password && password.length === 1 && password.length <=5 ) {
            pwdDescription = 'Bad password';
            return '#cb473e';
        } else if (password && password.length >= 6 && password.length <=10 ) {
            pwdDescription = 'Weak password';
            return '#f07d58';
        } else if (password && password.length > 10) {
            pwdDescription = 'Strong password';
            return '#55a95d';
        } else {
            pwdDescription = 'Bad password';
            return '#cb473e';
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-12 password-display-container"
                    style={{ backgroundColor: setBackgroundColor(password) }}>
                    <div style={{ width: '100%' }}>
                        <div className="password-display">
                            <input 
                                ref={passwordRef}
                                type="text"
                                value={password}
                                className="password-display-input"
                                readOnly
                            />
                        </div>

                        <div className="password-description">
                            {
                                password && password.length > 10
                                    ? (<> 
                                            <FaCheckCircle className="fas" /> 
                                            { pwdDescription }
                                        </>)
                                    : ( <>
                                            <FaCircleNotch className="fas" /> 
                                            { pwdDescription }
                                        </>)
                            }
                            
                        </div>
                    </div>

                    <div className="password-display-icons">
                        <button className="copy-btn">
                            <FaCopy onClick={(e) => copyClipBoard(e)} />
                        </button>

                        <button className="generate-btn"> 
                            <FaSyncAlt className="fas" onClick={() => generateNewPassword()} />
                        </button>
                    </div>
                </div>

                <Container 
                    setUserPassword={setPassword} 
                    setRange={setRange}    
                    setPasswordProps={setPasswordProps}
                    passwordRef={passwordRef}
                />
            </div>
        </>
    )
}

export default Display
