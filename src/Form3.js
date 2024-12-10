import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faUsers, faHome, faMapMarkerAlt, faSchool, faClipboardCheck, faLink } from '@fortawesome/free-solid-svg-icons';

const Form3 = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    educationQualification: '',
    otherQualification: '',
    yearOfPassing: '',
    yearOfCompletion: '',
    interestedCourse: '',
    referredBy: '',
    socialMedia: {
      linkedin: false,
      instagram: false,
      google: false,
      facebook: false,
    },
    friend: '',
    reason: ''
  });

  const [isAgeValid, setIsAgeValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [states, setStates] = useState([]); // Fetch state list
  const [cities, setCities] = useState([]); // Fetch city list based on selected state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Example fetch data for states (you can replace this with actual API call)
    setStates(['State 1', 'State 2', 'State 3']);
  }, []);

  useEffect(() => {
    // Example fetch data for cities (you can replace this with actual API call)
    if (student.state) {
      setLoading(true);
      setTimeout(() => {
        setCities(['City 1', 'City 2', 'City 3']);
        setLoading(false);
      }, 1000);
    }
  }, [student.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, checked } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      socialMedia: {
        ...prevStudent.socialMedia,
        [name]: checked
      }
    }));
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setIsAgeValid(false);
    } else {
      setIsAgeValid(true);
      setStudent((prevStudent) => ({
        ...prevStudent,
        age
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send data to the server)
    console.log('Form submitted:', student);
  };

  const resetForm = () => {
    setStudent({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      address: '',
      state: '',
      city: '',
      pincode: '',
      educationQualification: '',
      otherQualification: '',
      yearOfPassing: '',
      yearOfCompletion: '',
      interestedCourse: '',
      referredBy: '',
      socialMedia: {
        linkedin: false,
        instagram: false,
        google: false,
        facebook: false,
      },
      friend: '',
      reason: ''
    });
    setIsAgeValid(true);
    setIsFormValid(false);
  };

  const handleReasonChange = (e) => {
    const { value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      reason: value
    }));
  };

  // Form validation check (enable submit button only if all required fields are filled correctly)
  useEffect(() => {
    const isValid = Object.values(student).every(value => value !== '' && value !== null);
    setIsFormValid(isValid && isAgeValid);
  }, [student, isAgeValid]);

  return (
    <div id="form3">
      <form onSubmit={handleSubmit}>
        <h4 className="text-center">Student Form</h4>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faUser} /> First Name
            </label>
            <input
              type="text"
              className="form-control input-truncate"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="Please enter a valid name (letters and spaces only)"
            />
          </div>
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faUser} /> Last Name
            </label>
            <input
              type="text"
              className="form-control input-truncate"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="Please enter a valid name (letters and spaces only)"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth
            </label>
            <input
              type="date"
              className={`form-control ${isAgeValid ? '' : 'is-invalid'}`}
              name="dateOfBirth"
              value={student.dateOfBirth}
              onChange={(e) => {
                const dob = e.target.value;
                handleChange(e);
                validateAge(dob);
              }}
              required
            />
            {!isAgeValid && <div className="invalid-feedback">You must be at least 18 years old.</div>}
          </div>
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faUsers} /> Age
            </label>
            <input
              type="text"
              className="form-control"
              name="age"
              value={student.age}
              readOnly
              disabled
              style={{
                outline: 'none',
                caretColor: 'transparent',
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex align-items-center">
              <label className="form-label mb-0 me-3">Gender</label>
              <div className="d-flex align-items-center">
                <label style={{ marginRight: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={student.gender === 'Male'}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '5px' }}
                  />
                  <img
                    src={require('./Male-icon (1).svg').default}
                    alt="Male Icon"
                    style={{ width: "20px", height: "20px", marginRight: "5px" }}
                  />
                  Male
                </label>

                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={student.gender === 'Female'}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '5px' }}
                  />
                  <img
                    src={require('./woman-female-icon (1).svg').default}
                    alt="Female Icon"
                    style={{ width: "20px", height: "20px", marginRight: "5px" }}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faHome} /> Address
          </label>
          <textarea
            className="form-control"
            name="address"
            value={student.address}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Enter your address"
          ></textarea>
        </div>

        {/* State and City */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> State
            </label>
            <select
              className="form-control"
              name="state"
              value={student.state}
              onChange={handleChange}
              required
              style={{ borderRadius: '35px' }}
            >
              <option value="" style={{ borderRadius: '35px' }}>
                Select a State
              </option>
              {error ? (
                <option value="">{error}</option>
              ) : (
                states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> City
            </label>
            <select
              className="form-control"
              name="city"
              value={student.city}
              onChange={handleChange}
              required
              style={{ borderRadius: '35px' }}
            >
              <option value="" style={{ borderRadius: '35px' }}>
                Select a City
              </option>
              {loading && <option value="">Loading cities...</option>}
              {error && <option value="">{error}</option>}
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Pincode
            </label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={student.pincode}
              onChange={handleChange}
              required
              pattern="\d{6}"
              title="Please enter a valid 6-digit pincode"
            />
          </div>
        </div>

        {/* Educational Qualification */}
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faSchool} /> Educational Qualification
          </label>
          <input
            type="text"
            className="form-control"
            name="educationQualification"
            value={student.educationQualification}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faClipboardCheck} /> Year of Passing
            </label>
            <input
              type="text"
              className="form-control"
              name="yearOfPassing"
              value={student.yearOfPassing}
              onChange={handleChange}
              required
              pattern="\d{4}"
              title="Please enter a valid 4-digit year"
            />
          </div>
          <div className="col">
            <label className="form-label">
              <FontAwesomeIcon icon={faClipboardCheck} /> Year of Completion
            </label>
            <input
              type="text"
              className="form-control"
              name="yearOfCompletion"
              value={student.yearOfCompletion}
              onChange={handleChange}
              required
              pattern="\d{4}"
              title="Please enter a valid 4-digit year"
            />
          </div>
        </div>

        {/* Referred by */}
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faLink} /> Referred By
          </label>
          <input
            type="text"
            className="form-control"
            name="referredBy"
            value={student.referredBy}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reason */}
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faLink} /> Reason for Interest
          </label>
          <textarea
            className="form-control"
            name="reason"
            value={student.reason}
            onChange={handleReasonChange}
            required
            rows="3"
            placeholder="Why are you interested?"
          ></textarea>
        </div>

        {/* Social Media */}
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faLink} /> Social Media Presence
          </label>
          <div>
            <label className="me-3">
              <input
                type="checkbox"
                name="linkedin"
                checked={student.socialMedia.linkedin}
                onChange={handleSocialMediaChange}
              />
              LinkedIn
            </label>
            <label className="me-3">
              <input
                type="checkbox"
                name="instagram"
                checked={student.socialMedia.instagram}
                onChange={handleSocialMediaChange}
              />
              Instagram
            </label>
            <label className="me-3">
              <input
                type="checkbox"
                name="google"
                checked={student.socialMedia.google}
                onChange={handleSocialMediaChange}
              />
              Google
            </label>
            <label>
              <input
                type="checkbox"
                name="facebook"
                checked={student.socialMedia.facebook}
                onChange={handleSocialMediaChange}
              />
              Facebook
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={resetForm}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Form3;
