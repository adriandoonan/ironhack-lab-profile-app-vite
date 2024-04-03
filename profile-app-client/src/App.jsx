import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";

export const SERVER_URL = "http://localhost:5005";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/log-in" element={<LogIn />} />
			</Routes>
		</>
	);
}

export default App;
