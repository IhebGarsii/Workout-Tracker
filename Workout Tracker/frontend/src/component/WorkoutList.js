import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutList = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const handelClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: { Authorazation: `Bearer ${user.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-list">
      <div className="list">
        <h1>{workout.title}</h1>
        <strong>Load(kg):{workout.load}</strong>
        <strong>Number of reps: {workout.reps}</strong>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <span className="material-symbols-outlined" onClick={handelClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutList;
