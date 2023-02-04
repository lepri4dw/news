import React from 'react';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts';
import PostForm from './features/posts/components/PostForm';
import FullPostItem from "./features/posts/components/FullPostItem";
import {Container} from "@mui/material";


function App() {
  return (
    <>
      <AppToolbar/>
      <Container>
        <Routes>
          <Route path="/" element={<Posts/>}/>
          <Route path="/new-post" element={<PostForm/>}/>
          <Route path="/posts/:id" element={<FullPostItem/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
