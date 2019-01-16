const initialState = {
  dx: [],
  highcharts: [],
  anychart: [],
  zingchart: []
};

export function result(state = initialState, action) {
  switch (action.type) {
    case "dx_result":
      return Object.assign({}, state, { dx: [...state.dx, action.payload] });
    case "highcharts_result":
      return Object.assign({}, state, {
        highcharts: [...state.highcharts, action.payload]
      });
    case "anychart_result":
      return Object.assign({}, state, {
        anychart: [...state.anychart, action.payload]
      });
    case "zingchart_result":
      return Object.assign({}, state, {
        zingchart: [...state.zingchart, action.payload]
      });
    default:
      return state;
  }
}

export function functions(state = [], action) {
  switch (action.type) {
    case "add_function":
      return [...state, action.payload.func];
    case "remove_function":
      return state.filter(func => func !== action.payload.func);
    default:
      return state;
  }
}

export function points(state = 0, action) {
  switch (action.type) {
    case "points_count":
      return action.payload.count;
    default:
      return state;
  }
}

export function experiments(state = 0, action) {
  switch (action.type) {
    case "experiments_count":
      return action.payload.count;
    default:
      return state;
  }
}

export function libraries(state = [], action) {
  switch (action.type) {
    case "add_chart_library":
      return [...state, action.payload.name];
    case "remove_chart_library":
      return state.filter(lib => lib !== action.payload.name);
    default:
      return state;
  }
}
