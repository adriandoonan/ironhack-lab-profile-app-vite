const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/auth.js");

router.get("/users", isAuthenticated, async (req, res, next) => {
	try {
		const { _id } = req.payload;
		const foundUser = await User.findById(_id);
		const { username, course, campus } = foundUser;
		res
			.status(200)
			.json({ status: "success", userDetails: { username, course, campus } });
	} catch (error) {
		console.error("error in get users", error);
		next(error);
	}
});

router.put("/users", isAuthenticated, async (req, res, next) => {
	try {
		const { _id } = req.payload;
		const { image } = req.body;
		if (!image) {
			res.status(400).json({
				status: "error",
				message: "your request body should contain a parameter called image",
			});
			return;
		}
		const imageRegex = new RegExp(/^http[s]*:\/\/(.+?\..+?)+?\/.+/);
		if (!imageRegex.test(image)) {
			res.status(400).json({
				status: "error",
				message: "the image parameter should contain a url to your image",
			});
			return;
		}
		const updatedUser = await User.findByIdAndUpdate(_id, { image });
		const { username, course, campus, image: updatedImage } = updatedUser;
		res.status(200).json({
			status: "success",
			userDetails: { username, course, campus, image: updatedImage },
		});
	} catch (error) {
		console.error("error in get users", error);
		next(error);
	}
});

router.post("/upload", (req, res, next) => {
	res.json("All good in upload");
});

module.exports = router;
