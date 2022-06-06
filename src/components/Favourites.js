import React, { Component } from 'react'
import {movies} from "./GetMovies"
export default class 
 extends Component {
   constructor(){
     super();
     this.state={
       genres:[],
       currgen:"All Genre",
       movies:[],
       currText:"",
       limit:5,
       currPage:1
     }
   }
   componentDidMount(){

    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let temp=[];
    let data=JSON.parse(localStorage.getItem("movies-app")||"[]")
    data.map((movieObj)=>(
      temp.includes(genreids[movieObj.genre_ids[0]])==false?
        temp.push(genreids[movieObj.genre_ids[0]] ):temp
    ))
    temp.unshift('All Genre');
   
    this.setState({
      genres:[...temp],
      movies:[...data]
    })
    console.log("setState after mount",movies);
   }

   handleGenreChange=(genre)=>{
    console.log(this.setState.currgen)
this.setState({
  currgen:genre
})
console.log(this.state.currgen)
   }

   sortPolpularityDesc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA,objB){
      return objB.popularity-objA.popularity
    })
    this.setState({
      movies:[...temp]
    })
   }

   sortPolpularityAsc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA,objB){
      return -objB.popularity+objA.popularity
    })
    this.setState({
      movies:[...temp]
    })
   }

   sortRatingAsc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA,objB){
      return -objB.vote_average+objA.vote_average
    })
    this.setState({
      movies:[...temp]
    })
   }

   sortRatingDesc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA,objB){
      return objB.vote_average-objA.vote_average
    })
    this.setState({
      movies:[...temp]
    })
   }
   handlePageChnage=(page)=>{
     this.setState({
       currPage:page
     })
   }
   handleDelete=(id)=>{
     let temparr=this.state.movies.filter((movieObj)=>{
       return movieObj.id!=id
   })
   this.setState({
     movies:[...temparr]
   })
   localStorage.setItem(JSON.stringify("movies-app",temparr))
   }
 
   

   

   
  render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let filterarr=[]

    if(this.state.currText==""){
      filterarr=this.state.movies;
    }
    else{
      filterarr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      })
    }

      if(this.state.currgen!="All Genre"){
      filterarr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
    }

    let pages=Math.ceil(filterarr.length/this.state.limit)
    let pagesarr=[]
    for(let i=1;i<=pages;i++)
    {
      pagesarr.push(i)
    }
    let si=(this.state.currPage-1)*this.state.limit
    let ei=si+this.state.limit
    filterarr=filterarr.slice(si,ei)
    return (
      <div>
        <>
          <div className='main'>
            <div className='row'>
                <div  className='col-lg-3 col-sm-12'>
                    <ul class="list-group favourites-genres">
                      {
                        this.state.genres.map((genre)=>(
                          this.state.currgen==genre?
                          <li class="list-group-item" style={{background:"#3f51b5",fontWeight:"bold",color:'white'}}>{genre}</li>
                          :
                          <li class="list-group-item" style={{background:"white",fontWeight:"bold",color:'#3f51b5'}} onClick={()=>{this.handleGenreChange(genre)}}>{genre}</li>
                        ))
                      }
                    </ul>
                </div>

                <div  className='col-lg-9 col-sm-12 favourites-table'>
                  <div className='row'>
                     <div class="input-group input-group-sm mb-3">
                        <input type="text" class="input -group-text col"   placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})} />
                        <input type="number" class="input -group-text col" placeholder='Count Rows' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}  />
                     </div>
                  </div>
                  <div  className='row'>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Genre</th>
                              <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPolpularityDesc }/>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPolpularityAsc } /></th>
                              <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc }/>Rating<i class="fa-solid fa-sort-up" onClick={this.sortRatingAsc }/></th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody> 
                            {
                              filterarr.map((movieObj)=>(
                                <tr>
                                  <th scope="row">
                                    
                              <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'5rem' ,marginRight:'1rem'}} alt={movieObj.title}/>{movieObj.original_title}</th>
                                  <td>{genreids[movieObj.genre_ids[0]]}</td>
                                  <td>{movieObj.popularity}</td>
                                  <td>{movieObj.vote_average}</td>
                                  <td><button className='btn btn-danger' onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                              </tr>
                              ))
                            }
                          </tbody>
                        </table>
                  </div>
                  <div className='row'>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      {
                        pagesarr.map((page)=>(
                          <li class="page-item"><a class="page-link"onClick={()=>this.handlePageChnage(page)} >{page}</a></li>
                        ))
                      }
                    
                    </ul>
                  </nav>

                  </div>

                </div>

            </div>
          </div>
        </>
      </div>
    )
  }
}
