
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // apne backend ke hisab se port change karo
});