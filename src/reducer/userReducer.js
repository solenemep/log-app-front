export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        userList: [...state.userList, action.payload],
        loadingUser: false,
        errorUser: "",
      };
    case "DELETE":
      return {
        ...state,
        userList: state.userList.filter((el) => el.id !== action.payload.id),
        loadingUser: false,
        errorUser: "",
      };
    case "FETCH_INIT":
      return {
        ...state,
        loadingUser: true,
        errorUser: "",
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loadingUser: false,
        errorUser: action.payload,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        userList: action.payload,
        loadingUser: false,
        errorUser: "",
      };
    default:
      throw new Error(`Unsupported action type ${action.type} in usertReducer`);
  }
};
export default userReducer;
