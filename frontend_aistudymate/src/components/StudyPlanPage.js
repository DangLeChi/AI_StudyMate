import React, { useState } from 'react';

function StudyPlanPage() {
  const [plan, setPlan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the study plan to the backend
    console.log('Study Plan:', plan);
  };

  return (
    <div>
      <h1>Study Plan</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Enter your study plan"
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit">Save Plan</button>
      </form>

      {/* Timetable Start */}
      <h2>Timetable</h2>
      <table border="1">
        <thead>
          <tr>
          <th style={{ backgroundColor: '#ffcccc' }}>Time</th>
            <th style={{ backgroundColor: '#ffebcc' }}>Monday</th>
            <th style={{ backgroundColor: '#ffffcc' }}>Tuesday</th>
            <th style={{ backgroundColor: '#ccffcc' }}>Wednesday</th>
            <th style={{ backgroundColor: '#cce5ff' }}>Thursday</th>
            <th style={{ backgroundColor: '#e0ccff' }}>Friday</th>
            <th style={{ backgroundColor: '#ffccf2' }}>Saturday</th>
            <th style={{ backgroundColor: '#cccccc' }}>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>8:00 - 9:00</td>
            <td>Math</td>
            <td>Literature</td>
            <td>English</td>
            <td>Chemistry</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>9:00 - 10:00</td>
            <td>Literature</td>
            <td>Math</td>
            <td>Chemistry</td>
            <td>English</td>
            <td>Biology</td>
            <td>Physics</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>10:00 - 11:00</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Math</td>
            <td>Literature</td>
            <td>Chemistry</td>
            <td>English</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>11:00 - 12:00</td>
            <td>English</td>
            <td>Chemistry</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Math</td>
            <td>Literature</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>12:00 - 1:00</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
          </tr>
          <tr>
            <td>1:00 - 2:00</td>
            <td>Math</td>
            <td>Literature</td>
            <td>English</td>
            <td>Chemistry</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>2:00 - 3:00</td>
            <td>Literature</td>
            <td>Math</td>
            <td>Chemistry</td>
            <td>English</td>
            <td>Biology</td>
            <td>Physics</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>3:00 - 4:00</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Math</td>
            <td>Literature</td>
            <td>Chemistry</td>
            <td>English</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>4:00 - 5:00</td>
            <td>English</td>
            <td>Chemistry</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Math</td>
            <td>Literature</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>5:00 - 6:00</td>
            <td>Break</td>
            <td>Break</td>
            <td>Break</td>
            <td>Break</td>
            <td>Break</td>
            <td>Break</td>
            <td>Break</td>
          </tr>
          <tr>
            <td>6:00 - 7:00</td>
            <td>Math</td>
            <td>Literature</td>
            <td>English</td>
            <td>Chemistry</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>7:00 - 8:00</td>
            <td>Literature</td>
            <td>Math</td>
            <td>Chemistry</td>
            <td>English</td>
            <td>Biology</td>
            <td>Physics</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>8:00 - 9:00</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Math</td>
            <td>Literature</td>
            <td>Chemistry</td>
            <td>English</td>
            <td>Rest</td>
          </tr>
          <tr>
            <td>9:00 - 10:00</td>
            <td>English</td>
            <td>Chemistry</td>
            <td>Physics</td>
            <td>Biology</td>
            <td>Math</td>
            <td>Literature</td>
            <td>Rest</td>
          </tr>
        </tbody>
      </table>
      {/* Timetable End */}
    </div>
  );
}

export default StudyPlanPage;