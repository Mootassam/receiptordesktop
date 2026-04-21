
import Axios from 'axios';
import { getLanguageCode } from '../../../i18n';
import Qs from 'qs';
import moment from 'moment';
import AuthToken from '../../../modules/auth/authToken';
const isElectron = window && window.location && window.location.protocol === 'file:';

// 🌐 Base URLs
const API_URL_BROWSER = 'http://159.198.70.147:8083/api';
const API_URL_ELECTRON = 'http://159.198.70.147:8083/api';
const authAxios = Axios.create({
  baseURL: isElectron ? API_URL_ELECTRON : API_URL_BROWSER,


  // baseURL: "https://trade-OneClick.com/api", 

  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      filter: (prefix, value) => {
        if (

          moment.isMoment(value) ||
          value instanceof Date
        ) {
          return value.toISOString();
        }

        return value;
      },
    });
  },
});

authAxios.interceptors.request.use(
  async function (options) {
    const token = AuthToken.get();
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    options.headers['ngrok-skip-browser-warning'] = 'true';
    options.headers['Accept-Language'] = getLanguageCode();
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default authAxios;

