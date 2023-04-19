// Importing required libraries and hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

// defining a functional component called 'Update'
function Update() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    location: "",
    email: "",
    dob: "",
    education: "",
  });

  const { id } = useParams();

  // Using the useEffect hook to fetch data from the API endpoint
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        setValues((prevValues) => ({
          ...prevValues,
          firstname: res.data.Result[0].FirstName,
          lastname: res.data.Result[0].LastName,
          location: res.data.Result[0].Location,
          email: res.data.Result[0].email,
          dob: res.data.Result[0].DOB,
          education: res.data.Result[0].Education,
        }));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    const { firstname, lastname, location, email, dob, education } = values;

    // convert date format to MySQL format
    const dobMySQL = moment(dob).format("YYYY-MM-DD");

    axios
      .put(`http://localhost:8081/update/${id}`, {
        firstname,
        lastname,
        location,
        email,
        dob: dobMySQL,
        education,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createelement">
      <form onSubmit={handleUpdate} className="form-inline">
        <br />
        <br />
        <div className="form-group">
          <label htmlFor="firstName" className="col-md-1 ">
            FirstName:
          </label>
          <input
            id="firstName"
            type="text"
            className="col-md-3"
            onChange={(e) =>
              setValues({ ...values, firstname: e.target.value })
            }
            value={values.firstname || ""}
          />{" "}
          <label htmlFor="LastName" className="col-md-1">
            LastName:
          </label>
          <input
            id="LastName"
            type="text"
            className="col-md-3"
            onChange={(e) => setValues({ ...values, lastname: e.target.value })}
            value={values.lastname || ""}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="location" className="col-md-1">
            Location:
          </label>
          <input
            id="location"
            type="text"
            className="col-md-3"
            onChange={(e) => setValues({ ...values, location: e.target.value })}
            value={values.location || ""}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email" className="col-md-1">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="col-md-3"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            value={values.email || ""}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="dateOfBirth" className="col-md-1">
            DOB:
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="col-md-1"
            onChange={(e) => setValues({ ...values, dob: e.target.value })}
            value={values.dob || ""}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="education" className="col-md-1">
            Education:
          </label>
          <input
            id="education"
            type="text"
            className="col-md-3"
            onChange={(e) =>
              setValues({ ...values, education: e.target.value })
            }
            value={values.education || ""}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="about" className="col-md-1">
            About:
          </label>
          <input id="about" type="text" className="col-md-3 aboutwidth"></input>
        </div>
        <br />

        <button className="btn btn-dark icon submit"> Submite</button>
      </form>
    </div>
  );
}

export default Update;
