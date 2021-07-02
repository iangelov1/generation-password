import React, { useState, useEffect } from 'react'

import Slider from './slider/Slider';
import CheckBox from './checkbox/CheckBox';

import { generatePassword, setPasswordLength, copyToClipBoard } from '../../utils/Helper';

import './Container.css';

const CHECKBOX_LIST = [
    {
        id: 0,
        name: 'uppercase',
        label: 'Uppercase',
        isChecked: true
    },
    {
        id: 1,
        name: 'lowercase',
        label: 'Lowercase',
        isChecked: true
    },
    {
        id: 2,
        name: 'symbols',
        label: 'Symbols',
        isChecked: true
    },
    {
        id: 3,
        name: 'numbers',
        label: 'Numbers',
        isChecked: true
    },
]

const Container = ({ setUserPassword, setRange, setPasswordProps, passwordRef }) => {
    const [rangeValue, setRangeValue] = useState(12);

    const [checkbox, setCheckBox] = useState({
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
    });

    const [checked, setChecked] = useState(false);
    const [checkedName, setCheckedName] = useState('');

    const { uppercase, lowercase, symbols, numbers } = checkbox;

    useEffect(() => {
        setPasswordLength(rangeValue);
        setRange(rangeValue);
        setRangeValue(rangeValue);

        passwordGenerated(checkbox, rangeValue);

        checkBoxCount();

    }, [uppercase, lowercase, symbols, numbers]);

    const checkBoxCount = () => {
        const checkedCount = Object.keys(checkbox).filter(key => checkbox[key]);
        const disabled = checkedCount.length === 1;
        const name = checkedCount[0];

        if (disabled) {
            setChecked(disabled);
            setCheckedName(name);
        } else {
            setChecked(false);
            setCheckedName('');
        }

        console.log(checkedCount);
    }

    const passwordGenerated = (checkbox, rangeValue) => {
        const pwd = generatePassword(checkbox, rangeValue);
        setUserPassword(pwd);
        setPasswordProps(checkbox);
    }

    //change range number and set to rangeValue
    const onChangeSlider = (e) => {
        setRangeValue(e.target.value);
        
        setPasswordLength(e.target.value);
        setRange(e.target.value);
        passwordGenerated(checkbox, e.target.value  )
    }
    
    //selected checkbox and change isChecked property
    const onChangeCheckBox = (e) => {
        let { name, checked } = e.target;

        CHECKBOX_LIST.map(checkbox => {
            if(checkbox.name === name) {
                checkbox.isChecked = checked;
                // setCheckBox({ [name]: checkbox.isChecked });
                setCheckBox(prevState => ({ ...prevState, [name]: checkbox.isChecked }));
                setPasswordLength(rangeValue);
                setRangeValue(rangeValue);
            }
            return '';
        });
        console.log(CHECKBOX_LIST)
    }

    const copyClipBoard = elementRef => (e) => {
        e.preventDefault();
        copyToClipBoard(elementRef);
    }

    return (
        <div className="password-settings">
            <h3>Use the slider, and seect from the options</h3>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <Slider 
                            min={1}
                            max={60}
                            step={1}
                            defaultLength={parseInt(rangeValue, 10)}
                            value={parseInt(rangeValue, 10)}
                            onChangeValue={onChangeSlider}
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="row checkbox-container">
                        {
                            CHECKBOX_LIST.map(checkbox => 
                                <CheckBox 
                                    key={checkbox.id}
                                    name={checkbox.name}
                                    label={checkbox.label}
                                    checked={checkbox.isChecked}
                                    value={checkbox.isChecked}
                                    onChange={onChangeCheckBox}
                                    disabled={
                                        checked && checkbox.isChecked && checkedName === checkbox.name
                                    }
                                />
                            )
                        }
                    </div>
                </div>
            </div>
{/* 
            <div className="text-center">
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-password" onClick={copyClipBoard(passwordRef.current)}>Copy Password</button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Container
