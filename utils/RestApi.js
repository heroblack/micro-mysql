const axios = require("axios");

class RestApi {
  constructor(baseUrl, timeout = 60000, headers = {}) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: timeout,
      header: {
        "User-Agent": "Apuestas Cucuta75",
        "Cache-Control": "no-cache",
        "content-type": "application/json",
        Accept: "*/*",
        "X-Custom-Header": "foobar",
        ...headers,
        //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'Authorization':'Bearer ' + token,
        //'X-Requested-With': 'XMLHttpRequest'
      },
    });
  }

  get(path = "", headers = {}, timeout = 60000) {
    let url = `${this.baseUrl}${path}`;
    this.instance.defaults.timeout = timeout;
    return this.instance.get(url, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        ...headers,
      },
    });
  }

  post(path = "", body = {}, headers = {}, timeout = 60000) {
    let url = `${this.baseUrl}${path}`;
    this.instance.defaults.timeout = timeout;
    return this.instance.post(url, body, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        ...headers,
      },
    });
  }

  put(path = "", body = {}, headers = {}, timeout = 60000) {
    let url = `${this.baseUrl}${path}`;
    this.instance.defaults.timeout = timeout;
    return this.instance.put(url, body, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        ...headers,
      },
    });
  }

  remove(path = "", headers = {}, timeout = 60000) {
    let url = `${this.baseUrl}${path}`;
    this.instance.defaults.timeout = timeout;
    return this.instance.delete(url, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        ...headers,
      },
    });
  }

  interceptorsRequest() {
    this.instance.interceptors.request.use(
      function (config) {
        console.log("3l config>>", config);
        console.log("intercepto requets");
        //config.headers = { ...config.headers, auth_token: getAuthToken() };
        // you can also do other modification in config
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  interceptorsResponse() {
    this.instance.interceptors.response.use(
      function (response) {
        if (response.status === 401) {
          // your failure logic
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }
}

module.exports = RestApi;

// getData = async () =>{

//     const api = new RestApi('https://jsonplaceholder.typicode.com')
//     let response = await api.get('/users',{}, 2000);
//     console.log(response.data)
// }

// getData()
