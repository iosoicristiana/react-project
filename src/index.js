import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {fetchAuthors} from './features/authors/authorsSlice';
import {fetchPosts} from './features/posts/postsSlice';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

store.dispatch(fetchAuthors());
store.dispatch(fetchPosts());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

