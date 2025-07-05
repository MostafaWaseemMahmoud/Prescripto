import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createdoctoraccount.css';

const CreateDoctorAccount = () => {
    const navigate = useNavigate();
    const formData = new FormData();
    const [jobTypes,setJobTypes] = useState([]);
    const [selectedJob , SetselectedJob] = useState();
    const [emails,setemails] = useState();
    const [isLoading,setisLoading] = useState();
    useEffect(() => {
        const fetchJobTypes = async () => {
            try {
                const res = await axios.get("https://prescripto-back-end.vercel.app/def/page");
                setJobTypes(res.data.types || []);
            } catch (error) {
                console.error("Error fetching job types:", error);
                alert("Failed to load The Doctor Join Page Pls Try Again Later.");
            }
        };
        fetchJobTypes();
        const fetchDoctorsEmails = async ()=> {
            try {
                const res = await axios.get("https://prescripto-back-end.vercel.app/mng/alldoctors");
                setemails(res.data || []);
            } catch (error) {
                console.error("Error fetching job types:", error);
                alert("Failed to load The Doctor Join Page Pls Try Again Later.");
            }
        }
        fetchDoctorsEmails();
    }, []);

    const validateForm = async () => {
        // Validate form
        const allFields = document.querySelectorAll("input");
        const allErrors = document.querySelectorAll(".error");

        // Validate The UserName Field =>

        if(allFields[0].value.length < 3){
            allErrors[0].style.display = "flex"
            allFields[0].style.color = "unset"
            return;
        }else {
            allErrors[0].style.display = "none"
            allFields[0].style.color = "green";
            formData.append('username' , 'mostafa')
        }

        // Validate The Email Field =>

            if(allFields[1].value.length < 5 || !allFields[1].value.match(/\w+(\d+)?@gmail.com/)){
                allErrors[1].style.display = "flex"
                allFields[1].style.color = "unset"
                return;
            }else {
                try {
                    let emailExists = false;
                    for (const doctor of emails) {
                        if (allFields[1].value === doctor.email) {
                            emailExists = true;
                            break;
                        }
                    }

                    if (emailExists) {
                        allErrors[1].childNodes[1].textContent = "This email already exists.";
                        allErrors[1].style.display = "flex";
                        allFields[1].style.color = "unset";
                        return;
                    }

                    // If email is valid and doesn't exist
                    allErrors[1].style.display = "none";
                    allFields[1].style.color = "green";
                    formData.append('email', allFields[1].value);

                } catch (error) {
                    // Handle API errors
                    console.error("Error fetching doctors:", error);
                    allErrors[1].childNodes[1].textContent = "Unable to validate email at the moment. Please try again later.";
                    allErrors[1].style.display = "flex";
                    allFields[1].style.color = "unset";
                }
            }

            // Validate The PhoneNumber Field =>

                if(!allFields[2].value.length == 11 || !allFields[2].value.match(/010\d\d\d\d\d\d\d\d/)){
                    allErrors[2].style.display = "flex"
                    allFields[2].style.color = "unset"
                    return;
                }else {
                    allErrors[2].style.display = "none"
                    allFields[2].style.color = "green"
                    formData.append('phonenumber' , allFields[2].value)
                }

                // Validate The Password Field =>
                    if(allFields[3].value.length > 7){
                        allErrors[3].style.display = "none"
                        allFields[3].style.color = "green"
                        formData.append('password' , allFields[3].value)
                    }else {
                        allFields[3].style.color = "unset"
                        allErrors[3].style.display = "flex"
                        return;
                    }

                // Validate The Field Age Field =>
                    if(allFields[4].value < 18 || allFields[4].value.length < 1){
                        allFields[4].style.color = "unset"
                        allErrors[4].style.display = "flex"
                        return;
                    }else {
                        allErrors[4].style.display = "none"
                        allFields[4].style.color = "green"
                        formData.append('age' , allFields[4].value)
                    }

                // Validate The Appoinment Prise Field =>
                    if(allFields[5].value.length == 0){
                        allFields[5].style.color = "unset"
                        allErrors[5].style.display = "flex"
                        return;
                    }else {
                        allErrors[5].style.display = "none"
                        allFields[5].style.color = "green"
                        formData.append('appoimentPrise' , allFields[5].value)
                    }
                    // Validate The About Field =>
                    if(allFields[6].value.length < 10){
                        allFields[6].style.color = "unset"
                        allErrors[6].style.display = "flex"
                        return;
                    }else {
                        allErrors[6].style.display = "none"
                        allFields[6].style.color = "green"
                        formData.append('about' , allFields[6].value)
                    }

                    // Validate The Location Field =>
                    if(allFields[7].value.length == 0){
                            allFields[7].style.color = "unset"
                            allErrors[7].style.display = "flex"
                            return;
                        }else {
                            allErrors[7].style.display = "none"
                            allFields[7].style.color = "green"
                            formData.append('locatoin' , allFields[7].value)
                        }
                        // Validate The Job Selection Field =>
                            const selection = document.querySelector("select");
                        console.log(selection.value == '');

                        if (selection.value === '') {
                            allErrors[8].style.display = "flex"
                            selection.style.color = "unset"
                            return;
                        }else {
                            allErrors[8].style.display = "none"
                            selection.style.color = "green"
                            formData.append('job' , selection.value)
                        }

                        // validate Profile Pic Field =>
                    const IMAGE_FIELD = document.querySelector(".field1 input")
                        const IMAGE_LABEL = document.querySelector("#profile-image")
                        console.log(IMAGE_FIELD.files);
                    if(IMAGE_FIELD.files.length == 0) {
                        IMAGE_LABEL.textContent = "Pls Upload An Profile Pic"
                        IMAGE_LABEL.style.color = "red";
                        return
                    }else {
                        IMAGE_LABEL.textContent = "Image Uploaded"
                        IMAGE_LABEL.style.color = "green";
                        formData.append('profilePicUrl', IMAGE_FIELD.files[0]);
                    }
                    const formData1 = new FormData();
                    formData1.append("username", allFields[0].value);
                    formData1.append("email", allFields[1].value);
                    formData1.append("job", selection.value);
                    formData1.append("phonenumber", allFields[2].value);
                    formData1.append("password", allFields[3].value);
                    formData1.append("age", allFields[4].value);
                    formData1.append("profilePic", IMAGE_FIELD.files[0]);
                    formData1.append("appoimentprise", allFields[5].value);
                    formData1.append("about", allFields[6].value);
                    formData1.append("locatoin", allFields[7].value);
                    // Submit Form
                    for (const [key, value] of formData1.entries()) {
                        console.log(`${key}:`, value);
                    }
        try {
            setisLoading(true);
            axios.post(
                "https://prescripto-back-end.vercel.app/signup/doctor",
                formData1,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ).then((res)=>{
                console.log(res);
                document.querySelector(".message").style.display = "flex"
            }).catch((e)=> {
                console.log(e);
                setisLoading(false);
                document.querySelector(".message").textContent = "Error Whiile Sending Email"
                document.querySelector(".message").style.display = "flex"
            })
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
        }
    setisLoading(false);
    };

    const handelImageUpload = ()=> {
        const IMAGE_FIELD = document.querySelector(".field1 input")
        const IMAGE_LABEL = document.querySelector("#profile-image")
        console.log(IMAGE_FIELD.files);
        if(IMAGE_FIELD.files.length == 0) {
            IMAGE_LABEL.textContent = "Pls Upload An Profile Pic"
            IMAGE_LABEL.style.color = "red";
            return
        }else {
            IMAGE_LABEL.textContent = "Image Uploaded"
            IMAGE_LABEL.style.color = "green";
            return;
        }
    }

    return (
        <>
        <div className="message" onClick={()=>{document.querySelector(".message").style.display = "none"; navigate('/')}}>
            Your Details Was Sending Succ To The
            Admin Pls Wait The Accepet Email
        </div>
        <div className='container'>
            <div className="create-doctor-contaiener">
                <div className="login-field">
                    <div className="login">
                        <h1>Create Doctor Account</h1>
                        <p>Please sign up as a doctor to start working.</p>
                        <form>
                            <div className="field">
                                <span>Name</span>
                                <input type="text" />
                            <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>PLease Inter A Real Name</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>Email</span>
                                <input type="email" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>PLease Inter Avalid Email</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>Phone Number</span>
                                <input type="number" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>PLease Inter Avalid Phone Number</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>password</span>
                                <input type="password" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>PLease Inter Avalid Password</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>Age</span>
                                <input type="number" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>Are Your Age Less Than 18 ??</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>Appoinment Prise</span>
                                <input type="number" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>Please Fill This Field</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>About</span>
                                <input type="text" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>Please Enter Your Small About</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>Location</span>
                                <input type="text" />
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>Please Fill Your Location</span>
                            </div>
                            </div>
                            <div className="field">
                                <span>Job</span>
                                <select
                                    value={selectedJob}
                                    onChange={(e) => SetselectedJob(e.target.value)}
                                >
                                    <option value="">Select a job type</option>
                                    {jobTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ) )}
                                </select>
                                <div className="error">
                                <div className="red-dot">
                                </div>
                                <span>Please Fill Your Job Detials</span>
                            </div>
                            </div>
                            <div className="field1">
                                <label id='profile-image' htmlFor="fileField">Upload Profile Image</label>
                                <input type="file" onChange={handelImageUpload} id="fileField" />
                            </div>
                            <button type="button" onClick={validateForm}>
                                Create Doctor Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
                                    </>
    );
};

export default CreateDoctorAccount;
