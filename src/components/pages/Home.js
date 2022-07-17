import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import axios from 'axios'
import CreateBlog from '../forms/CreateBlog'
const Home = (props) => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:4000/blogs', {
      headers: {
        'x-auth-token': localStorage.getItem("userToken")
      }
    }).then(res => setBlogs(res.data)).catch(err => console.error(err))
  }, [])


  const handleDelete = (blog) => {
    axios
      .delete(`http://localhost:4000/blogs/${blog._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBlogs([...blogs.filter((t) => t._id !== blog._id)]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>


      <h1>Home Page</h1>
      <NavBar user={props.user} />
      <CreateBlog setBlogs={setBlogs} blogs={blogs} />

      {blogs && blogs.map(blog => (
        <div key={blog._id}>
          <h6>{blog.title}</h6>
          <h6>{blog.details}{" "} <span
            className='btn btn-danger'
            onClick={() => handleDelete(blog)}>X</span></h6>
        </div>
      ))}
    </div>
  );
};

export default Home;
