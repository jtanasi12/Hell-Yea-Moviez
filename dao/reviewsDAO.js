//*********************** After the user is connected to the database we will inject/attach the database to the user  ***********************  */

const mongoDB = require('mongodb');
const ObjectID = mongoDB.ObjectId;
// This will allow us to convert our string/integer that we want to find on the database to another data type called ObjectID which is used on the mongodb database for looking up records. 

let reviews; 

class ReviewsDAO{
    
    static async injectDB(connection){
        
        // If we already injected our database we don't want to create another one
        if(reviews){
            return;
        } 
        // Create the database and the collection inside of the database
        try{
            reviews = await connection.db("reviews").collection("reviews");
        }
        catch(error){
            console.error(`Unable to establish a collection in reviewsDAO ${error}`);
        }
    } 

    // A user adds a review to a specific movie 
    static async addReview(movieID, user, review){
        try{
            // Create a javascript object holding onto the details that we need about the review 
            const reviewDoc = {
                movieID: movieID,
                user: user,
                review: review
            };

            // Insert the document into the reviews database and collection
            // This will also create an object ID for the document
            return await reviews.insertOne(reviewDoc);
        }
        catch(error){
            console.error(`Unable to post the review to the collections insode of the database ${error}`);
        }
    }

    static async getReview(reviewID){
        try{
            // ObjectId converts the string reviewID into an objectID which we can use to find the appropriate id in the actual database 
             return await reviews.findOne(
                {_id: new mongoDB.ObjectId(reviewID)}   
             );
        }
        catch(error){
            console.error(`Unable to get review: ${error}`);
        }
    }

    static async updateReview(reviewID, user, review){

        try{
            const updateResponse = await reviews.updateOne(

                // Obj1
                {_id: new mongoDB.ObjectId(reviewID)},
                // $set is specific to Mongodb and allows us to replace/update multiple fields. In this case we  change the review 

                // Obj 2
                { $set: {user: user, review: review}}
            );

            return updateResponse;
        }
        catch(error){
            console.error(`Unable to update review: ${error}`);
        }
    }

    static async deleteReview(reviewID){

        try{
            const deleteRespnse = await reviews.deleteOne(
                { _id: new mongoDB.ObjectId(reviewID)}
            ); 

            return deleteRespnse;
        }
        catch(error){
            console.error(`Unable to delete review: ${error}`);
        }

    }


    // Find all the reviews under for a particular movie 
    static async getReviewsByMovieId(movieID){
        try{
            const cursor = await reviews.find( 
                {movieID: parseInt(movieID)}
            );
            // Will return all the documents with the movieID 
            return cursor.toArray();
        }
        catch(error){
            console.error(`Unable to get movie reviews: ${error}`);
        }

    }

    

}

module.exports = ReviewsDAO;