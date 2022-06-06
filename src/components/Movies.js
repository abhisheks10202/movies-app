// import {movies} from "./GetMovies"

import React, { Component } from 'react'
import axios from 'axios'

export default class Movies extends Component {
constructor(){
    super();
    this.state={
        hover:"",
        parr:[1],
        currPage:1,
        movies:[],
        favourites:[]
    }
}

async componentDidMount(){
    //side effect
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ad84bed42788bc34f1883fc8c0715e1f&language=en-US&page=${this.state.currPage}`)
    let data=res.data
    console.log(data)
    this.setState({
        movies:[...data.results]
    })
}

changeMovies=async()=>{
    console.log(this.state.parr,"change",this.state.currPage)
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ad84bed42788bc34f1883fc8c0715e1f&language=en-US&page=${this.state.currPage}`)
    let data=res.data

    this.setState({
        movies:[...data.results]
    })
    console.log(this.state.parr,"movie chnge called")
}

handleFavourites=(movie)=>{
let oldData=JSON.parse(localStorage.getItem("movies-app")||"[]")
if(this.state.favourites.includes(movie.id)){
    console.log("duplicate movie found")
    oldData=oldData.filter((m)=>m.id!=movie.id)
}
else{
    oldData.push(movie);
}
localStorage.setItem("movies-app",JSON.stringify(oldData));

console.log(oldData);
this.handleFavouritesState();

}
handleFavouritesState=()=>{
    let oldData=JSON.parse(localStorage.getItem("movies-app")||"[]")
    let temp=oldData.map((movie)=>movie.id)
    this.setState({
        favourites:[...temp]
    })
}

handleLeft=()=>{
   if(this.currPage!=1)
   {
    this.setState({
    currPage:this.state.currPage-1,
    },this.changeMovies)
   }
}
handleClick=(pageNo)=>{
    if(this.state.currPage!=pageNo){
console.log(pageNo,"handle clicked")
    this.setState({
        currPage:pageNo
    },this.changeMovies)
}

}


handleRight=()=>{
    let temparr=[];
    for(let i=1;i<=this.state.parr.length+1;i++)
    {
        temparr.push(i);
    }
    this.setState({
        parr:[...temparr],
    currPage:this.state.currPage+1,
   
    },this.changeMovies)
}


  render() {
      console.log("rendering")
    return (
        <>
      
        {
            this.state.movies.length==0?
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        : 
        <div>
                <h3 className="text-center">Trending</h3>
            <div className="movies-list">
                {
                    this.state.movies.map((movieObj)=>(
                       

                        <div className="card movies-card" onMouseEnter={()=>{this.setState({hover:movieObj.id})}} onMouseLeave={()=>{this.setState({hover:""})}} >
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img"  alt={movieObj.title}/>
                                <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                               
                                <div className="movies-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>

                                    {
                                            this.state.hover==movieObj.id&&
                                            <a  className="btn btn-primary movies-button" onClick={()=>{this.handleFavourites(movieObj)}}>{this.state.favourites.includes(movieObj.id)? "Remove from Favourites": "Add to Favourites"  } </a>

                                    }
                                   
                                </div>
                        </div>
                    ))
                }


            </div>

                    <div style={{display:'flex',justifyContent:'center'}}>

                    <nav aria-label="Page navigation example">
                            <ul class="pagination">
                            <li class="page-item"><a class="page-link"onClick={this.handleLeft}>Previous</a></li>
                                {
                                    this.state.parr.map((value)=>(
                                        <li class="page-item"><a class="page-link"onClick={()=> this.handleClick(value)   }>{value}</a></li>
                                    ))
                                }
                                <li class="page-item"><a class="page-link"  onClick={this.handleRight}>Next</a></li>
                             </ul>
                    </nav> 

                    </div>

        </div>


        }
        </>
    )
  }
}
