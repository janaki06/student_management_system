// Importing required libraries and hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Defining a functional component called 'Home'
function Home() {
  // initializing state variable
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Using the useEffect hook to fetch data from the API endpoint
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Defining a function called 'handleSearch' to filter/search for student records
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((student) => {
    const name = `${student.FirstName} ${student.LastName}`;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // function to handle delete button click
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (confirmDelete) {
      axios
        .delete("http://localhost:8081/delete/" + id) // Sending a DELETE request to the API endpoint to delete the record
        .then((res) => {
          setData(data.filter((student) => student.ID !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center wholepage">
      <div className="w-100 w-lg-75 rounded p-3">
        <h3 className="title">Student management system</h3>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="d-flex">
            <Link to="/create" className="btn btn-dark icon mr-2">
              ADD
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Location</th>
                <th>email</th>
                <th>DOB</th>
                <th>Education</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => {
                const dob = new Date(student.DOB);
                const formattedDOB = dob.toLocaleDateString("en-GB");
                return (
                  <tr key={index}>
                    <td>{student.ID}</td>
                    <td>{student.FirstName}</td>
                    <td>{student.LastName}</td>
                    <td>{student.Location}</td>
                    <td>{student.email}</td>
                    <td>{formattedDOB}</td>
                    <td>{student.Education}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="bi bi-person"></span>
                        <span className="bi bi-pencil-fill font-size-1.5rem margin-left--0.5rem"></span>
                        <Link
                          to={"/edit/" + student.ID}
                          className="btn btn-light ml-2"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="bi bi-trash"></span>
                        <button
                          onClick={() => handleDelete(student.ID)}
                          className="btn btn-light ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
