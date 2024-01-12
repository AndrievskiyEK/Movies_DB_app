import arrowImg from '../resourses/close.png' 
export class View {
    constructor({onAddNewMovie,onDeleteMovie,onDoneMovie}){        
        
        this.movieInputNode = document.getElementById("moviesFormInput");
        this.movieAddButtonNode = document.getElementById("movieAddButton");
        this.moviesListNode = document.getElementById("movieslist");
        this.validationMessageNode = document.getElementById('validationMessage');
        //Обработчики событий       
        this.onAddNewMovie = onAddNewMovie;

        this.onDeleteMovie = onDeleteMovie;

        this.onDoneMovie = onDoneMovie;
        //слушатели событий
        //Валидация
        this.movieInputNode.addEventListener('input', this._validation);
        //Добавление фильма
        this.movieAddButtonNode.addEventListener('click', this._handleBtnAddMovie);
        //Валидация 
        this.movieAddButtonNode.addEventListener('click', this._validation);
        //Удаление фильма
        this.moviesListNode.addEventListener('click', this._handleBtnDeleteMovie);
        //Отметка фильма как "просмотренный"
        this.moviesListNode.addEventListener('click', this._handleDoneMovie);       
    }

    _validation = () => {
        const titleValue = this.movieInputNode.value; 
        // пограничные условия
        if (titleValue.trim() === ""){        
            this.validationMessageNode.classList.remove ("movies__validationMessage_hidden"); 
            this.movieAddButtonNode.setAttribute("disabled", "true");        
            return
        }
        this.validationMessageNode.classList.add ("movies__validationMessage_hidden"); // добавляем класс validationMessage_hidden (скрываем надпись)
        this.movieAddButtonNode.removeAttribute("disabled");  // удаляем атрибут disabled 
    }

    _handleBtnAddMovie = (event) => {
        event.preventDefault();
        const MovieName = this.movieInputNode.value;        
        this.movieInputNode.value = '';
        this.movieInputNode.focus(); 
        console.log(MovieName);
        this.onAddNewMovie(MovieName);       
    }

    _handleBtnDeleteMovie = (event) => {
        if (event.target.dataset.action !=="delete")return;
        const parenNode = event.target.closest(".movies__item");          
        const id = parenNode.id;
        /* const id = Number(parentNode.id); */
        console.log(id);
        this.onDeleteMovie(id);   
    }

    _handleDoneMovie = (event) => {
        if (event.target.dataset.action !=="done")return;
        const parentNode = event.target.closest('.movies__item');
        const id = parentNode.id;
        /* const id = Number(parentNode.id); */
        console.log(id)
        this.onDoneMovie(id);
    }

    renderMovie = (movieList) =>{   
        this.moviesListNode.innerHTML = "";
        movieList.forEach((movie) => {
            const movieItem = document.createElement("li");
            const movieCheckbox = document.createElement("div");
            const movieTitle = document.createElement("p");
            const movieCloseBtn = document.createElement("button");
            const movieCloseBtnImg = document.createElement("img");
    
            movieItem.id = movie.id;
            //Формируем CSS класс 
            const cssClassMovie = movie.done ? "movies__item movies__item-check": "movies__item";    
            movieItem.className = cssClassMovie;
            movieItem.setAttribute("data-action", "done");
            
            //Формируем CSS класс
            const cssClassMovieIndication = movie.done ? "movies__item-indication movies__item-indication-used": "movies__item-indication";
            movieCheckbox.className = cssClassMovieIndication;
            movieTitle.className = "movies__item-name";
            movieCloseBtn.className = "movies__item-close-btn";
            movieCloseBtn.setAttribute("data-action", "delete");
    
            movieTitle.innerText = movie.name;
            movieCloseBtnImg.src = arrowImg;
            movieCloseBtnImg.alt = "x";
            console.log("Этот текст")
    
            this.moviesListNode.appendChild(movieItem);
            movieItem.appendChild(movieCheckbox);
            movieItem.appendChild(movieTitle);      
            movieItem.appendChild(movieCloseBtn);         
            movieCloseBtn.appendChild(movieCloseBtnImg);        
        })
    }
}