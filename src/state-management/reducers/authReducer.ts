interface Login {
  type: "LOGIN";
  userName: string;
}
interface Logout {
  type: "LOGOUT";
}
type AuthAction = Login | Logout;

const authReducer = (state: string, action: AuthAction) => {
  if (action.type === "LOGIN") return action.userName;
  if (action.type === "LOGOUT") return "";
  return state;
};

export default authReducer;
