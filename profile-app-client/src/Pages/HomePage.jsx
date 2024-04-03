import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<article>
				<h1>IronProfile</h1>
				<p>
					Today we will create and app with authorization, adding some cool
					styles!
				</p>
				<button type="button" onClick={() => navigate("/sign-up")}>
					Sign up
				</button>
				<button type="button" onClick={() => navigate("/log-in")}>
					Log in
				</button>
			</article>
		</div>
	);
};
export default HomePage;
