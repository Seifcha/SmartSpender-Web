import "reflect-metadata";

import productRouter from "./routes/productRoutes";
// import cmsUserRouter from "./routes/cmsUserRoutes"
import fournisseurRouter from "./routes/fournisseurRoutes";
import categorieRevenuRouter from "./routes/categorieRevenuRoutes";
import categorieDepenseRouter from "./routes/categorieDepenseRoutes";
import categorieFournisseurRouter from "./routes/categorieFournisseurRoutes";
import sousCategorieDepenserouter from "./routes/sousCategorieDepenseRoutes";
import categoriesDepenseFournisseurRouter from "./routes/categoriesDepenseFournisseurRoutes";
import categoriesRevenuFournisseurRouter from "./routes/categorieRevenuFournisseurRoutes";
import passwordRouter from "./routes/passwordRoutes";
import suggestionFournisseurRouter from "./routes/suggestionFournisseurRoutes";
import suggestionCategorieDepenseRouter from "./routes/suggestionCategorieDepenseRoutes";
import suggestionSousCategorieDepenseRouter from "./routes/suggestionSousCategorieDepenseRoutes";
import suggestionCategorieRevenuRouter from "./routes/suggestionCategorieRevenuRoutes";
import userRouter from "./routes/userRoutes";
// import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import authRouter from "./routes/authRoutes";
import logoutRouter from "./routes/logoutRoutes";
import refreshRouter from "./routes/refreshRoutes";
import registerRouter from "./routes/registerRoutes";
import notificationRouter from "./routes/NotificationRoutes";

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleWare/verifiyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleWare/credentials");
const PORT = process.env.PORT || 9000;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

app.use(registerRouter);
app.use(authRouter);
app.use(refreshRouter);
app.use(logoutRouter);
app.use(passwordRouter);

app.use(verifyJWT);

// app.use(cmsUserRouter);
app.use(productRouter);
app.use(fournisseurRouter);
app.use(categorieRevenuRouter);
app.use(categorieDepenseRouter);
app.use(categorieFournisseurRouter);
app.use(sousCategorieDepenserouter);
app.use(userRouter);
app.use(notificationRouter);

app.use(categoriesDepenseFournisseurRouter);
app.use(categoriesRevenuFournisseurRouter);
app.use(suggestionFournisseurRouter);
app.use(suggestionCategorieDepenseRouter);
app.use(suggestionCategorieRevenuRouter);
app.use(suggestionSousCategorieDepenseRouter);

app.listen(PORT, () => {
  console.log("Listening to: ", PORT);
});
