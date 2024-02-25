import { useSelector } from "react-redux";
import { selectAllAuthors } from "../authors/authorsSlice";

const PostAuthor = ({authorId}) => {
    const authors = useSelector(selectAllAuthors)
    const author = authors.find(author => author.id === authorId);

    return <span> by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor;