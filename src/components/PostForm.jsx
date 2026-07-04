import { useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

import { validatePost } from "../utils/validators";

import { useNavigate } from "react-router-dom";


export default function PostForm() {

  const [posts, setPosts] = useLocalStorage(
    "posts",
    []
  );

  const navigate = useNavigate();


  const [post, setPost] = useState({

    title: "",
    author: "",
    content: "",
    tags: ""

  });


  const [errors, setErrors] = useState({});


  function submit(e) {

    e.preventDefault();


    let err = validatePost(post);


    setErrors(err);


    if (Object.keys(err).length)
      return;


    let newPost = {

      ...post,

      id: crypto.randomUUID(),

      tags: post.tags.split(","),

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString()

    }


    setPosts(
      [...posts, newPost]
    )


    navigate("/");


  }


  return (

    <form onSubmit={submit}>


      <input

        placeholder="Post Title"

        onChange={
          e => setPost({...post, title:e.target.value})
        }

      />

      <p>{errors.title}</p>


      <input

        placeholder=" 📛Author Name"

        onChange={
          e => setPost({...post, author:e.target.value})
        }

      />


      <textarea

        placeholder=" 📔Write your content here..."

        onChange={
          e => setPost({...post, content:e.target.value})
        }

      />


      <input

        placeholder=" 🏷️Add tags (react, css)"

        onChange={
          e => setPost({...post, tags:e.target.value})
        }

      />


      <button>
         ⏳Publish Post
      </button>


    </form>

  )

}