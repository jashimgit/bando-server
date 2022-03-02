import schema from "../schemas";
import mongoose from "mongoose";

const Auth = mongoose.model("Auth", schema.authSchema);

export default Auth;
