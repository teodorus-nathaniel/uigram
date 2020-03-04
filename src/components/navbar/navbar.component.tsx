import './navbar.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div className="navbar">
			<ul>
				<li className="inverted">
					<Link to="/post">Share your UI!</Link>
				</li>
				<li>
					<Link to="/profile">Profile</Link>
				</li>
			</ul>
		</div>
	);
}
