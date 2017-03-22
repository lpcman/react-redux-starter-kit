/*
 * action 类型
 */

export const CHANGE_LIGHT = 'CHANGE_LIGHT';
export const UPLOAD_DATA = 'UPLOAD_DATA';

/*
 * action 创建函数
 */

export function changeLight (light) {
    return { type: CHANGE_LIGHT, light };
}

export function uploadData (data) {
    return { type: UPLOAD_DATA, data };
}

export const actions = {
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
const initialState = { color: '#FFF', light: 0 };
export default function colorfulLightWhiteCtrlReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
