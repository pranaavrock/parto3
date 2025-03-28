import React from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();
  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No course Enrolled Yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
// import React, { useState } from "react";
// import "./dashbord.css";
// import { CourseData } from "../../context/CourseContext";
// import CourseCard from "../../components/coursecard/CourseCard";

// const Dashbord = () => {
//   const { mycourse } = CourseData();
//   const [showAddCourse, setShowAddCourse] = useState(false);

//   return (
//     <div className="student-dashboard">
//       <h2>All Enrolled Courses</h2>
//       <div className="dashboard-content">
//         {mycourse && mycourse.length > 0 ? (
//           mycourse.map((e) => <CourseCard key={e._id} course={e} />)
//         ) : (
//           <p>No course Enrolled Yet</p>
//         )}
//       </div>

//       {/* Floating Add Course Button */}
//       <button className="add-course-btn" onClick={() => setShowAddCourse(true)}>+</button>

//       {/* Add Course Form (Only shows when the button is clicked) */}
//       {showAddCourse && (
//         <div className="add-course-form">
//           <h3>Add New Course</h3>
//           <input type="text" placeholder="Course Name" />
//           <input type="text" placeholder="Course Description" />
//           <button className="save-btn">Save</button>
//           <button className="cancel-btn" onClick={() => setShowAddCourse(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashbord;
