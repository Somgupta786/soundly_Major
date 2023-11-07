

import axios from 'axios';
export const verifyApi="https://test-mkcw.onrender.com/api/user/login/";
 export default axios.create({
  baseURL: 'https://test-mkcw.onrender.com/api/',
});


