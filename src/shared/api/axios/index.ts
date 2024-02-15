import axios from 'axios';

import { CONFIG } from '../../config';

/** Instance of axios with a custom config */
export const $api = axios.create({
  baseURL: CONFIG.API_URL,
});
