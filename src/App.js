
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c0b9b168`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
      setMovies(responseJson.Search)
    }
  }

  useEffect(()=> {
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{

    const movieFavourite = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourite)
  },[])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))

  }

  const addFavouriteMovie = (movie) => {

    const newFavourites = [...favourites, movie];
    setFavourites(newFavourites);
    
    saveToLocalStorage(newFavourites);

  }

  const RemoveFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite)=> favourite.imdbID !== movie.imdbID );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue= {setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          handleFavouriteClick={addFavouriteMovie} 
          favouriteComponent={AddFavourites}/>
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList 
          movies={favourites} 
          handleFavouriteClick={RemoveFavouriteMovie} 
          favouriteComponent={RemoveFavourites}
          />
      </div>
       
      
    </div>
  );
}

export default App;
