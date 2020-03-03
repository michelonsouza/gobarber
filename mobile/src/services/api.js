import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: `${
    Platform.OS === 'ios' ? 'http://localhost' : 'http://10.0.2.2'
  }:3333`,
});

export default api;
