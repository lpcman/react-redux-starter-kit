/*
 * action 类型
 */

export const CHANGE_LIGHT = 'CHANGE_LIGHT';

/*
 * action 创建函数
 */

export function changeLight (light) {
    return { type: CHANGE_LIGHT, light };
}

export const actions = {
    changeLight
};

// ------------------------------------
// Action Handlers
// ------------------------------------

// function upload (data) {
//     console.log(data);
//     // Bridge('test', { a: 'a', b: 'b' });
//     return true;
// }

const ACTION_HANDLERS = {
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
const initialState = { color: '#FFFFFF', light: 0 };
export default function colorfulLightWhiteCtrlReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
