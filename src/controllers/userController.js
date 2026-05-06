import {asyncHandler} from "../Utils/asyncHandler.js";


const registerUser = asyncHandler(async (requestAnimationFrame, res) => {
  res.status(200).json({
    message: "Ok"
  })
} )



export {registerUser}