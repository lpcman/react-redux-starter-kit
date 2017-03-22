/*
 * action 类型
 */

export const CHANGE_STATUS = 'CHANGE_STATUS';

/*
 * action 创建函数
 */

export function changeStatus (status) {
    let newStatus;
    switch (status) {
        case 'ON':
            newStatus = 'OFF';
            break;
        case 'OFF':
            newStatus = 'ON';
            break;
        default:
            newStatus = status;
            break;
    }
    return { type: CHANGE_STATUS, newStatus };
}

export const actions = {
    changeStatus
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [CHANGE_STATUS]: function (state, action) {
        return {
            ...state,
            status: action.newStatus
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
