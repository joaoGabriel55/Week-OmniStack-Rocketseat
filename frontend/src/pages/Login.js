import React, { useState } from 'react';
import './Login.css'
import logo from '../assets/logo.svg'

import Api from '../services/Api'

//Componente, Stado e Propriedade

export default function Login({history}){
    const [username, setUsername] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        
        const response = await Api.post('/devs', {
            username
        })
        console.log(response);
        
        const {_id} = response.data

        history.push(`/dev/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input
                    placeholder="Type your Github username"
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />    
                <button type="submit">Send</button>
            </form> 
        </div>
    )
}

