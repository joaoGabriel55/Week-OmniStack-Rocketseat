import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'
import './Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import itsamatch from '../assets/itsamatch.png'

import {Link} from 'react-router-dom'

import Api from '../services/Api'

export default function Main({ match }) {

  const [users, setUsers] = useState([])
  const [matchDev, setMatchDev] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      const response = await Api.get('/devs', {
        headers: {user: match.params.id}
      })
      setUsers(response.data)
    }
    loadUsers()
  }, [match.params.id]);

  //For socket io
  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: {user: match.params.id}
    })

    socket.on('match', dev=> {
      setMatchDev(dev)
    })
  }, [match.params.id]);

  async function handleLike(id) {
    await Api.post(`/devs/${id}/likes`, null, {
      headers: {user: match.params.id}
    })

    setUsers(users.filter(user=> user._id !== id))
  }

  async function handleDislike(id) {
    await Api.post(`/devs/${id}/dislikes`, null, {
      headers: {user: match.params.id}
    })

    setUsers(users.filter(user=> user._id !== id))
  }

  return (
      // <h1>{match.params.id}</h1>
      <div className="main-container">
      <Link to='/'>
        <img src={logo} alt="Tindev"/>
      </Link>
      
          {users.length > 0 ? (
          <ul>
            {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name}/>
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={()=> handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike"/>
                </button>
                <button type="button" onClick={()=> handleLike(user._id)}>
                  <img src={like} alt="Like"/>
                </button>
              </div>
            </li>
          ))}
          </ul>
          ) : (<div className="empty">The your user list is empty!</div>)}

          {matchDev && (
            <div className="match-container">
              <img src={itsamatch} alt="It's a match!"/>
              <img className='avatar' src={matchDev.avatar} alt=""/>
              <strong>{matchDev.name}</strong>
              <p>{matchDev.bio}</p>
              <button type='button' onClick={()=> setMatchDev(null)}>CLOSE</button>
            </div>
          )}
      </div>
    );
  
}
