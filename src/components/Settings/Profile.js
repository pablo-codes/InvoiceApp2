import React, { useState } from 'react'
import "./admin-css.css";
// import { BsToggleOff, BsToggleOn } from "react-icons/bs";

const Profile = () => {

    const initarr = [
        {
            key: '1',
            name: 'VAT',
            value: 0,
        },
        {
            key: '2',
            name: 'Discount',
            value: -10,
        }

    ]




    const data = () => {
        let dat = localStorage.getItem(1)
        if (dat) {
            return dat
        } else {
            return initarr
        }
    }


    const [state, setState] = useState(data)
    console.log(state)

    const add = (e) => {
        e.preventDefault();
        const news = state.length + 2;
        setState((e) => [
            ...e,
            {
                key: news,
                name: '',
                value: ''
            },
        ]);
        for (let i = 0; i < state.length; i++) {
            const el = state[i];
            localStorage.setItem(el.key, JSON.stringify(el))
        }
    };





    return (
        <div className='invoice-div'>
            <h4 className='text-center'>Add a minus for  subcharges and taxes</h4>
            {state.length > 1 && state.map((el) => {
                return <div className='container' key={el.key}> <h3 className='d-inline '>{el.name} in % : </h3>
                    <input
                        type="number"
                        value={el.value}
                        // onChange={(e) =>
                        //     handleInputChange(e.target.value, el.key, "price")
                        // }
                        className="form-control"
                        style={{ width: '10%' }}
                        name={el.name}
                    />
                    {/* {state ? <BsToggleOn color='green' size={'2rem'} onClick={() => { setState(false) }} /> : <BsToggleOff color='green' size={'2rem'} onClick={() => { setState(true) }} />} */}
                </div>
            })}

            <button type="button" class="btn btn-primary btn-square" onClick={add} style={{ width: '4.5%', alignSelf: 'center' }}>
                +
            </button>
        </div>
    )
}

export default Profile