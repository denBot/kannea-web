const axios = require('axios');

class PostService {

    constructor() {
        const port = process.env.BACKEND_PORT;
        const url = process.env.BACKEND_URL;

        this.service = axios.create({
            baseURL: `${url}:${port}/api/posts`,
            timeout: 1000,
        });
    }

    async getPosts() {
        try {
            const result = await axios.get('/');
            return result.data.map(post => ({
                ...post,
                createdAt: new Date(post.createdAt),
            }));
        } catch (err) {
            return err;
        }
    }

    static addPost(post) {
        return this.service.post('', {
            title: post.title,
            desc: post.desc
        });
    }

    static deletePost(id) {
        return this.service.delete(`/${id}`);
    }
}

export default PostService;
