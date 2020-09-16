import axios from axios;

const url = "http://localhost:8000/api/posts";

class PostService {

    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.get(url);
                const data = result.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt),
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    static addPost(text) {
        return axios.post(url, {
            text
        });
    }

    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;
