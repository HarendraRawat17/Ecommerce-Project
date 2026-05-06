import {asyncHandler} from "../Utils/asyncHandler.js";
import { User } from "../Models/userModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import {ApiResponse} from "../Utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
  const {fullName, email, username, password} = req.body
  console.log("email", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existingUser = User.findOne({
    $or: [{ username }, { email }]
   })

   if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
   }

   const avatarLocalPath = req.files?.avatar[0]?.path; // files is given by multer middleware
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required"); 
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if (!avatar) {
    throw new ApiError(400, "Avatar file is required"); 
   }

   User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if (!createdUser) {
    throw new ApiError(500, " Something went wrong, while resgistering!")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
   )
})




export {registerUser}




// steps to register a user acc to me:-

// first we will take info acc to userschema
// we will use try and catch
// inside try we will write the needed logic/validation
// we will check if user already exists: username, email
// we'll call post api
// we will set the taken info into the body of db


// Steps to register a user acc to trainer :-
// get user details from frontend
// validate the details = should not be empty
// check if user already exists: username, email
// check for images, avatar
// upload them on cloudinary, avatar
// create user object - create entry in db
// remove password and refresh token fields from response
// check if user created
// return response