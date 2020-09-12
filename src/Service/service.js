import axios from 'axios';

const CONNECTION_URL="https://bookshopmanager.herokuapp.com/allbooks";

class BookService{
    findbooks(){
       return axios.get(CONNECTION_URL);
    }
}

export default new BookService();