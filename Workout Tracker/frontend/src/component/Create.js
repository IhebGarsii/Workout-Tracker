import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Create = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setErorr] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      setErorr("you must be logged");
      return;
    }
    const workoutPost = { title, load, reps };
    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workoutPost),
      headers: {
        "Content-Type": "application/json",
        Authorazation: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setErorr(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setErorr(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
    /*   setEmptyFields([]);
    } else {
      setEmptyFields(json.emptyFields);
    } */
  };

  return (
    <div className="create">
      <form onSubmit={submit}>
        <h2>Add a New Workout</h2>
        <label>Excersize Title:</label>
        <input
          type="text"
         onChange={(e) => setTitle( e.target.value)}
          value={title}
          placeholder="press up"
          /*           className={emptyFields.includes("title") ? "error" : ""}
           */
        />
        <label>Load(in kg):</label>
        <input
          type="text"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          placeholder="0"
          /*           className={emptyFields.includes("load") ? "error" : ""}
           */
        />
        <label>Number of Reps</label>
        <input
          type="text"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="0"
          /*           className={emptyFields.includes("reps") ? "error" : ""}
           */
        />
        <button>add Workout</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Create;
