import { action } from 'ts-action';
export const CHANGE_COLOR_MODE = 'CHANGE_COLOR_MODE';
export const changeColorMode = action(CHANGE_COLOR_MODE);

export type ColorModeActionType = ReturnType<typeof changeColorMode>;

const ColorModeActionAPI = {
  changeColorMode
};

export default ColorModeActionAPI;
