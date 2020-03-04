import React from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import PostPreview from './components/post-preview/post-preview.component';

function App() {
	return (
		<div className="App">
			<Sidenav />
			<div className="content">
				<Navbar />

				<main>
					<PostPreview />
				</main>
			</div>
		</div>
	);
}

export default App;
