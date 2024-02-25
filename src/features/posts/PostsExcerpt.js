import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Stars from "./Stars";

import { Link } from "react-router-dom";
import "../../index.css"; // Import the styles from index.css


const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3> {post.title} </h3>
      <p className="excerpt"> {post.body.substring(0, 75)} </p>
      <p className="postCredit">
       
        <PostAuthor authorId={post.authorId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <Stars post={post} />
      <Link to={`/post/${post.id}`} className="more">
          View Full Post
      </Link>
    </article>
  );
};

export default PostsExcerpt;
