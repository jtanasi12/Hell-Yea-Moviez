
//************** Provide methods for the reviews.route *******************  */

const ReviewsDAO = require('../dao/reviewsDAO.js');


class ReviewsController{

    // Adding a review
    static async apiPostReview( req, res, next ){
       try{
        // Collect information from the body of the request which is in JSON 
            const movieID = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(movieID, user,review);

            res.json({status: "success"});

       }
        catch(e){
            res.status(500).json({error: e.message});

             // Status 500 means the request was accepted but the server had an error
        }
    };

    static async apiGetReview( req, res, next ){
       
        try{
            let id = req.params.id || {};
            // Get the ID from parameter in the url to look up a specific reviewID
            
            let review = await ReviewsDAO.getReview(id);

            if(!review){
                res.status(404).json({error: "Review not found"});
                return;
            }
            res.json(review);
        }
        catch(e){
            res.status(500).json({error: e.message});

             // Status 500 means the request was accepted but the server had an error
        }

    };

    static async apiUpdateReview( req, res, next ){

        try{
              // Collect information from the body of the request which is in JSON 
              const reviewID = req.params.id;
              const review = req.body.review;
              const user = req.body.user;

              const reviewResponse = await ReviewsDAO.updateReview(reviewID, user,review);

              // status 400 = bad request 
              let {error} = reviewResponse;
              if(error){
                res.status(400).json({error});
              }
              // If the review modified count is 0 that means the review was never modified because it doesn't exist 
              if(reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review");
              }

              res.json({status: "success"});
        }

        catch(e){
            res.status(500).json({error: e.message});

            // Status 500 means the request was accepted but the server had an error 
        }
    };

    static async apiDeleteReview( req, res, next ){

        try{
            const reviewID = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewID);

            res.json({status: "success"});

        }
        catch(e){
            res.status(500).json({error: e.message});

             // Status 500 means the request was accepted but the server had an error
        }
    };


    
    static async apiGetReviews( req, res, next ){
        
        try{
            // Get the ID from the URL parameter
            let id = req.params.id || {};

            let reviews = await ReviewsDAO.getReviewsByMovieId(id);  

            if(!reviews){
                res.status(404).json({error: "Movie reviews not found"});
            }
            res.json(reviews);

        } 
        catch(e){
            res.status(500).json({error: e.message});

             // Status 500 means the request was accepted but the server had an error
        }
    }

}

module.exports = ReviewsController;


