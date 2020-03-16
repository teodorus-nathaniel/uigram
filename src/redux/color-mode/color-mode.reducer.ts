import ColorModeActionType from './color-mode.actions';
import { CHANGE_COLOR_MODE } from './color-mode.actions';
interface IState {
	inDarkMode: boolean;
}

const INITIAL_STATE: IState = {
	inDarkMode: false
};

export default function colorModeReducer(
	state: IState = INITIAL_STATE,
	action: ColorModeActionType
) {
	switch (action.type) {
		case CHANGE_COLOR_MODE:
			return {
				...state,
				inDarkMode: !state.inDarkMode
			};
		default:
			return state;
	}
}
