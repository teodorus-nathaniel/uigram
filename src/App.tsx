import React from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Sidenav from './components/sidenav/sidenav.component';
import PostPreview from './components/post-preview/post-preview.component';
import { Switch, Route } from 'react-router-dom';
import PostPreviewContainer from './components/post-preview-container/post-preview-container.component';

function App() {
	return (
		<div className="App">
			<Sidenav />
			<Navbar />
			<main>
				<Switch>
					<Route path="/" exact component={PostPreviewContainer} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
