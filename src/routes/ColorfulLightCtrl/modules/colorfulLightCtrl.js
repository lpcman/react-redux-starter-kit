/*
 * action 类型
 */

export const HANDLE_MOVE = 'HANDLE_MOVE';
export const CHANGE_LIGHT = 'CHANGE_LIGHT';
export const UPLOAD_DATA = 'UPLOAD_DATA';

/*
 * action 创建函数
 */

export function handlerMove (data) {
    return { type: HANDLE_MOVE, data };
}

export function changeLight (light) {
    return { type: CHANGE_LIGHT, light };
}

export function uploadData (data) {
    return { type: UPLOAD_DATA, data };
}

export const actions = {
    handlerMove,
    changeLight,
    uploadData
};

// ------------------------------------
// Action Handlers
// ------------------------------------

function upload (data) {
    console.log(data);
    return true;
}

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
    },
    [UPLOAD_DATA]: function (state, action) {
        upload(action);
        return {
            ...state
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
