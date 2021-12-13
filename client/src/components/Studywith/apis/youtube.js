import axios from 'axios';

const KEY = 'AIzaSyCeGDQCkyK1NewnPIhAJO4qvYkhPwtzPFE';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        key: KEY
    }

});
