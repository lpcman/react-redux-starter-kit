/*
 * action 类型
 */
export const PANEL_ON = 'PANEL_ON';
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
    return { type: PANEL_ON, nextStatus, power};
}
export const actions = {
    statusChange
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
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { status:'ON', power: 137};
export default function socketPanelReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
