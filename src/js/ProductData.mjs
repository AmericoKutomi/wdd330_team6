const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {

  }
  async getData(category) {
    const res = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(res);
    
    return data.Result;
  }
  async findProductById(id) {
    const res = await fetch(baseURL + `products/search/${id}`);
    const data = await convertToJson(res);
    return data.Result;
  }
}
