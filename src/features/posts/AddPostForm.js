import React from "react";
import { useState } from "react";
import { AddNewPost } from "./postsSlice";
import { selectAllAuthors } from "../authors/authorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState([]);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authors = useSelector(selectAllAuthors);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setAuthorId(e.target.value);

  const canSave =
    [title, content, authorId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(AddNewPost({ title, body: content, authorId })).unwrap();
        setTitle("");
        setContent("");
        setAuthorId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  const authorOptions = authors.map((author) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ));

  return (
    <section>
      <h2> Add New Post </h2>
      <form>
        <label htmlFor="postTitle"> Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor"> Author: </label>
        <select id="postAuthor" value={authorId} onChange={onAuthorChanged}>
          <option value=""> Select an Author </option>
          {authorOptions}
        </select>

        <label htmlFor="postContent"> Content: </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          {" "}
          Save Post{" "}
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
