/*
 * action 类型
 */

/*
 * action 创建函数
 */

export const actions = {
};

// ------------------------------------
// Action Handlers
// ------------------------------------

function upload(data) {

}

const ACTION_HANDLERS = {
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { status:"ON"};
export default function colorfulLightPanelReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
