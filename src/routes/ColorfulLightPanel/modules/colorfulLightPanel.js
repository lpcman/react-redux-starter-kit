/*
 * action 类型
 */

export const CHANGE_STATUS = 'CHANGE_STATUS';

/*
 * action 创建函数
 */

export function setStatus (status) {
    return { type: CHANGE_STATUS, status };
}

export const actions = {
    setStatus
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [CHANGE_STATUS]: function (state, action) {
        return {
            ...state,
            status: action.status
        };
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { status: 'ON' };
export default function colorfulLightPanelReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
