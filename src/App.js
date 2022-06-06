
import './App.css';
import ReactDOM from "react-dom/client";
import Navbar from"./components/Navbar"
import Banner from './components/Banner';
import Movies from"./components/Movies";
import Favourites from './components/Favourites';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
// import { movies } from './components/GetMovies';

function App() {
  return (

    <BrowserRouter>
     <Navbar/> 
     {/* <Favourites/> */}
      <Routes>
          {/* <Route index element={<Movies />} /> */}

          <Route index element={[<Banner/>,<Movies/>]} />
          <Route path="favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>









//    <Router>
//      <Navbar/>  
//      {/* <Switch> */}
//    <Route path='/' exact render={(props)=>(
//      <>
//      <Banner {...props}/>
//      <Movies {...props}/>
//      </>
//    )} />
// <Route path="/" element={[<Banner/>,<Movies/>]} />

//    <Route path='/favourites' component={Favourites}/>

//    {/* </Switch> */}
//   </Router>
   
  );
}

export default App;
