import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-b6e98-default-rtdb.firebaseio.com'
})
