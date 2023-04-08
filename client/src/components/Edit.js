import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateData } from './context/ContextProvider';



const Edit = () => {

    // const [getuserData, setuserData] = useState([]);
    // console.log(getuserData);

    const { updata, setUpdata } = useContext(updateData);

    const navigate = useNavigate('');

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

    const { id } = useParams("");
    console.log(id);

    const getData = async () => {

        const res = await fetch(`https://redpositive-cruds-backend.onrender.com/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("ERROR");
        } else {
            setInp(data);
            console.log("Get Data");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();

        const { name, phone, email, hobbies } = inpVal;

        const res2 = await fetch(`https://redpositive-cruds-backend.onrender.com/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, phone, email, hobbies
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert("Fill the Data")
        } else {
            navigate('/');
            setUpdata(data2);
        }
    }

    return (
        <div className='conatiner mt-5 mx-5'>
            <form mt-4>
                <div className='row'>
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
                    <div className='add_btn'>
                        <button type="submit" onClick={updateUser} className="btn btn-primary btn-lg">Submit</button>
                    </div>
                    {/* <button type="submit" onClick={updateUser} className="btn btn-primary">Submit</button> */}
                </div>
            </form>
        </div>
    )
}

export default Edit