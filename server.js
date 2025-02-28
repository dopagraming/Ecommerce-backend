const path = require("path")
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");

const dbConnecion = require("./config/database");

const apiError = require("./utils/apiError");
const errorMiddleware = require("./middlewares/errorMiddleware");
const mountRoutes = require("./routes");
dotenv.config({ path: "config.env" });

const app = express();
app.use(express.json());



app.use(express.static(path.join(__dirname, 'uploads')))
// Connect With Database
dbConnecion();



// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

// MiddelWare
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
//   console.log(`mode: ${process.env.NODE_ENV}`);
// }
// Mount Routes

mountRoutes(app)
// app.use("/api/v1/category", categoryRouter);
// app.use("/api/v1/subCategory", subCategoryRouter);
// app.use("/api/v1/brands", brandRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/users", userRouter)
// app.use("/api/v1/auth", authRouter)
// app.use("/api/v1/reviews", reviewRouter)
// app.use("/api/v1/wishlist", wishlistRouter)
// app.use("/api/v1/addresses", addressesRouter)
// app.use("/api/v1/coupon", couponModel)
app.all("*", (req, res, next) => {
  next(new apiError(`Can't Find This route : ${req.originalUrl}`, 400));
});
// Global Error Handling Middlware
app.use(errorMiddleware);
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("App runnig");
});
// handle rejec outside express
process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection ${err}`)
  server.close(() => {
    console.log("shutting down ....");
    process.exit(1)
  })
})

