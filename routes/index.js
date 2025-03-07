const categoryRouter = require("./categoryRoutes");
const subCategoryRouter = require("./subCategoryRoutes");
const brandRouter = require("./brandRoutes")
const productRouter = require("./productRouter")
const userRouter = require("./userRouter")
const authRouter = require("./authRoutes")
const reviewRouter = require("./reviewRoutes")
const wishlistRouter = require("./wishlistRoutes")
const addressesRouter = require("./addressesRoutes")
const couponRouter = require("./couponRoutes")
const cartRouter = require("./cartRoute")
const orderRouter = require("./orderRoutes")
const mountRoutes = (app) => {
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/subcategor", subCategoryRouter);
    app.use("/api/v1/brands", brandRouter);
    app.use("/api/v1/products", productRouter);
    app.use("/api/v1/users", userRouter)
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/reviews", reviewRouter)
    app.use("/api/v1/wishlist", wishlistRouter)
    app.use("/api/v1/addresses", addressesRouter)
    app.use("/api/v1/coupons", couponRouter)
    app.use("/api/v1/cart", cartRouter)
    app.use("/api/v1/order", orderRouter)
}

module.exports = mountRoutes