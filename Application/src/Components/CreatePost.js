
import { Token } from './Common'
import axios from 'axios';
function CreatePost() {


    function postPostApidata(raw) {
        const data = { ...raw };
        delete raw.user_id;
        console.log(raw);
        var config = {
            method: "POST",
            url: "https://gorest.co.in/public/v2/users/" + data.user_id + "/posts",
            headers: {
                Authorization: Token,
            },
            data: raw,
        };


        axios(config)
            .then((response) => {
                alert("post create Successfuly")
            })
            .catch(
                (error)=>console.log(error)
            )

    }
    const createPostSubmit = (e) => {
        e.preventDefault();

        const data = {};
        data.user_id = localStorage.getItem('user-id');
        data.body = e.target.elements[1].value;
        data.title = e.target.elements[0].value;
        postPostApidata(data);


    }
    return (
        <div className="createPost mx-auto ">
            <form className="border p-5" onSubmit={createPostSubmit} style={{ marginTop: '100px' }}>
                <div className="mb-3">
                    <label className="form-label">Title : </label>
                    <input type="text" className="form-control" placeholder="title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Post Content</label>
                    <textarea className="form-control" id="body" rows="3" placeholder="content of post"></textarea>
                </div>
                <div>
                    <button className="btn btn-success" type="submit">Create Post</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;