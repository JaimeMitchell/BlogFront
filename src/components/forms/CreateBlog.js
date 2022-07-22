import { useState } from "react";
import axios from 'axios'

const CreateBlog = (props) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://62daa282d0ae9c1a336b5f1d--jaimeblogapi.netlify.app/blog', formData, {
            headers: {
                'x-auth-token': localStorage.getItem("userToken")
            }
        }).then(res => props.setBlogs([...props.blogs, res.data]))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="title">
                Title
            </label>
            <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, [e.target.id]: e.target.value })
                }
            />

            <div className="mb-3">
                <label className="form-label" htmlFor="blog">
                    Blog
                </label>
                <textarea
                    className="form-control"
                    type="text"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={(e) =>
                        setFormData({ ...formData, [e.target.id]: e.target.value })
                    }
                />
            </div>

            <input type="submit" className="btn btn-success" />
        </form>
    );
};

export default CreateBlog;