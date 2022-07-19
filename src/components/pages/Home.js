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
    <div className="container ">
      <NavBar user={props.user} />

      <h2 className='text-center'>Write a li'l blog</h2>

      <CreateBlog className="p-3" setBlogs={setBlogs} blogs={blogs} />
      <div className="row P3">
        {blogs && blogs.map(blog => (
          <div key={blog._id} className="card col-4 g-3 p-3 rounded-3" alt="gif" style={{ width: "18rem"  }} >
            {gif.data.length > 0 ? <img src={gif.data[Math.floor(Math.random() * 10)].images.original.url} className="card-img-top rounded-1 P-3" /> : null}
            <div class="card-body p-2 g-2 border bg-light ">
              <h5 className="card-title">{blog.title}</h5>
              <p>{blog.content}{" "} </p>

              {blog.user === props.user._id && (
                <span
                  className="btn btn-info"
                  onClick={() => handleUpdate(blog)}
                >
                  Update
                </span>

              )}<button
                className='btn btn-danger'
                onClick={() => handleUpdate(blog)}>
                X
              </button>

            </div>

          </div>
        ))}
      </div></div>
  );
};

export default Home;
