const initialState = {
    dx: [],
    highcharts: [],
    functions: []
};

export function result(state=initialState, action) {
    switch(action.type) {
        case "dx_result":
            return Object.assign({}, state, {"dx": [...state.dx, action.payload]});
        case "highcharts_result":
            return Object.assign({}, state, {"highcharts": [...state.highcharts, action.payload]});
        default:
            return state;
    }
}

export function functions(state=[], action) {
    switch(action.type) {
        case "add_function":
            return [...state, action.payload.func];
        case "remove_function":
            return state.filter(func => func !== action.payload.func);
        default:
            return state;
    }
}