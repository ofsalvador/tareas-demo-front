const initialState = {
    tareas: [],
};

export default function tareasReducer(
    state = initialState,
    { type, payload }
  ) {
    switch (type) {
      case "load": {
        state.tareas = payload;
        return state;
        }
      case "add": {
        state.tareas.push(payload);
        return state;
      }
      case "update": {
        var foundIndex = state.tareas.findIndex(tarea => tarea.id === payload.id);
        state.tareas[foundIndex] = payload;
        return state;
      }
      case "delete": {
        return {tareas:state.tareas.filter(tarea=>tarea.id !== payload)};
      }  
      default: {
        return state;
      }
    } 
  }