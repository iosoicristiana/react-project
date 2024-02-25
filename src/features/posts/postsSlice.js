import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {nanoid} from '@reduxjs/toolkit';
import {sub} from 'date-fns';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // loading, succeeded, failed, idle
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const AddNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const {id} = initialPost;
    try{
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    }catch(err){
        return initialPost; //for testing
        
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const {id} = initialPost;
    try{
        const response = await axios.delete(`${POSTS_URL}/${id}`, initialPost)
        if(response?.status === 200) return initialPost;
        return `${response.status} - ${response.statusText}`;
    }catch(err){
        console.error('Failed to delete the post', err)
    }
})

const postsSlice = createSlice({  
    name : 'posts',
    initialState,
    reducers: {
        postAdded:{
            reducer(state, action) {
            state.posts.push(action.payload) 
            },
            prepare(title, content, authorId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        authorId, 
                        ratings: [],
                        averageRating: 0
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, rating } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if(existingPost)
            {
                existingPost.ratings.push(rating);
                const sum = existingPost.ratings.reduce((acc, curr) => acc + curr, 0);
                existingPost.averageRating= sum / existingPost.ratings.length;
            }
        }
        
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.authorId = Number(post.userId);
                post.date = sub(new Date(), {minutes: min++}).toISOString();
                post.ratings = [];
                post.averageRating = 0;
                return post;
                });
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(AddNewPost.fulfilled, (state, action) => {
            action.payload.authorId = Number(action.payload.authorId);
            action.payload.date = new Date().toISOString();
            action.payload.ratings = [];
            action.payload.averageRating= 0;
            state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            if(!action.payload?.id) {
                console.log("update could not complete")
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = [...posts, action.payload];
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            if(!action.payload?.id){
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export const {postAdded, reactionAdded} = postsSlice.actions;


export default postsSlice.reducer