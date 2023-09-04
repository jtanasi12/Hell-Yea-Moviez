//************** Handle Reviews request with the base URL of - /api/v1/reviews *******************  */

const router = require('express').Router();
const ReviewsController = require('./reviews.controller.js');
// Returns as class with static methods 

router.route("/").get( (req, res)=>{
    res.send("HELLO WORLD");
});

// We use a controller to provide methods for handling the req/res from the URLs provided 

// Get/retrieve all movie reviews on a particular movie 
router.get("/movie/:id", ReviewsController.apiGetReviews);

// Add a new movie review 
router.post("/new", ReviewsController.apiPostReview); 
 
// Get/update/delete specific individual movie reviews
router.route("/:id")
    .get(ReviewsController.apiGetReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);


module.exports = router;