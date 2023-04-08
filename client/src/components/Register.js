import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addData } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(addData);

    const navigate = useNavigate();

    const [inpVal, setInp] = useState({
        name: "",
        phone: "",
        email: "",
        hobbies: ""
    })

    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setInp((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addInpData = async (e) => {
        e.preventDefault();

        const { name, phone, email, hobbies } = inpVal;

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, phone, email, hobbies
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("ERROR");
            console.log("ERROR");
        } else {
            navigate('/');
            setUdata(data);
            console.log("Data Added");

        }
    }

    return (
        <div className='conatiner my-5 mx-5'>
            <form >
                <div className='row justify-content-center'>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="Name" className="form-label">Name</label>
                        <input type="text" name="name" onChange={setData} value={inpVal.name} className="form-control" id="Name" required />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="typePhone" className="form-label">Phone Number</label>
                        <input type="tel" id="typePhone" name="phone" onChange={setData} value={inpVal.phone} className="form-control" required />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="InputEmail" className="form-label">Email</label>
                        <input type="email" name="email" onChange={setData} value={inpVal.email} className="form-control" id="InputEmail" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="hobbies" className="form-label">Hobbies</label>
                        <input type="textarea" name="hobbies" onChange={setData} value={inpVal.hobbies} className="form-control" id="hobbies" required />
                    </div>
                    {/* <button type="submit" onClick={addInpData} className="btn btn-primary btn-sm">Submit</button> */}
                </div>
                <div className='add_btn mt-1'>
                    <button type="submit" onClick={addInpData} className="btn btn-primary btn-lg">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register