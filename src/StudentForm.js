import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPhone,
  faCalendarAlt,
  faHome,
  faMapMarkerAlt,
  faClipboardCheck,
  faUsers,
  faSchool,
  faEnvelope,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

const StudentForm = () => {
  const [serviceType, setServiceType] = useState('');
  const [contact, setContact] = useState({ name: '', mobile: '' });
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(120);
  const [intervalId, setIntervalId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Use a single state for the selected card
  const [isAgeValid, setIsAgeValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    educationQualification: '',
    otherQualification: '',
    yearOfPassing: '',
    interestedCourse: '',
    gender: '',
    referredBy: '',
    socialMedia: {
      linkedin: false,
      instagram: false,
      google: false,
      facebook: false
    },
    friend: ''
  });

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalId);
      alert("OTP expired. Please request a new one.");
      setShowModal(false);
    }
  }, [timer, intervalId]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = new Date() - birthDate;
    const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
    return age >= 0 ? age : '';
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setSentOtp(generatedOtp);
    alert(`OTP sent to ${contact.mobile}: ${generatedOtp}`);
    setTimer(60);
    setShowModal(true);

    const id = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    sendOtp();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === sentOtp) {
      clearInterval(intervalId);
      setIsVerified(true);
      setShowModal(false);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => {
      const updatedStudent = { ...prev, [name]: value };
      if (name === 'dateOfBirth') {
        updatedStudent.age = calculateAge(value);
      }
      return updatedStudent;
    });
  };

  const validateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  // Adjust age if the birth date has not occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    setIsAgeValid(age < 18);
  } else {
    setIsAgeValid(age >= 18);
  }
};


  const handleSocialMediaChange = (e) => {
    const { value } = e.target;
    setStudent((prev) => ({
      ...prev,
      socialMedia: {
        linkedin: value === 'linkedin',
        instagram: value === 'instagram',
        google: value === 'google',
        facebook: value === 'facebook'
      }
    }));
  };
  

  const resetForm = () => {
    setStudent({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      address: '',
      state: '',
      city: '',
      pincode: '',
      educationQualification: '',
      otherQualification: '',
      yearOfPassing: '',
      interestedCourse: '',
      gender: '',
      referredBy: '',
      socialMedia: {
        linkedin: false,
        instagram: false,
        google: false,
        facebook: false
      },
      friend: ''
    });
    // setContact({ name: '', mobile: '' });
    // setIsVerified(false);
    //  setServiceType('');
    
  };

  useEffect(() => {
    // Validate form on change
    const isValid = (
      student.firstName &&
      student.lastName &&
      student.dateOfBirth &&
      isAgeValid &&
      student.address &&
      student.state &&
      student.city &&
      student.pincode.match(/^\d{6}$/) && // Check pincode validity
      student.educationQualification &&
      (student.educationQualification !== 'Other' || student.otherQualification) &&
      student.yearOfPassing &&
      (student.yearOfPassing !== 'Complete' || student.yearOfCompletion) &&
      student.interestedCourse &&
      student.referredBy
    );
    setIsFormValid(isValid);
  }, [student, isAgeValid]);



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Details:', student);
    setShowSuccess(true);
    // resetForm();
  };

  const handleResendOtp = () => {
    sendOtp();
  };
 const handleServiceTypeSelect = (type) => {
  setServiceType(type);
};

const handleNextClick = () => {
  if (selectedCard) {
    // Proceed to show the contact form since service type is selected
    handleServiceTypeSelect()
    // Here, you can handle any additional actions you want to take
  } else {
    alert('Please select a service type.');
  }
};


// const FormValid = () => {
//   const { firstName, lastName, dateOfBirth, address, state, city, pincode, educationQualification, yearOfPassing, interestedCourse, referredBy } = student;
//   const isAgeValid = validateAge(dateOfBirth); // Assume this function returns a boolean
//   return (
//     firstName.match(/^[A-Za-z\s]+$/) &&
//     lastName.match(/^[A-Za-z\s]+$/) &&
//     isAgeValid &&
//     address &&
//     state &&
//     city &&
//     pincode.match(/^\d{6}$/) &&
//     educationQualification &&
//     yearOfPassing &&
//     interestedCourse &&
//     referredBy
//   );
// };

// useEffect(() => {
//   // Validation logic here
//   const isValid =
//     student.firstName &&
//     student.lastName &&
//     student.dateOfBirth &&
//     isAgeValid &&
//     student.gender &&
//     student.address &&
//     student.state &&
//     student.city &&
//     student.pincode.match(/^\d{6}$/) && // Valid pincode
//     student.educationQualification &&
//     (student.educationQualification !== 'Other' || student.otherQualification) &&
//     student.yearOfPassing &&
//     student.interestedCourse &&
//     student.referredBy &&
//     (student.referredBy !== 'Friend' || student.friend);
  
//   setIsFormValid(isValid);
// }, [student, isAgeValid]);

