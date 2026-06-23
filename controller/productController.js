 const Product = require("./productController.js");
const user = require("../model/productModel.js");

//////create product

exports.createProduct = async (req, res) => {
  try {
    let { tittle, description, price, rating, image, quantity, createdBy } =
      req.body;
    const existingProduct = await Product.findOne({ tittle });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Tittle already Exist",
      });
    }

    const commodity = await Product.create({
      tittle,
      description,
      price,
      rating,
      image,
      quantity,
      createdBy,
    });
    res.status(201).json({
      success: true,
      message: "Product Created Successful",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// GET ALL PRODUCT
exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find()
      .populate("createdBy", "userName email country gender")
      .sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      message: "products retrieved successfully",
      count: product.length,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET PRODUCT BY ID 
exports.getProductById = async(req, res) => {
  try {
    let product = await Product.findById(req.params.id,req.body);
    if(!Product) {
      return;
      res.status(400).json({
      success:false,
      message:"Product not Found 🤷‍♂️",
      });
    }
    res.status(200).json({
      success: "true",
      message:"Product id retrieved sucessfully✅",
      product,
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message,
    });

  }
}

//  UPDATE PRODUCT
exports.updateProduct = async(req, res) => {
  try {
    
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if(!Product) {
      return
      res.status(400).json({
        message: "product not found🤷‍♂️",
        success: false,
      })
    }
    res.status(201).json ({
      success:true,
      message: "Product has been updated successfully✅",
      product,
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
   
    })
  }
}



// DELETE PRODUCT
exports.deleteProduct = async(req, res) =>{
  try {
    let deleteProduct = await Product.findByIdAndDelete(req.params.id)
    if(!deleteProduct) {
      return;
      res.status(404).json ({
        success: false,
        message: "Product not found 🤷‍♂️ "
      })
    };
    res.status(200).json ({
      success: "true",
      message: "Product has been deleted successfully✅"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

