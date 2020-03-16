import { Post } from "../../@types/post.interfaces";
import { CHANGE_SAVED } from "./post.actions";
import PostActionType, {
    FETCH_POSTS,
    FETCH_POSTS_FAILURE,
    LOAD_FEEDS_POSTS,
    LOAD_EXPLORE_POSTS
} from "./post.actions";

interface IState {
    explore: Post[];
    feeds: Post[];
    isFetching: boolean;
    error: Error | null;
}

const INITIAL_STATE = {
    explore: [],
    feeds: [],
    isFetching: false,
    error: null
};

export default function postReducer(
    state: IState = INITIAL_STATE,
    action: PostActionType
): IState {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case LOAD_FEEDS_POSTS:
            return {
                ...state,
                feeds: action.payload,
                isFetching: false,
                error: null
            };
        case LOAD_EXPLORE_POSTS:
            return {
                ...state,
                explore: action.payload,
                isFetching: false,
                error: null
            };
        case CHANGE_SAVED:
            const exploreItem = state.explore.find(
                el => el.id === action.payload.id
            );
            const feedsItem = state.feeds.find(
                el => el.id === action.payload.id
            );
            if (exploreItem) exploreItem.saved = action.payload.saved;
            if (feedsItem) feedsItem.saved = action.payload.saved;

            return {
                ...state,
                explore: state.explore.map(el => ({ ...el })),
                feeds: state.feeds.map(el => ({ ...el }))
            };
        default:
            return state;
    }
}
