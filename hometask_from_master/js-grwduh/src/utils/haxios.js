class Haxios {
  baseUrl = "https://jsonplaceholder.typicode.com";

  setBaseUrl = newBaseUrl => {
    this.baseUrl = newBaseUrl;
  };

  getBaseUrl = () => {
    return this.baseUrl;
  };

  get = async url => {
    const URL = this.baseUrl + url;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
  };

  post = async (url, body) => {
    const URL = this.baseUrl + url;
    const request = new Request(URL, { method: "POST", body });

    const response = await fetch(request);
    const data = await response.json();

    return data;
  };
}

export default new Haxios();
