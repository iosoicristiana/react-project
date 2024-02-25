import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Stars from "./Stars";

import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

const SinglePostPage = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if(!post){
        return (
            <section>
                <h2> Post not found! </h2>
            </section>
        )
    }

    return (
        <article>
            <h2> {post.title} </h2>
            <p> {post.body} </p>
            
            <p className="postCredit">
                
                <PostAuthor authorId={post.authorId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <Stars post={post} />
            <Link to = {`/post/edit/${post.id}`} className="more"> Edit Post </Link>
        </article>
    )
}

export default SinglePostPage;