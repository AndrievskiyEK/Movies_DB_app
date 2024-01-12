import {updateDataToFirestore} from './firebase'

export class Model {
    constructor ({onMovieChange}){
        this.movieList = [];
        this.onMovieChange = onMovieChange;         
    }

    getMovies = (movieList) =>{
        this.movieList = movieList;
        console.log(this.movieList);
        this.onMovieChange(this.movieList);
    }

    addMovie = (MovieName) => {
        this.movieList.push({
            id: Date.now(),
            name: MovieName,
            done: false,
        })
        this.onMovieChange(this.movieList);
    }

    deleteMovie = (id) => {        
        const index = this.movieList.findIndex( (movie) => movie.id === id);
        this.movieList.splice(index,1);
        this.onMovieChange(this.movieList);    
    }

    doneMovie = (id) => {        
        const movie = this.movieList.find( (movie) => movie.id === id);
        console.log(this.movieList)
        console.log(id)
        const updatedDoneMovie = !movie.done; // Ввел переменную что бы передать ее в fb
        movie.done = updatedDoneMovie
        /* movie.done = !movie.done;  */
        this.onMovieChange(this.movieList);  
        updateDataToFirestore(id, updatedDoneMovie); 
    }
}


