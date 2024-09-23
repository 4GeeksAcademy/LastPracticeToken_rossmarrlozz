import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1">
					Home
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Back</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
