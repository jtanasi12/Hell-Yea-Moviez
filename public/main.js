

// Variable Declarations 
const api_key = 'ae6d9540ae2aa4a7c3d19763cd3c2919';

// This was achieved through the GET configuration 
// https://api.themoviedb.org/3/configuration
const image_base_url = 'https://image.tmdb.org/t/p/w1280';

const discover_api = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=ae6d9540ae2aa4a7c3d19763cd3c2919';

const search_api = 'https://api.themoviedb.org/3/search/movie?&api_key=ae6d9540ae2aa4a7c3d19763cd3c2919&query=';


const main = document.getElementById("section-movies");
const form = document.getElementById("form");
const search = document.getElementById("query");

/* Allows us to make HTTP request to servers from web browsers. The fetch() instructs the web browser to send a request to a URL 
*/ 

// Fetch is used to request data from a server. The requested has to be converted into JSON or XML data 
function fetchMovies(url){

        const fetchData = fetch(url)
        // Convert the response from the server into JSON 
        .then((response)=> response.json())
        //Print out the results to the console 
        .then(function(resultArray){

            // The array of the response in the order of - {page, results, total_pages, total_results}
            console.log(resultArray);

            // An array of the movies 
            console.log( resultArray.results);

            // Total number of movies inside the array
            console.log(resultArray.results.length);

            let numberOfMovies = resultArray.results.length;

            console.log(resultArray.results[0].title);
            // Assign Values 
            for(let index = 0; index < numberOfMovies; index++){


            const row = document.createElement('div');
            row.setAttribute('class', 'row');

            const column = document.createElement('div');
            column.setAttribute('class', 'column');


            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const contentHolder = document.createElement('div');
            contentHolder.setAttribute('class', 'contentHolder');

            const movieImg = document.createElement('img');
            movieImg.setAttribute('class', 'movieImg');

            const title = document.createElement('h3');
            title.setAttribute('class', 'title');
    

           title.innerHTML = `${resultArray.results[index].title}`;

           // Link this to the new page
           title.innerHTML += `<br></br> `;
           title.innerHTML += `<a href=movie.html?id=${resultArray.results[index].id}&title=${encodeURI(resultArray.results[index].title)}&img=${image_base_url}${resultArray.results[index].poster_path}>Reviews</a>`
    
           console.log(resultArray.results[index].poster_path); 

           let poster = resultArray.results[index].poster_path;

           movieImg.src = image_base_url + poster;
           console.log(movieImg.src);

           contentHolder.appendChild(movieImg);
           contentHolder.appendChild(title);
           card.appendChild(contentHolder);
           column.appendChild(card);
           row.appendChild(column);
           main.appendChild(row);

        }
    // Catch any errors
     }).catch(function(err){
        console.error(err);
     });
}

// Load the discovered movies onto the home page 
fetchMovies(discover_api);


form.addEventListener("submit", (e) =>  {


    e.preventDefault();

    // Clear all the previous movies that were loaded to the screen because we are now committing to a search
    main.innerHTML = ''; 
    

    // Retrieve the value entered by the user 
    const searchItem = form.querySelector('input').value;

    console.log(searchItem);

    // If the search item is not empty 
    if(searchItem){
        fetchMovies(search_api + searchItem);

        let logo = document.querySelector('a');
        logo.textContent = "Home Page"
      

    }
    else{
        fetchMovies(discover_api);
    }
});
