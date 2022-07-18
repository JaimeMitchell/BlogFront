import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import axios from 'axios'
import CreateBlog from '../forms/CreateBlog'
import UpdateBlog from '../forms/UpdateBlog'
const Home = (props) => {

  const [blogs, setBlogs] = useState(null)

  const [gif, setGif] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:4000/blog', {
      headers: {
        'x-auth-token': localStorage.getItem("userToken")
      }
    }).then(res => setBlogs(res.data)).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=sm1t4ygsjFoVmIrfFipykq7h1NCdWVCI&limit=25&rating=g')
      .then(res => setGif(res.data)).catch(err => console.error(err))
  }, [])


  const handleUpdate = (blog) => {
    axios
      .delete(`http://localhost:4000/blog/${blog._id}`, {
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
      <NavBar user={props.user} />

      <h1>Home Page</h1>

      <CreateBlog setBlogs={setBlogs} blogs={blogs} />

      {blogs && blogs.map(blog => (
        <div key={blog._id}>
          <h6>{blog.title}</h6>
          {gif.data.length > 0 ? <img src={gif.data[Math.floor(Math.random() * 10)].images.original.url} /> : null}
          <h6>{blog.content}{" "} <span
            className='btn btn-danger'
            onClick={() => handleUpdate(blog)}>
              X
            </span>
            
            {blog.user === props.user._id && (
              <span
                className="btn btn-info"
                onClick={() => handleUpdate(blog)}
              >
                Update
              </span>
            )}
            </h6>
        </div>
      ))}
    </div>
  );
};

export default Home;
