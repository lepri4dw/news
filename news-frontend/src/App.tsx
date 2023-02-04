import React from 'react';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts';
import PostForm from './features/posts/components/PostForm';


function App() {
  return (
    <>
      <AppToolbar/>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/new-post" element={<PostForm/>}/>
      </Routes>
    </>
  );
}

export default App;
