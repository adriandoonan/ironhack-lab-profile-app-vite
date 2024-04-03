import { useState } from "react";

const LogIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogIn = (event) => {
		event.preventDefault();
		console.log(username, "is trying to log in with", password);
	};

	return (
		<div>
			<article>
				<h1>IronProfile</h1>
				<form onSubmit={handleLogIn} id="log-in-form">
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
					<button type="submit" onClick={handleLogIn}>
						Log in
					</button>
				</form>
			</article>
		</div>
	);
};
export default LogIn;
