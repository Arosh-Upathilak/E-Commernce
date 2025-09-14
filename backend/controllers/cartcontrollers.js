import userModel from "../models/userModels.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove items from user cart
const removefromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Remove from cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

//fetch usercart data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    
    return res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removefromCart, getCart };
