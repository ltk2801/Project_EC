const { getClient } = require("../config/postgres");

exports.getInfoConsumer = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Customers" where "ID_Customers" = $1',
      [idConsumer]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getCategoryProduct = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT DISTINCT("TYPE_PROD"), "Img" FROM public."Type_Products"'
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProducts = async function (skip, limit) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS"   OFFSET $2 LIMIT $3 ',
      [1, skip, limit]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};
exports.getProductsSearched = async function (skip, limit, keyword) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE P."NAME" ILIKE $2 OFFSET $3 LIMIT $4 ',
      [1, `%${keyword}%`, skip, limit]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};
exports.getProductTypeSearched = async function (skip, limit, type, keyword) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE P."NAME" ILIKE $3 AND "TYPE_PROD" = $2 OFFSET $4 LIMIT $5 ',
      [1, type, `%${keyword}%`, skip, limit]
    );
    return rs.rows;
  } finally {
    client.release();
  }
};

exports.countProductSearched = async function (keyword) {
  const client = await getClient();
  try {
    const rs = await client.query(
      ' SELECT COUNT(*) FROM public."Products" WHERE "NAME" ILIKE $1',
      [`%${keyword}%`]
    );
    return rs.rows[0];
  } finally {
    client.release();
  }
};

exports.countProductTypeSearched = async function (type, keyword) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT COUNT(*) FROM public."Type_Products" as TP JOIN public."Products" as P ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE "TYPE_PROD" = $1 AND P."NAME" ILIKE $2',
      [type, `%${keyword}%`]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProductsSearched = async function (skip, limit, keyword) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE P."NAME" ILIKE $2 OFFSET $3 LIMIT $4 ',
    [1, `%${keyword}%`, skip, limit]
  );
  return rs.rows;
};

exports.getProductTypeSearched = async function (skip, limit, type, keyword) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE P."NAME" ILIKE $3 AND "TYPE_PROD" = $2 OFFSET $4 LIMIT $5 ',
    [1, type, `%${keyword}%`, skip, limit]
  );
  return rs.rows;
};

exports.countProductSearched = async function (keyword) {
  const client = await getClient();
  const rs = await client.query(' SELECT COUNT(*) FROM public."Products" WHERE "NAME" ILIKE $1', [`%${keyword}%`]);
  return rs.rows[0];
};

exports.countProductTypeSearched = async function (type, keyword) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT COUNT(*) FROM public."Type_Products" as TP JOIN public."Products" as P ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE "TYPE_PROD" = $1 AND P."NAME" ILIKE $2',
    [type, `%${keyword}%`]
  );
  return rs.rows[0];
};

