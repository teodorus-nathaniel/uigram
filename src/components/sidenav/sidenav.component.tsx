import React, { useState, useEffect } from 'react';
import IconImage from '../icons/icon-image.component';

import Logo from './../../assets/images/logo.png';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import './sidenav.styles.scss';
import SunIcon from '../icons/sun/sun.component';
import FollowingIcon from '../icons/following/following.component';
import FollowersIcon from '../icons/followers/followers.component';

export default function Sidenav() {
	const [ isHovered, setIsHovered ] = useState(false);
	const [ isScrolled, setIsScrolled ] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	useEffect(
		() => {
			function handleScrolled() {
				if (window.scrollY >= 67 && !isScrolled) setIsScrolled(true);
				else if (window.scrollY < 67 && isScrolled) setIsScrolled(false);
			}
			window.addEventListener('scroll', handleScrolled);
			return () => {
				window.removeEventListener('scroll', handleScrolled);
			};
		},
		[ isScrolled ]
	);

	return (
		<aside
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="sidenav"
		>
			<ul>
				<li className={`sidenav__logo ${isScrolled ? '' : 'hide'}`}>
					<IconImage src={Logo} alt="Logo" />
					<span>Home</span>
				</li>
				<li>
					<BookmarkIcon noHover color={isHovered ? 'white' : undefined} />
					<span>Saved</span>
				</li>
				<li>
					<FollowingIcon noHover color={isHovered ? 'white' : undefined} />
					<span>Following</span>
				</li>
				<li>
					<FollowersIcon noHover color={isHovered ? 'white' : undefined} />
					<span>Followers</span>
				</li>
				<li>
					<SunIcon noHover color={isHovered ? 'white' : undefined} />
					<span>Color Mode</span>
				</li>
			</ul>
		</aside>
	);
}
