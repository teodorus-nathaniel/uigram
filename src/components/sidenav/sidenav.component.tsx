import React from 'react';
import DoubleAngleIcon from '../icons/double-angle/double-angle.component';
import IconImage from '../icons/icon-image.component';

import FollowerIcon from './../../assets/images/follower.png';
import FollowingIcon from './../../assets/images/following.png';
import Logo from './../../assets/images/logo.png';
import BookmarkIcon from '../icons/bookmark/bookmark.component';
import './sidenav.styles.scss';
import SunIcon from '../icons/sun/sun.component';

export default function Sidenav() {
	return (
		<aside>
			<ul>
				<li>
					<IconImage src={Logo} alt="Logo" />
					<span>Home</span>
				</li>
				<li>
					<BookmarkIcon />
					<span>Saved</span>
				</li>
				<li>
					<IconImage src={FollowingIcon} alt="following" />
					<span>Following</span>
				</li>
				<li>
					<IconImage src={FollowerIcon} alt="follower" />
					<span>Follower</span>
				</li>
			</ul>

			<div>
				<SunIcon />
				<span>Color Mode</span>
			</div>
		</aside>
	);
}
