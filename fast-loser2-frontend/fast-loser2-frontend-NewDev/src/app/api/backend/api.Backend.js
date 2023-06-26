import axios from 'axios';
import { URL_BACK } from '../../constants/urls/urlBackEnd';

/**
 * Instance axios to the BACKEND./
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: URL_BACK + '/api/login',
});
export default apiBackEnd;
