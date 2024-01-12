/* import {readDataToFirestore} from '../JS/firebase' */
import { Model } from "./model";
import {View} from "./view"
import { LocalStorage } from "./localStorage";
import { readDataToFirestore, addDataToFirestore, deleteDataToFirestore, updateDataToFirestore } from "./firebase";

export class Controller{
    constructor(){
        this.model = new Model({
            onMovieChange: this.handleModelMovieChange,                   
        })

        this.view = new View({
            onAddNewMovie: this.handleViewAddNewMovie,
            onDeleteMovie: this.handleViewDeleteMovie,
            onDoneMovie: this.handleViewDoneMovie,
        })

        this.LocalStorage = new LocalStorage({
            onLocalStorageChange: this.handleLocalStorageChange,
        })  
         
    }
    
    async init(){
        console.log('dasdsadasdsaddddddd');
        //const movieList = this.LocalStorage.loadFromLocalStorage();  
        const movieList = await readDataToFirestore();
        console.log(movieList);        
        this.model.getMovies(movieList);
        //const movieTitle = readDataToFirestore();
        
    } 

    handleLocalStorageChange = (movieList) => {
        this.view.renderMovie(movieList);
    }

    handleModelMovieChange = (movieList) => { 
        this.view.renderMovie(movieList);        
        this.LocalStorage.saveToLocalStorage(movieList);        
    }

    handleViewAddNewMovie = (MovieName) => {
        this.model.addMovie(MovieName);  
        addDataToFirestore(MovieName);       
    }

    handleViewDeleteMovie = (id) =>{
        console.log(id)
        this.model.deleteMovie(id);
        deleteDataToFirestore(id);
    }

    handleViewDoneMovie = (id) => {
        this.model.doneMovie(id);       
    }
}