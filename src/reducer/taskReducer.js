export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
        loadingTask: false,
        errorTask: "",
      };
    case "DELETE":
      return {
        ...state,
        taskList: state.taskList.filter((el) => el.id !== action.payload.id),
        loadingTask: false,
        errorTask: "",
      };
    case "FETCH_INIT":
      return {
        ...state,
        loadingTask: true,
        errorTask: "",
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loadingTask: false,
        errorTask: action.payload,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        taskList: action.payload,
        loadingTask: false,
        errorTask: "",
      };
    default:
      throw new Error(
        `Unsupported action type ${action.type} in taskListReducer`
      );
  }
};
export default taskReducer;