// Validate form function
const validateForm = () => {
  // Check if all required fields are filled
  const isValid = student.firstName && student.lastName && student.dateOfBirth && student.age &&
                  student.gender && student.address && student.state && student.city &&
                  student.pincode && student.educationQualification &&
                  (student.educationQualification !== 'Other' || student.otherQualification) &&
                  student.yearOfPassing &&
                  (student.yearOfPassing !== 'Complete' || student.yearOfCompletion) &&
                  student.interestedCourse && student.referredBy &&
                  (student.referredBy !== 'Social' || student.socialMedia) &&
                  (student.referredBy !== 'Friend' || student.friend);
  
  setIsFormValid(isValid);
};

// useEffect to run validation whenever fields change
useEffect(() => {
  validateForm();
}, [student]);

const handleCardClick = (cardType) => {
  setSelectedCard(cardType);
};
return (
  <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
    <div className="bg-white p-4 rounded shadow" style={{ width: '500px' }}>
      {!isVerified ? (
        serviceType === '' ? (
          // Service type selection
          <div className="text-center">
            <h5>Select Service Type</h5>
            <div className="d-flex justify-content-center mt-3">
            <div
        className={`card me-3 ${selectedCard === 'Training' ? 'selected-card' : ''}`}
        style={{ width: '18rem', cursor: 'pointer',

         }}
        onClick={() => handleCardClick('Training')}
      >
        <img src="./training.png" className="card-img-top" alt="Training" style={{ height: '150px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">Training</h5>
        </div>
      </div>
      <div
        className={`card me-3 ${selectedCard === 'Development' ? 'selected-card' : ''}`}
        style={{ width: '18rem', cursor: 'pointer'}}
        onClick={() => handleCardClick('Development')}
      >
        <img src="./development.png" className="card-img-top" alt="Development" style={{ height: '150px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">Development</h5>
        </div>
      </div>
            </div>
            <div className="mt-4">
              <button 
                className="btn btn-success" 
                onClick={handleNextClick}
                disabled={!selectedCard} // Disable button until an option is selected

              >
                Next
              </button>
            </div>
          </div>
        ):(
            <div>
              <h5 className="text-center">Enter Contact Details</h5>
              <form onSubmit={handleContactSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <FontAwesomeIcon icon={faUser} /> Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={contact.name}
                    onChange={handleContactChange}
                    required
                    pattern="[A-Za-z\s]+"
                    title="Please enter a valid name (letters and spaces only)"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <FontAwesomeIcon icon={faPhone} /> Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={contact.mobile}
                    onChange={handleContactChange}
                    required
                    pattern="\d{10}"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
                <button type="submit" className="btn btn-primary"
          disabled={!contact.name || !contact.mobile.match(/^\d{10}$/)} // Disable button until both fields are filled correctly

                >Send OTP</button>
              </form>
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 className="text-center">Student Form</h4>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">
                  <FontAwesomeIcon icon={faUser} /> First Name
                </label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
      className={`form-control ${isAgeValid ? '' : 'is-invalid'}`} // Add invalid class if age is not valid
      name="dateOfBirth"
      value={student.dateOfBirth}
      onChange={(e) => {
        const dob = e.target.value;
        handleChange(e); // Call your original change handler
        validateAge(dob); // Validate age
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
            style={{ marginRight: '5px' }} // Adjust spacing between input and icon
          />
          <i className="fas fa-male" style={{ fontSize: '30px', marginRight: '5px' }}></i> Male
        </label>

        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={student.gender === 'Female'}
            onChange={handleChange}
            required
            style={{ marginRight: '5px' }} // Adjust spacing between input and icon
          />
          <i className="fas fa-female" style={{ fontSize: '30px', marginRight: '5px' }}></i> Female
        </label>
      </div>
    </div>
  </div>
</div>


            <div className="mb-3">
              <label className="form-label">
                <FontAwesomeIcon icon={faHome} /> Address
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={student.address}
                onChange={handleChange}
                required
              />
            </div>
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
  style={{borderRadius:'35px'}}
>
  <option value="" style={{borderRadius:'35px'}}>Select a state</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
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
  style={{borderRadius:'35px'}}
>
  <option value=""  style={{borderRadius:'35px'}}>Select a city</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Pune">Pune</option>
  <option value="Nagpur">Nagpur</option>
  <option value="Nashik">Nashik</option>
  <option value="Aurangabad">Aurangabad</option>
  {/* Add more cities as needed */}
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
            <div className="mb-3">
              <label className="form-label">
                <FontAwesomeIcon icon={faSchool} /> Educational Qualification
              </label>
              <select style={{borderRadius:'35px'}}
                name="educationQualification"
                className="form-select"
                value={student.educationQualification}
                onChange={handleChange}
                required
              >
                <option value="" style={{borderRadius:'35px'}}>Select</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Graduate">Graduate</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {student.educationQualification === 'Other' && (
              <div className="mb-3">
                <label className="form-label">Specify Other Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  name="otherQualification"
                  value={student.otherQualification}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="mb-3">
  <label className="form-label">
    <FontAwesomeIcon icon={faClipboardCheck} /> Education Status
  </label>
  <select
    style={{ borderRadius: '35px' }}
    name="yearOfPassing"
    className="form-select"
    value={student.yearOfPassing}
    onChange={handleChange}
    required
  >
    <option value="" style={{ borderRadius: '35px' }}>Select</option>
    <option value="Complete">Complete</option>
    <option value="Pursuing">Pursuing</option>
    <option value="Drop-off">Drop-off</option>
  </select>
</div>

{student.yearOfPassing === "Complete" && (
  <div className="mb-1">
    <label className="form-label">
      Year of Completion
    </label>
    <input
      type="text"
      className="form-control"
      name="yearOfCompletion"
      value={student.yearOfCompletion}
      onChange={handleChange}
      required
    />
  </div>
)}

            <div className="mb-1">
              <label className="form-label">
                <FontAwesomeIcon icon={faClipboardCheck} /> Interested Course
              </label>
              <select style={{borderRadius:'35px'}}
                name="interestedCourse"
                className="form-select"
                value={student.interestedCourse}
                onChange={handleChange}
                required
              >
                <option value="" style={{borderRadius:'35px'}}> Select</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Web Developer">Web Developer</option>
              </select>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label" >  
                  <FontAwesomeIcon icon={faLink} /> Referred By
                </label>
                <select style={{borderRadius:'35px'}}
                  name="referredBy"
                  className="form-select"
                  value={student.referredBy}
                  onChange={handleChange}
                  required
                >
                  <option value="" style={{borderRadius:'35px'}}>Select</option>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Social">Social</option>
                  <option value="Friend">Friend</option>
                </select>
              </div>
              </div>

              {student.referredBy === 'Social' && (
  <div className="mb-3">
    <label className="form-label">Select Social Media Links</label>
    <div>
      <label style={{ marginRight: '10px', cursor: 'pointer' }}>
        <input
          type="radio"
          name="socialMedia"
          value="linkedin"
          checked={student.socialMedia.linkedin}
          onChange={handleSocialMediaChange}
          style={{ marginRight: '5px' }}
        />
        <img src="./linkdin.png" alt="LinkedIn" style={{ width: '45px', marginLeft: '5px' }} />
      </label>
      
      <label style={{ marginRight: '10px', cursor: 'pointer' }}>
        <input
          type="radio"
          name="socialMedia"
          value="instagram"
          checked={student.socialMedia.instagram}
          onChange={handleSocialMediaChange}
          style={{ marginRight: '5px' }}
        />
        <img src="./instragram.png" alt="Instagram" style={{ width: '50px', marginLeft: '5px' }} />
      </label>

      <label style={{ marginRight: '10px', cursor: 'pointer' }}>
        <input
          type="radio"
          name="socialMedia"
          value="google"
          checked={student.socialMedia.google}
          onChange={handleSocialMediaChange}
          style={{ marginRight: '5px' }}
        />
        <img src="./image.png" alt="Google" style={{ width: '50px', marginLeft: '5px' }} />
      </label>

      <label style={{ marginRight: '10px', cursor: 'pointer' }}>
        <input
          type="radio"
          name="socialMedia"
          value="facebook"
          checked={student.socialMedia.facebook}
          onChange={handleSocialMediaChange}
          style={{ marginRight: '5px' }}
        />
        <img src="./facebook.png" alt="Facebook" style={{ width: '50px', marginLeft: '5px' }} />
      </label>
    </div>
  </div>
)}

            {student.referredBy === 'Friend' && (
              <div className="mb-3">
                <label className="form-label">
                  <FontAwesomeIcon icon={faUser} /> Friend's Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="friend"
                  value={student.friend}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Please enter a valid name (letters and spaces only)"
                />
              </div>
            )}
            <div className="d-flex justify-content-between mt-3 ">
              <button type="button" className="btn btn-secondary me-3" onClick={resetForm}>Reset</button>
              <button type="submit" className="btn btn-primary "disabled={!isFormValid} >Submit</button>
              {/* disabled={!isFormValid} */}

            </div>
          </form>
        )}

      {/* OTP Modal */}
{showModal && (
  <div className="modal show" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Enter OTP</h5>
          <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label">OTP</label>
                <p className="mb-0">
                  Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={handleOtpChange}
                required
              />
              <div className="d-grid gap-1 mt-1  justify-content-md-end">
                <a 
                  href="#!" 
                  className="text-primary text-decoration-none" 
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button type="button" className="btn btn-danger me-5" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary"
                                    disabled={!otp} // Disable button until OTP is entered

              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}


<div className="form-container" style={{ position: 'relative', padding: '20px' }}>
  {/* Your form elements go here */}

  {/* Success Popup Modal */}
  {showSuccess && (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    }}>
      <div
        className="modal-content"
        style={{
          background: '#fff',
          padding: '20px',
          width: '400px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h5>Form Submitted Successfully!</h5>
        <p>Your form has been submitted.</p>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              resetForm(); // Reset the form
              setShowSuccess(false); // Hide the modal
              setServiceType(''); // Optionally reset the service type
              setContact({ name: '', mobile: '' });
              setIsVerified(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )}
</div>




      </div>
    </div>
  );
};

export default StudentForm;
