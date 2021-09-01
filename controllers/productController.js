import { isAdmin, isSeller, sendResponse } from "../helpersFunctions";
import models from "../models";

const { Product } = models;

// get all product for admin
export const getAllProductForAdmin = async (req, res) => {
  const { user } = req;
  if (user.role !== "admin") {
    return sendResponse(res, 403, {
      name: "Forbidden",
      message: "There is not your access",
      success: false,
    });
  }
  try {
    const products = await Product.find()
      .select(" -__v")
      .populate("seller", "name email photoUrl createdAt phone ");
    if (!products.length) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, { success: true, products });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};

// get all product for seller
export const getSellerProductsForSellerAndAdmin = async (req, res) => {
  const { user, params } = req;

  // check user is seller or admin. if not seller or admin then return
  if (!(isSeller(req) || isAdmin(req))) {
    // here user is not a seller or not a admin
    return sendResponse(res, 403, {
      name: "Forbidden",
      message: "There is not your access",
      success: false,
    });
  }

  // check auth seller and requested seller is same. if not return with error
  if (isSeller(req)) {
    if (user._id !== params.id) {
      return sendResponse(res, 403, {
        success: false,
        message: "Shit man! You are trying to see others seller products!",
      });
    }
  }

  try {
    const products = await Product.find({ seller: params.id })
      .select(" -__v")
      .populate("seller", "name email photoUrl createdAt phone ");
    if (!products.length) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, { success: true, products });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};

// get all product for user
export const getAllProductForUser = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" })
      .select(" -__v")
      .populate("seller", "name email photoUrl createdAt phone ");
    if (!products.length) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, { success: true, products });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};

// get all product for user
export const getFeatureProductForUser = async (req, res) => {
  try {
    const products = await Product.find({ status: "active", isFeature: true })
      .select(" -__v")
      .populate("seller", "name email photoUrl createdAt phone  ");
    if (!products.length) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, { success: true, products });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};

// get single product for user
export const getSingleProductForUser = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      status: "active",
    })
      .select(" -__v")
      .populate("seller", "name photoUrl ");
    if (!product) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, { success: true, product });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};

// post a single product
export const postSingleProduct = async (req, res) => {
  const { user, body } = req;
  //check user or seller
  if (user.role !== "seller") {
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only seller can add product",
    });
  }

  const product = { ...body, seller: user._id };
  const data = new Product(product);
  try {
    const result = await data.save();
    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: "Inserted data id: " + result._id,
    });
  } catch (error) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: error.message,
      success: false,
    });
  }
};

// update single product
export const updateSingleProduct = async (req, res) => {
  const { id } = req.params;

  // check user or seller
  // const isSeller = isSellerCheck(req);
  if (!isSeller(req)) {
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only seller can update product",
    });
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, seller: req.user._id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return sendResponse(res, 403, {
        name: "Forbidden",
        success: false,
        message: "Shit man! This is not your product.",
      });
    }
    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: `update data id: ${updatedProduct._id}`,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: err.message,
      success: false,
    });
  }
};

// delete product
export const deleteSingleProduct = async (req, res) => {
  const { id } = req.params;

  if (!(isSeller(req) || isAdmin(req))) {
    // here user is not seller or admin
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "Your have not access to delete product",
    });
  }

  // delete product
  try {
    let deletedProduct;

    //check user is seller or admin
    if (isSeller(req)) {
      //here user is seller
      deletedProduct = await Product.findOneAndDelete({
        _id: id,
        seller: req.user._id,
      });

      // check product found or not. if not then return
      if (!deletedProduct) {
        return sendResponse(res, 403, {
          name: "Forbidden",
          success: false,
          message: "Oh shit! This is not your product.",
        });
      }
    } else {
      // here user is admin
      deletedProduct = await Product.findOneAndDelete({
        _id: id,
      });

      // check product found or not. if not then return
      if (!deletedProduct) {
        return sendResponse(res, 403, {
          name: "Forbidden",
          success: false,
          message: "Product not fount by id: " + id,
        });
      }
    }

    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: `Deleted product id: ${id}`,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: err.message,
      success: false,
    });
  }
};

export const updateProductStatus = async (req, res) => {
  const { body, user, params } = req;

  if (user.role !== "admin") {
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only admin can do this operation",
    });
  }
  try {
    const result = await Product.updateOne(
      { _id: params.id },
      { status: body.status, isFeature: body.isFeature }
    );
    if (!result)
      return sendResponse(res, 404, {
        name: "Not found",
        success: false,
        message: "Product not found by id:" + req.params.id,
      });

    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: `updated product id: ${req.params.id}`,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};

/**
 *  coded by: Jashim
 *  get Similar products
 *  requirements:
 *  product Id , subCategory
 *  then get data
 *  /product/similarProduct
 */

export const getSimilarProducts = async (req, res) => {
  const { subcategory } = req.body;
  //  console.log(subcategory)
  try {
    const similarProducts = await Product.find({
      subCategory: subcategory,
    }).limit(12);
    if (similarProducts == "" || null) {
      res.status(500).json({
        name: "response",
        success: false,
        message: "Sorry! no product found",
      });
    } else {
      res.status(200).json({
        totalProducts: similarProducts.length,
        data: similarProducts,
        message: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      name: "Internal Server error",
      success: false,
      message: error.message,
    });
  }
};

// get latest 3 products
export const getLatestProductBylimit = async ( req, res ) => {
  const latestProducts =  await Product.find({status: 'active'}).limit(3);
  try{
    if(!latestProducts.length) {
      return res.status(500).json({ message: 'Sorry no products found'})
    }
    res.status(200).json({
      latestProducts
    })
  } catch (err){
    res.status(500).json({message: 'server side error'})
  }

}




// get product by category
export const getProductsByCategory = async (req, res) => {
  const categoryName = req.params.category.toLowerCase();
  // let category = "category[0]";

  try {
    const products = await Product.find({
      status: "active",
      category: { $all: [categoryName] },
    }).populate("seller", " -password -__v");
    if (!products.length) {
      return sendResponse(res, 404, {
        success: false,
        message: "product not found by category:" + category,
      });
    } else {
      return sendResponse(res, 200, {
        success: true,
        message: "product found",
        products,
      });
    }
  } catch (err) {
    return sendResponse(res, 500, { success: false, message: err.message });
  }
};


