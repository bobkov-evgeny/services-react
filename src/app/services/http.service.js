import axios from "axios";
import logger from "./log.service";
import {toast} from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use((res) => res, (err) => {
    const expectedErrors = err.response && err.response.status >= 400 && err.response.status < 500;
    if(!expectedErrors) {
        logger.log(err);
        toast.error("Something went wrong. Try it later")
    }
    return Promise.reject(err);
});

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService;