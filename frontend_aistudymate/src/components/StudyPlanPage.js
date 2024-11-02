import React, { useState } from "react";
import axios from "axios";

function StudyPlanPage() {
  const [planName, setPlanName] = useState("");
  const [message, setMessage] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllPlans, setShowAllPlans] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7860/api/v1/study_plan/create_study_plan",
        {
          plan_name: planName,
          plan_data: timetable,
        }
      );
      setMessage(response.data.message);
      setIsEditing(false);
      handleLoadAll(); // Refresh the list of all plans after saving
    } catch (error) {
      console.error("Error submitting study plan:", error);
      setMessage("Error submitting study plan.");
    }
  };

  const handleDelete = async (planName) => {
    try {
      const response = await axios.delete(
        `http://localhost:7860/api/v1/study_plan/delete_study_plan?plan_name=${planName}`
      );
      setMessage(response.data.message);
      handleLoadAll(); // Refresh the list of all plans after deleting
    } catch (error) {
      console.error("Error deleting study plan:", error);
      setMessage("Error deleting study plan.");
    }
  };

  const handleLoadDefault = async () => {
    try {
      // Create the default study plan
      await axios.post(
        "http://localhost:7860/api/v1/study_plan/create_default_study_plan"
      );

      // Load the default study plan
      const response = await axios.get(
        "http://localhost:7860/api/v1/study_plan/load_study_plan"
      );
      if (response.data.timetable) {
        setTimetable(response.data.timetable);
        setMessage("Example study plan loaded.");
      } else {
        setMessage("Error loading example study plan.");
      }
    } catch (error) {
      console.error("Error loading example study plan:", error);
      setMessage("Error loading example study plan.");
    }
  };

  const handleLoadAll = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7860/api/v1/study_plan/get_all_plan_names"
      );
      if (response.data.plan_names) {
        setAllPlans(response.data.plan_names);
        setMessage("All study plans loaded.");
      } else if (response.data.message) {
        setAllPlans([]);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error loading all study plans:", error);
      setMessage("Error loading all study plans.");
    }
  };

  const handleSelectPlan = async (planName) => {
    try {
      const response = await axios.get(
        `http://localhost:7860/api/v1/study_plan/load_study_plan?plan_name=${planName}`
      );
      if (response.data.timetable) {
        setTimetable(response.data.timetable);
        setMessage(`Study plan ${planName} loaded.`);
      } else {
        setMessage("Error loading selected study plan.");
      }
    } catch (error) {
      console.error("Error loading selected study plan:", error);
      setMessage("Error loading selected study plan.");
    }
  };

  const handleEdit = async (planName) => {
    try {
      const response = await axios.get(
        `http://localhost:7860/api/v1/study_plan/load_study_plan?plan_name=${planName}`
      );
      if (response.data.timetable) {
        setTimetable(response.data.timetable);
        setPlanName(planName);
        setIsEditing(true);
        setMessage(`Editing study plan ${planName}.`);
        handleLoadAll(); // Refresh the list of all plans after editing
      } else {
        setMessage("Error loading selected study plan for editing.");
      }
    } catch (error) {
      console.error("Error loading selected study plan for editing:", error);
      setMessage("Error loading selected study plan for editing.");
    }
  };

  const handleTimetableChange = (index, field, value) => {
    const newTimetable = [...timetable];
    newTimetable[index][field] = value;
    setTimetable(newTimetable);
  };

  const toggleShowAllPlans = () => {
    if (showAllPlans) {
      setShowAllPlans(false);
      setMessage(""); // Clear the message when hiding all plans
    } else {
      setShowAllPlans(true);
      handleLoadAll(); // Load all plans when showing
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Study Plan</h1>
      <button
        type="button"
        onClick={handleLoadDefault}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Example Plan
      </button>
      <button
        type="button"
        onClick={toggleShowAllPlans}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {showAllPlans ? "Hide All Plans" : "Show All Plans"}
      </button>
      {message && <p>{message}</p>}

      {showAllPlans && (
        <div>
          <h2>All Study Plans</h2>
          {allPlans.length > 0 ? (
            <ul>
              {allPlans.map((planName, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(planName)}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    {planName}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(planName)}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    Edit Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(planName)}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No study plans available.</p>
          )}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSave} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Enter new plan name"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Save Plan
          </button>
        </form>
      )}

      {/* Timetable Start */}
      <h2>Timetable</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#ffcccc" }}>Time</th>
            <th style={{ backgroundColor: "#ffebcc" }}>Monday</th>
            <th style={{ backgroundColor: "#ffffcc" }}>Tuesday</th>
            <th style={{ backgroundColor: "#ccffcc" }}>Wednesday</th>
            <th style={{ backgroundColor: "#93c6fb" }}>Thursday</th>
            <th style={{ backgroundColor: "#e0ccff" }}>Friday</th>
            <th style={{ backgroundColor: "#ffccf2" }}>Saturday</th>
            <th style={{ backgroundColor: "#cccccc" }}>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((slot, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={slot.time}
                    onChange={(e) =>
                      handleTimetableChange(index, "time", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                ) : (
                  slot.time
                )}
              </td>
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => (
                <td key={day}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={slot[day]}
                      onChange={(e) =>
                        handleTimetableChange(index, day, e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  ) : (
                    slot[day]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Timetable End */}
    </div>
  );
}

export default StudyPlanPage;
