const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();
const saltRounds = 10;

router.post("/signup", async (req, res, next) => {
	try {
		const { username, password, campus, course } = req.body;
		if (username === "" || password === "" || campus === "" || course === "") {
			res
				.status(400)
				.json({ message: "Provide username, password, course and campus" });
			return;
		}

		const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
		if (!passwordRegex.test(password)) {
			res.status(400).json({
				message:
					"Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
			});
			return;
		}

		const foundUser = await User.findOne({ username });

		if (foundUser) {
			res.status(400).json({ message: "User already exists." });
			return;
		}
		// If the email is unique, proceed to hash the password
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(password, salt);

		// Create a new user in the database
		// We return a pending promise, which allows us to chain another `then`
		const newUser = await User.create({
			username,
			password: hashedPassword,
			campus,
			course,
		});

		const {
			username: newUserUsername,
			campus: newUserCampus,
			course: newUserCourse,
		} = newUser;
		res.status(201).json({
			username: newUserUsername,
			campus: newUserCampus,
			course: newUserCourse,
		});
	} catch (err) {
		console.error("error in signup route", err);
		res.status(500).json({ status: "error", message: err });
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const foundUser = await User.findOne({ username });
		console.log("found user", foundUser);

		if (!foundUser) {
			res
				.status(400)
				.json({ status: "error", message: "No user with that username" });
			return;
		}

		const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);

		if (!isPasswordCorrect) {
			res.status(401).json({ status: "error", message: "Incorrect password" });
			return;
		}
		const { _id, campus, course } = foundUser;
		const payload = { _id, username, campus, course };

		const authToken = jwt.sign(payload, process.env.TOKEN_SIGNING_KEY, {
			algorithm: "HS256",
			expiresIn: "6h",
		});
		res.status(200).json({ status: "success", token: authToken });
	} catch (err) {
		console.error("error in signup route", err);
		res.status(500).json({ status: "error", message: err });
	}
});

router.get("/verify", isAuthenticated, (req, res, next) => {
	console.log("req.headers", req.headers);
	console.log("payload", req.payload);
	try {
		const { _id, username, campus, course } = req.payload;
		res.status(200).json({ _id, username, course, campus });
	} catch (err) {
		console.error("made it to an error", err);
		next(err);
	}
});

module.exports = router;
