/*
 * action 类型
 */

export const HANDLE_MOVE = 'HANDLE_MOVE';
export const CHANGE_LIGHT = 'CHANGE_LIGHT';

/*
 * action 创建函数
 */

export function handlerMove (data) {
    return { type: HANDLE_MOVE, data };
}

export function changeLight (light) {
    return { type: CHANGE_LIGHT, light };
}

export const actions = {
    handlerMove,
    changeLight
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [HANDLE_MOVE]: function (state, action) {
        return {
            ...state,
            color: action.data.color
        };
    },
    [CHANGE_LIGHT]: function (state, action) {
        return {
            ...state,
            light: action.light
        };
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { color: '', light: 0 };
export default function colorfulLightCtrlReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
