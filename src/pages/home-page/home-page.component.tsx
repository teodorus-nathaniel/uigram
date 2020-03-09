import React, { useEffect, useState } from 'react';
import PostPreviewContainer from './../../components/post-preview-container/post-preview-container.component';
import './home-page.styles.scss';
import TabLayout from '../../components/tab-layout/tab-layout.component';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Post } from '../../@types/post.interfaces';
import {
	fetchExplorePosts,
	fetchFeedsPosts
} from '../../redux/post/post.actions';
import { Dispatch } from 'redux';
import Loading from '../../components/loading/loading.component';

interface IProps {
	posts: Post[];
	isFetching: boolean;
	fetchExplorePosts: () => void;
	fetchFeedsPosts: () => void;
}

function HomePagePlain({
	posts,
	isFetching,
	fetchExplorePosts,
	fetchFeedsPosts
}: IProps) {
	const [ activeTab, setActiveTab ] = useState(0);
	const tabs = [
		{
			tab: 'Your Feeds',
			action: fetchFeedsPosts
		},
		{
			tab: 'Explore',
			action: fetchExplorePosts
		}
	];

	useEffect(
		() => {
			tabs[activeTab].action();
		},
		[ tabs, activeTab ]
	);

	return (
		<div className="home-page">
			<TabLayout
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={tabs.map(({ tab }) => tab)}
			/>
			{isFetching ? <Loading /> : <PostPreviewContainer posts={posts} />}
		</div>
	);
}

const mapStateToProps = ({ post: { posts, isFetching } }: GlobalState) => ({
	posts,
	isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	fetchExplorePosts: () => dispatch(fetchExplorePosts()),
	fetchFeedsPosts: () => dispatch(fetchFeedsPosts())
});

const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePagePlain);
export default HomePage;
