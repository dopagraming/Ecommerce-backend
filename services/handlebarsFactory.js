const asyncHandler = require('express-async-handler');
const ApiFeatuer = require("../utils/apiFeatures");
const apiError = require('../utils/apiError');
exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const document = await Model.findByIdAndDelete(id);

        if (!document) {
            return next(new apiError(`No document for this id ${id}`, 404));
        }

        document.remove();
        res.status(204).send();
    });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!document) {
            return next(
                new ApiError(`No document for this id ${req.params.id}`, 404)
            );
        }
        // Here To update rating when update review
        document.save()
        res.status(200).json({ data: document });
    });

exports.getOne = (model, populateOpt) => (
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        // build query
        let query = model.findById(id)
        if (populateOpt) {
            query = query.populate(populateOpt)
        }
        const one = await query
        if (!one) {
            return next(new apiError("There Is No One For This Id", 404))
        }
        res.status(200).json({ data: one })
    })
)


exports.getGroup = (model, populateOpt) => (
    asyncHandler(async (req, res, next) => {
        let filter = {}
        if (req.filterObj) {
            filter = req.filterObj
        }
        const documnetCount = await model.countDocuments()
        let query = new ApiFeatuer(model.find(filter), req.query)
            .paginate(documnetCount)
            .filter()
            .search()
            .limitFields()
            .sort()

        const { mongooseQuery, paginationResult } = query

        // تعديل: استخدام mongooseQuery لتطبيق populate
        if (populateOpt) {
            mongooseQuery.populate(populateOpt)
        }

        const group = await mongooseQuery
        if (!group) {
            return next(new apiError(`There Is No Docs`, 404))
        }
        res.status(200).json({ paginationResult, data: group })
    })
)
exports.createOne = (Model) =>
    asyncHandler(async (req, res) => {
        const newDoc = await Model.create(req.body);
        res.status(201).json({ data: newDoc });
    });