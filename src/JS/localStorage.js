export class LocalStorage{
    constructor () {
       
    }

    loadFromLocalStorage = () => {

        
        const storedMovieList = localStorage.getItem('movieList');
        if (storedMovieList) {
            this.movieListLS = JSON.parse(storedMovieList);
            console.log(storedMovieList)  
            console.log('123')
            console.log(this.movieListLS) 
            return this.movieListLS;
        } 
        else {return []}       
    }

    saveToLocalStorage = (movieList) => {
        localStorage.setItem('movieList', JSON.stringify(movieList));
    }
}