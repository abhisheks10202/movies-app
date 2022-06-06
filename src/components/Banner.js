import React, { Component } from 'react'
import {movies} from "./GetMovies"



export default class Banner extends Component {
  render() {
      
      let movie=movies.results[0];
      let img="./first.jpg"
      console.log(movie)
    //   movie=""
    return (
      <>
      {
        movie===""?
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        : 
      <div className="card banner-card" >
    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.title}/>
  {/* <div className="card-body"> */}

    <h1 className="card-title banner-title">{movie.original_title}</h1>
    <p className="card-text banner-text">{movie.overview}</p>
    
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  {/* </div> */}
</div>
  }
      </>
    )
  }
}
