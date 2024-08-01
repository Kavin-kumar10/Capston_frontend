import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warn: (message) => toast.warn(message),
  // Add more toast types as needed
};

export default Toastify;
