import { useEffect } from "react";
import WorkoutList from "../component/WorkoutList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import Create from "../component/Create";
const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorazation: `Bearer ${user.token}`,
        },
        
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
     <div className="workout">
         {workouts &&
          workouts.map((workout) => (
            <WorkoutList key={workout._id} workout={workout} />
          ))}
      </div>
      <Create />
    </div>
  );
};

export default Home;
