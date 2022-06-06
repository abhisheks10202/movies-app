import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Movies extends Component {
  render() {
    return (
        <div style={{display:'flex',marginLeft:'2rem',marginTop:'1.5rem'}}>
          <Link to='/'> <h1 style={{textDecoration:"none"}}>Movies</h1></Link>
          <Link to="/favourites"> <h3 style={{marginLeft:'2rem',marginTop:'0.9rem',textDecoration:"none"}}>Favourites</h3></Link>
      
      
      </div>
    )
  }
}
