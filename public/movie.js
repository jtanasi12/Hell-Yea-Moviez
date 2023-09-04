
const url = new URL(location.href);
// Gives us the current URL http://127.0.0.1:5500/Front/movie.html and then 
// we apphend the movie ID number and name with encoding to fill the spaces 

const movieId = url.searchParams.get("id");
// Pulls out the movie ID number we apphended on 

const posterPath = url.searchParams.get("img");

const movieTitle = url.searchParams.get("title");

// Pulls out the title that we apphended on 

const hell_yea_moviez_api = 'http://localhost:5500/api/v1/reviews/';
//const hell_yea_moviez_api = 'https://hell-yea-moviez.onrender.com/api/v1/reviews/';

const movieImg = url.searchParams.get("img");

document.body.style.backgroundImage= `url(${movieImg})`
document.body.style.backgroundPosition = 'center'
document.body.style.backgroundSize = 'cover'
document.body.style.objectFit = 'cover'

const main = document.getElementById("section-movies");
const title = document.getElementById("movie-title");
const navTitle = document.getElementById('nav-title');

navTitle.innerHTML = `${movieTitle}`;
//title.innerHTML =  `<p id="movie-title">${movieTitle}</p>`;


const div_newCard = document.createElement('div');

div_newCard.innerHTML = `
<div class="row">
<div class="column"> 
        <div class="cardReview">
            <p id="newReview"> New Review:  </p>
            <p> <strong>Review:  </strong> 
               <input type="text" id="new_review" value="">
            </p>
            
            <p> <strong>User:  </strong> 
            <input type="text" id="new_user" value="">
            </p>

            <p><a style="text-decoration: none;" href="#" onclick="saveReview('new_review', 'new_user')"> <span id="saveEmoji"> 💾 </span> </a>
            </p>

        </div> 
</div>
</div>`;

main.appendChild(div_newCard);

// Call the returnReviews function whenever this page gets loded 
returnReviews(hell_yea_moviez_api);

function returnReviews(url){

    // Apphend the data from http://127.0.0.1:5500/movie.html
    url += "movie/" + movieId;

    // If we don't specify, fetch will default to a GET requeswt 
    fetch(url).then(res=>res.json()) // Conver the data into json 
    .then((data)=>{  // Allows us to access the data 
     console.log(data);
     console.log(url);

        // Iterating through the JSON objects 
        data.forEach( (review)=>{
            const div_card = document.createElement('div');
           
            div_card.innerHTML = `
                <div class="row">
                        <div class="column"> 
                                <div class="cardReview" id="${review._id}">

                                    <div class="bucket-1">
                                    <p id="reviewText"> <strong>Review:  </strong>${review.review} </p>
                                    <p id="userText"> <strong>User: </strong> ${review.user}</p>
                                    </div>

                                <div class="bucket-2">
                                <p> <span id="emojis">   <a  style="text-decoration: none;" href="#/" onclick="editReview('${review._id}', '${review.review}', '${review.user}')"> <span id="trashEmoji"> ✏️ </span> </a> <a  style="text-decoration: none;" href="#" onclick="deleteReview('${review._id}', '${review.review}', '${review.user}')"> <span id="pencilEmoji"> 🗑️</span> </a>    </span>  </p>
                                </div>
                
                                </div> 
                        </div>
                    </div>`;

            main.appendChild(div_card);

            });
        });
}

function editReview(id, review, user){

    localStorage.setItem('scrollPositionX',window.scrollX)
    localStorage.setItem('scrollPositionY',window.scrollY)

    const element = document.getElementById(id);
    const reviewInputID = "review" + id;
    const userInputID = "user" + id;

    element.innerHTML = `
        <p id="updateReview"><strong>Review: </strong>
        <input type="text" id="${reviewInputID}" value="${review}">
    
        </p>

        <p><strong>User: </strong>
            <input type="text" id="${userInputID}" value="${user}"></input>
        </p>

        <p><a style="text-decoration: none;" href="#/" onclick="saveReview('${reviewInputID}', '${userInputID}', '${id}' )"> <span id="saveEmoji">💾 </span></a>
        </p>`;

        console.log("EDIT CALLED")
}

// For reviewID we can pass in a variable, but if we don't reviewID will default
// to an empty string. This is when we are saving a new review and not updating 
// an exisiting review.
function saveReview(reviewInputID, userInputID, reviewID=""){
    // Get the IDs of the forms so we can access the values 
    // that were entered into the forms 

    // Store the value of what was entered not the ID
    const review = document.getElementById(reviewInputID).value;
    const user = document.getElementById(userInputID).value;

    // If the reviewID is not empty that means we are updating a review 
    if(reviewID){

        // Specify a put request, not the default GET 
        fetch(hell_yea_moviez_api + reviewID, 
            {
                method: 'PUT',
                headers: {
                    'Accept': '*/*', // Accepts all forms of data 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"user": user, "review": review})
                // Make a string from an object 
            }
        
            ).then((response)=> response.json())
            .then((data)=>{
                console.log(data);
                location.reload(true); // JS / Reload the URL so the updated data will brought back into the screen 
        
            })
    }
    // Saving a brand new review 
    else{
        console.log(movieId);

         // Specify a post request, not PUT because we are adding and not updating
         fetch(hell_yea_moviez_api + "new", 
            {
                method: 'POST',
                headers: {
                    'Accept': '*/*', // Accepts all forms of data 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
                // We want to create a new movieID which is going to be the ID number that we get from TMDB. Each movie has its own ID that is apphended into the URL. We will save this into the movieID in the databse 

                
            }
        
            ).then((response)=> response.json())
            .then((data)=>{
                console.log(data);
               document.location.reload(true); // JS / Reload the URL so the updated data will brought back into the screen 
        
            })
    }

}
 
function deleteReview(id){
    
    fetch(hell_yea_moviez_api + id, {
        method: 'DELETE'
    }).then(res=>res.json())
    .then((data)=>{
        console.log(data); 
        location.reload(true);
    })
}

