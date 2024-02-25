import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllAuthors } from "../authors/authorsSlice";

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const authors = useSelector(selectAllAuthors)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [authorId, setAuthorId] = useState(post?.authorId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setAuthorId(Number(e.target.value))

    const canSave = [title, content, authorId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, authorId, ratings: post.ratings, averageRating: post.averageRating })).unwrap()

                setTitle('')
                setContent('')
                setAuthorId('')
                console.log("Post updated")
                 navigate(`/post/${postId}`)
                //navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const authorsOptions = authors.map(author => (
        <option
            key={author.id}
            value={author.id}
        >{author.name}</option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setAuthorId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={authorId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {authorsOptions}
                </select>
                <br/>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                    class = "save"
                >
                    Save Post
                </button>

                <button
                    type="button"
                    onClick={onDeletePostClicked}
                    class = "delete"
                >
                    Delete Post
                </button>
              
            </form>
        </section>
    )
}

export default EditPostForm