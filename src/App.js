import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Profile from "./components/Profile";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Signup />} />
          {/*default element should be one that checks whehtehr or not you are logged in -> send you to log in or posts*/}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route path="/" element={<Protected />}>
            <Route path="posts" element={<PostsList />} />

            <Route path="post">
              <Route index element={<AddPostForm />} />
              <Route path=":postId" element={<SinglePostPage />} />
              <Route path="edit/:postId" element={<EditPostForm />} />
            </Route>
          </Route>

          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

// function App() {
//   return (
//     <>
//     <Navbar/>
//     <Routes>
//       <Route path="/" element={<Home />}>
//         <Route path="/" element={<Protected/>} >
//             <Route path="posts" index element={<PostsList/>} />

//         </Route>

//         {/* <Route path="/home" element={<PostsList />} />
//         <Route path="/" index element={<Home />} /> */}

//         <Route path="post">
//             <Route index element={<AddPostForm />} />
//             <Route path=":postId" element={<SinglePostPage />} />
//             <Route path="edit/:postId" element={<EditPostForm />} />
//         </Route>

//         <Route path="signup" element={<Signup/>} />
//         <Route path="login" element={<Login/>} />
//         <Route path="layout" element={<Layout/>} />

//       </Route>
//     </Routes>
//     </>
//   );
// }

export default App;