exports.countProduct = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(' SELECT COUNT(*)  FROM public."Products"');
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProductsType = async function (skip, limit, type) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" AND TP."TYPE_PROD"=$2   OFFSET $3 LIMIT $4 ',
      [1, type, skip, limit]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.countProductType = async function (type) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT COUNT(*) FROM public."Type_Products" WHERE "TYPE_PROD" =$1',
      [type]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProduct = async function (id) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."STT",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND P."ID_PRODUCTS" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS"  ',
      [id]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPointsConsumer = async function (username) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_Partners",P."Name", P."url" AS "IMG", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Account" AS A, public."Customers" AS C, public."Partners" AS P WHERE A."Username" = C."Phone" AND AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND A."Username" = $1',
      [username]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPointsConsumerById = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_Partners",P."Name", P."url" AS "IMG", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP,public."Customers" AS C, public."Partners" AS P WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND C."ID_Customers" = $1',
      [idConsumer]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPoints = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_Partners", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Customers" AS C, public."Partners" AS P WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND C."ID_Customers" = $1',
      [idConsumer]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProductsPoint = async function (idPartners) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P.*,IP."URL" AS "IMG" FROM public."EXCHANGE_POINT" AS EP, public."Products" AS P, public."IMAGE_PRODUCT" AS IP WHERE EP."ID_PARTNERS" = $1 AND EP."ID_PRODUCTS" = P."ID_PRODUCTS" AND EP."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2',
      [idPartners, 1]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProductsExchangePoint = async function (idPartners, point) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P.*,IP."URL" AS "IMG" FROM  public."Products" AS P, public."IMAGE_PRODUCT" AS IP, public."EXCHANGE_POINT" AS EP WHERE EP."ID_PARTNERS" = $1 AND EP."ID_PRODUCTS" = P."ID_PRODUCTS" AND EP."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 AND EP."PRICE" <= $3',
      [idPartners, 1, point]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPartnersProduct = async function (idProduct) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_Partners",P."Name",P."url",EP."PRICE" AS "GiaDoiThuong" FROM public."EXCHANGE_POINT" AS EP, public."Partners" AS P WHERE EP."ID_PARTNERS" = P."ID_Partners" AND EP."ID_PRODUCTS" = $1 ',
      [idProduct]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.haveConsumer = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Customers" where "ID_Customers" = $1',
      [idConsumer]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.haveEmail = async function (email) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Customers" where "Email" = $1',
      [email]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateProfile = async function (infoConsumer) {
  const client = await getClient();

  try {
    const rs = await client.query(
      'UPDATE public."Customers" SET "NAME" = $1, "Birthday" = $2 , "Address" = $3,"Email" = $4, "IMG" = $5 WHERE "ID_Customers" = $6',
      [
        infoConsumer.nameConsumer,
        infoConsumer.birthday,
        infoConsumer.address,
        infoConsumer.email,
        infoConsumer.img,
        infoConsumer.id,
      ]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPartnerConsumer = async function (idConsumer, skip, limit) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_Partners",P."Name", P."url" AS "IMG", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Customers" AS C, public."Partners" AS P WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND C."ID_Customers" = $1   OFFSET $2 LIMIT $3',
      [idConsumer, skip, limit]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.haveCart = async function (info) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT * FROM public."Cart" WHERE "ID_CUSTOMERS" = $1 AND "ID_PRODUCTS" = $2 AND "POINT_TYPE" = $3',
      [info.consumerId, info.productId, info.pointType]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.addToCart = async function (info) {
  const client = await getClient();
  try {
    const rs = await client.query(
      `insert into public.\"Cart\"(\"ID_CUSTOMERS\",\"ID_PRODUCTS\", \"NAME_PRODUCTS\",\"QUANTITY\",\"POINT_TYPE\")
      VALUES ($1, $2, $3, $4,$5) returning *`,
      [
        info.consumerId,
        info.productId,
        info.productName,
        info.quantity,
        info.pointType,
      ]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateToCart = async function (info) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."Cart" SET "QUANTITY" = $1 WHERE "ID_CUSTOMERS" = $2 AND "ID_PRODUCTS" = $3 AND "POINT_TYPE" = $4',
      [info.quantity, info.consumerId, info.productId, info.pointType]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPartnersCart = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      ' SELECT DISTINCT(P."ID_Partners") AS "ID_DoanhNghiep", P."Name" AS "TenDoanhNghiep",P."url" as "Img" FROM public."Cart" AS C, public."Partners" AS P WHERE C."ID_CUSTOMERS" = $1 AND C."POINT_TYPE" = P."ID_Partners"  ORDER BY P."Name"',
      [idConsumer]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getProductsCart = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT C."ID_PRODUCTS",C."NAME_PRODUCTS",C."QUANTITY",IP."URL",C."POINT_TYPE" FROM public."Cart" AS C, public."IMAGE_PRODUCT" AS IP WHERE C."ID_CUSTOMERS" = $1 AND C."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 ORDER BY C."POINT_TYPE"',
      [idConsumer, 1]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPointProductCart = async function (idProduct, idPartner) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT "PRICE" FROM public."EXCHANGE_POINT" WHERE "ID_PRODUCTS" = $1 AND "ID_PARTNERS" = $2 ',
      [idProduct, idPartner]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getQuantityProduct = async function (idProduct) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT "QUANTITY" FROM public."Products" WHERE "ID_PRODUCTS" = $1 ',
      [idProduct]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateQuantityCart = async function (
  idConsumer,
  idProduct,
  idPartner,
  quantity
) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."Cart" SET "QUANTITY" = $1 WHERE "ID_PRODUCTS" = $2 AND "ID_CUSTOMERS" = $3 AND "POINT_TYPE" = $4 ',
      [quantity, idProduct, idConsumer, idPartner]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.deleteAllCart = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'DELETE FROM public."Cart" WHERE "ID_CUSTOMERS" = $1 ',
      [idConsumer]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.deletePartnerProductsCart = async function (idConsumer, idPartner) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'DELETE FROM public."Cart" WHERE "ID_CUSTOMERS" = $1 AND "POINT_TYPE" = $2 ',
      [idConsumer, idPartner]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.deletePartnerProductCart = async function (
  idConsumer,
  idPartner,
  idProduct
) {
  const client = await getClient();

  try {
    const rs = await client.query(
      'DELETE FROM public."Cart" WHERE "ID_CUSTOMERS" = $1 AND "POINT_TYPE" = $2 AND "ID_PRODUCTS" = $3',
      [idConsumer, idPartner, idProduct]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getLastIdHistory = async function () {
  const client = await getClient();
  try {
    const rs = await client.query('select * from public."HISTORY"');
    return rs.rows.length + 1;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.order = async function (obj, product) {
  const client = await getClient();
  try {
    const rs = await client.query(
      `insert into public.\"HISTORY\"(\"ID_TRADE\",\"ID_CUSTOMERS\", \"ID_PRODUCTS\", \"NAME\", \"DATE_TRADE\", \"TOTAL_POINTS\",\"QUANTITY\",\"POINT_TYPE\",\"DIACHINHANHANG\",\"PHONE_NHANHANG\",\"TOTAL_POINTS_TRADE\")
      VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11) returning *`,
      [
        obj.Id_Trade,
        obj.Id_KhachHang,
        product.Id_Product,
        product.Name_Product,
        obj.C_Date,
        product.Total_Point,
        product.Quantity,
        obj.Id_DoiTac,
        obj.Address,
        obj.Phone,
        obj.Total_Point_Trade,
      ]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.orderByCart = async function (obj, product) {
  const client = await getClient();
  try {
    const rs = await client.query(
      `insert into public.\"HISTORY\"(\"ID_TRADE\",\"ID_CUSTOMERS\", \"ID_PRODUCTS\", \"NAME\", \"DATE_TRADE\", \"TOTAL_POINTS\",\"QUANTITY\",\"POINT_TYPE\",\"DIACHINHANHANG\",\"PHONE_NHANHANG\",\"TOTAL_POINTS_TRADE\")
      VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11) returning *`,
      [
        obj.Id_Trade,
        obj.Id_KhachHang,
        product.Id_Product,
        product.Name_Product,
        obj.C_Date,
        product.Total_Point,
        product.Quantity,
        obj.Id_DoiTac,
        obj.Address,
        obj.Phone,
        obj.Total_Point_Trade,
      ]
    );
    const rs1 = await client.query(
      'DELETE FROM public."Cart" WHERE "ID_CUSTOMERS" = $1 AND "POINT_TYPE" = $2 AND "ID_PRODUCTS" = $3',
      [obj.Id_KhachHang, obj.Id_DoiTac, product.Id_Product]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateQuantity = async function (idProduct, quantity) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."Products" SET "QUANTITY" = $1 WHERE "ID_PRODUCTS" = $2 ',
      [quantity, idProduct]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};
exports.getPointConsumer = async function (idConsumer, idPartner) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT "POINTS" FROM public."ACCUMULATION_POINTS" WHERE "ID_CUSTOMERS" = $1 AND "ID_TYPEP" = $2',
      [idConsumer, idPartner]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updatePoint = async function (idConsumer, idPartner, point) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."ACCUMULATION_POINTS" SET "POINTS" = $1 WHERE "ID_CUSTOMERS" = $2 AND "ID_TYPEP" = $3 ',
      [point, idConsumer, idPartner]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getHistoryConsumer = async function (idConsumer) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT H."ID_TRADE", H."ID_PRODUCTS", H."NAME",  IP."URL" as "ImgSanPham" ,EP."PRICE" ,H."QUANTITY",H."TOTAL_POINTS", P."Name" as "TenDoiTac" ,P."url" as "ImgDoiTac",H."DATE_TRADE",H."TOTAL_POINTS_TRADE", H."DIACHINHANHANG" FROM public."HISTORY" AS H, public."IMAGE_PRODUCT" AS IP, public."EXCHANGE_POINT" AS EP, public."Partners" AS P WHERE H."ID_CUSTOMERS" = $1 AND H."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 AND H."ID_PRODUCTS" = EP."ID_PRODUCTS" AND H."POINT_TYPE" = EP."ID_PARTNERS" AND H."POINT_TYPE" = P."ID_Partners"',
      [idConsumer, 1]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getIdRevenue = async function (idPartner, month, year) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT "ID_REVENUE","TOTAL_POINTS" FROM public."Pay" WHERE "ID_PARTNER" = $1 AND "MONTH_REV" = $2 AND "YEAR_REV" = $3',
      [idPartner, month, year]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.haveIdRevenueInDetailPay = async function (idRevenue, day) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT * FROM public."Detail_Pay" WHERE "ID_REVENUE" = $1 AND "DAY_REV" = $2',
      [idRevenue, day]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.insertDetailPay = async function (idRevenue, day, total) {
  const client = await getClient();
  try {
    const rs = await client.query(
      `insert into public.\"Detail_Pay\"(\"ID_REVENUE\",\"DAY_REV\", \"TOTAL\")
      VALUES ($1, $2, $3) returning *`,
      [idRevenue, day, total]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateDetailPay = async function (idRevenue, day, total) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."Detail_Pay" SET "TOTAL" = $1 WHERE "ID_REVENUE" = $2 AND "DAY_REV" = $3 ',
      [total, idRevenue, day]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updatePay = async function (idRevenue, total) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."Pay" SET "TOTAL_POINTS" = $1 WHERE "ID_REVENUE" = $2 ',
      [total, idRevenue]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getExchangePointByProductId = async function (idProduct) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT "ID_PRODUCTS", "PRICE" FROM public."EXCHANGE_POINT" WHERE "ID_PRODUCTS" = $1',
      [idProduct]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getExchangePointByProductId = async function (idProduct) {
  const client = await getClient();
  const rs = await client.query('SELECT "ID_PRODUCTS", "PRICE" FROM public."EXCHANGE_POINT" WHERE "ID_PRODUCTS" = $1', [idProduct])
  return rs.rows;
}