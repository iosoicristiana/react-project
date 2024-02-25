import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import {Rating} from 'react-simple-star-rating';

const Stars = ({ post }) => {
    const dispatch = useDispatch();


    const [rating, setRating] = useState(0);

    const handleReactionClick = (newRating) => {
        setRating(newRating); 
        dispatch(reactionAdded({ postId: post.id, rating: newRating }));
    };

    return (
        <>
            <Rating
                onClick={(newRating) => handleReactionClick(newRating)}
                size = {25}
                ratingValue={rating}
            />
            <span>Average: {post.averageRating ? post.averageRating.toFixed(1) : 0}</span>
        </>
    );
};

export default Stars;
