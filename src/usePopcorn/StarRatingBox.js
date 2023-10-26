import React, {useState} from 'react';
import StarRating from "./StarRating";

const StarRatingBox = () => {

   const [movieRating, setMovieRating] = useState(0)

   return (
      <div>
         <StarRating maxRating={5} message ={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
         <StarRating size={30} color='red' className="test" defaultRating={3}/>
         <StarRating color='blue' maxRating={8} onSetRating={setMovieRating}/>
         <p>This Movie was rated {movieRating} stars.</p>
      </div>
   );
};

export default StarRatingBox;
