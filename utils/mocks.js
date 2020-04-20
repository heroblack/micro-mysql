class Mocks {
  constructor() {
    this.products = [
      {
        _id: "5e8abe05aeca181ec0551dcf",
        id: 1,
        name: "xbox 360",
        price: 399,
        image: "http://xbox360.jpg",
        __v: 0,
      },
      {
        _id: "5e8abfc8aeca181ec0551dd0",
        id: 2,
        name: "play 5",
        price: 299,
        image: "http://play5.jpg",
        __v: 0,
      },
      {
        _id: "5e8fe8953439813468d54db2",
        id: "3",
        name: "play 4",
        price: 299,
        image: "http://play5.jpg",
        tags: ["play", "expensive"],
      },
      {
        _id: "5e8fe9d57a9b812b1c8a4866",
        id: "4",
        name: "nintendo switch",
        price: 299,
        image: "http://nintendo.jpg",
        tags: ["pro", "lite"],
      },
    ];
  }
  getProducts() {
    return this.products;
  }

  getProductsById(productId) {
    return this.products.filter((product) => product.id == productId);
  }

  getAddProducts(product) {
    this.products.push(product);
    return product;
  }

  getDeleteProduct(productId) {
    let index = this.products.findIndex((product) => product.id == productId);
    if (index == -1) {
      throw new Error("id no encotrado para eliminar!!");
    }
    return this.products.splice(index, 1);
  }
}

module.exports = new Mocks();
