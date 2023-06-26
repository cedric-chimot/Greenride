import { URL_BACK } from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';

export function authenticate(values) {
  return apiBackEnd.post(URL_BACK + '/api/login', values);
}
