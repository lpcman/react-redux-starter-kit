/*
 * action 类型
 */
export const PANEL_ON = 'PANEL_ON';
export const SET_STATE = 'SET_STATE';
/*
 * action 创建函数
 */
export function statusChange (type, power) {
    console.log('输出previous status:' + type);
    let nextStatus = '';
    switch (type) {
        case 'ON':
            nextStatus = 'OFF';
            break;
        case 'OFF':
            nextStatus = 'ON';
            break;
        case 'OFF_LINE':
            nextStatus = 'ON';
            break;
    }
    return { type: PANEL_ON, nextStatus, power };
}
export function setState (status, power) {
    return { type: SET_STATE, status, power };
}
export const actions = {
    statusChange,
    setState
};

// ------------------------------------
// Action Handlers
// ------------------------------------

// function upload (data) {
//
// }

const ACTION_HANDLERS = {
    [PANEL_ON] : function (state, action) {
        console.log(action);
        return {
            ...state,
            status: action.nextStatus,
            power: action.power
        };
    },
    [SET_STATE] : function (state, action) {
        return {
            ...state,
            status: action.status,
            power: action.power
        };
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { status:'ON', power: 137 };
export default function socketPanelReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
