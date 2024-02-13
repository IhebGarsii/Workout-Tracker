import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";
export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();

  const logout = () => {
    //remouve user from storeg
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUT", payload: null });
  };
  return { logout };
};
