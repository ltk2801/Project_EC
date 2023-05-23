const Consumer = require("../models/consumer");

exports.getCategory = async (req, res, next) => {
  try {
    const categoryData = await Consumer.getCategoryProduct();
    if (categoryData.length === 0) {
      const error = new Error("Could not find category ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched category successfully ! ",
      data: categoryData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  // Phân trang product
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 4; // Lấy tham số query hoặc mặc định là 4
  const type = req.query.type || null; // Lấy tham số query hoặc mặc định không có

  try {
    const count = await (type
      ? Consumer.countProductType(type)
      : Consumer.countProduct());

    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);
    const products = await (type
      ? Consumer.getProductsType(skip, limit, type)
      : Consumer.getProducts(skip, limit));

    if (products.length === 0) {
      const error = new Error("Could not find products ! ");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Fetched products successfully ! ",
      products: products,
      totalItems: count.count,
      perPage: perPage,
      currentPage: currentPage,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Consumer.getProduct(productId);

    if (product.length === 0) {
      const error = new Error("Could not find product ! ");
      error.statusCode = 404;
      throw error;
    }

    const Urls = product.reduce((result, obj, index) => {
      result.push({
        id: index,
        img: obj.URL,
      });
      return result;
    }, []);

    const curProduct = product[0];

    const { URL, ...productObj } = curProduct;

    productObj.URL = Urls;

    res.status(200).json({ message: "Product fetched !", product: productObj });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProductsPoints = async (req, res, next) => {
  const consumerId = req.params.consumerId;
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 10; // Lấy tham số query hoặc mặc định là 10

  // Chuyển đổi sang kiểu số nguyên
  const pageNumber = parseInt(currentPage);
  const itemsPerPage = parseInt(perPage);

  try {
    const pointConsumer = await Consumer.getPoints(consumerId);
    if (pointConsumer.length === 0) {
      const error = new Error("Could not find consumerID ! ");
      error.statusCode = 404;
      throw error;
    }

    const tampArr = [];
    await Promise.all(
      pointConsumer.map(async (data) => {
        const tamp = await Consumer.getProductsPoint(data.ID_Partners);
        tampArr.push(tamp);
      })
    );
    const dataTamp = tampArr.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

    const data = dataTamp.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.ID_PRODUCTS === obj.ID_PRODUCTS)
    );

    // Tính chỉ số bắt đầu và kết thúc của mảng dựa trên trang và số lượng mục trên mỗi trang
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Cắt mảng theo chỉ số bắt đầu và kết thúc
    const slicedProducts = data.slice(startIndex, endIndex);

    res.status(200).json({
      message: "Product fetched !",
      products: slicedProducts,
      totalItems: data.length,
      perPage: perPage,
      currentPage: currentPage,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProductsExchangePoint = async (req, res, next) => {
  const consumerId = req.params.consumerId;
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 10; // Lấy tham số query hoặc mặc định là 10

  // Chuyển đổi sang kiểu số nguyên
  const pageNumber = parseInt(currentPage);
  const itemsPerPage = parseInt(perPage);

  try {
    const pointConsumer = await Consumer.getPoints(consumerId);
    if (pointConsumer.length === 0) {
      const error = new Error("Could not find consumerID ! ");
      error.statusCode = 404;
      throw error;
    }
    const tampArr = [];
    await Promise.all(
      pointConsumer.map(async (data) => {
        const tamp = await Consumer.getProductsExchangePoint(
          data.ID_Partners,
          data.POINTS
        );
        tampArr.push(tamp);
      })
    );
    const dataTamp = tampArr.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

    const data = dataTamp.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.ID_PRODUCTS === obj.ID_PRODUCTS)
    );

    // Tính chỉ số bắt đầu và kết thúc của mảng dựa trên trang và số lượng mục trên mỗi trang
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Cắt mảng theo chỉ số bắt đầu và kết thúc
    const slicedProducts = data.slice(startIndex, endIndex);

    res.status(200).json({
      message: "Product fetched !",
      products: slicedProducts,
      totalItems: data.length,
      perPage: perPage,
      currentPage: currentPage,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};