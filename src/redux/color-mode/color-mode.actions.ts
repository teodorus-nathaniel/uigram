import { action } from 'ts-action';
export const CHANGE_COLOR_MODE = 'CHANGE_COLOR_MODE';
export const changeColorMode = action(CHANGE_COLOR_MODE);

type ColorModeActionType = ReturnType<typeof changeColorMode>;
export default ColorModeActionType;
