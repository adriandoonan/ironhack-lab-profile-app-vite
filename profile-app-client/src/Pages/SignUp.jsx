import { useState } from "react";
import { SERVER_URL } from "../App";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [campus, setCampus] = useState("");
	const [course, setCourse] = useState("");

	const handleSignUp = async (event) => {
		event.preventDefault();
		console.log(username, "is trying to sign up with", password);
		const signedUpUser = await fetch(`${SERVER_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password, campus, course }),
		});
		console.log("sign up", signedUpUser);
	};

	return (
		<div>
			<article>
				<h1>IronProfile</h1>
				<form onSubmit={handleSignUp} id="sign-up-form">
					<label htmlFor="username">Username</label>
					<input
						name="username"
						autoComplete="username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						name="password"
						value={password}
						type="password"
						autoComplete="password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<label htmlFor="campus">Campus</label>
					<input
						name="campus"
						value={campus}
						type="text"
						autoComplete="city"
						onChange={(event) => setCampus(event.target.value)}
					/>
					<label htmlFor="course">Course</label>
					<input
						name="course"
						value={course}
						type="text"
						onChange={(event) => setCourse(event.target.value)}
					/>
					<button type="submit" onClick={handleSignUp}>
						Sign up
					</button>
				</form>
			</article>
		</div>
	);
};
export default SignUp;
