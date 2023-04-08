import React, { useEffect, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Details = () => {

  const {id} = useParams("");
  console.log(id);

  const [getuserData, setuserData] = useState([]);
  console.log(getuserData);

  const navigate = useNavigate();

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
        setuserData(data);
        console.log("Get Data");
    }
  }

  useEffect(()=>{
    getData();
  },[]);

  const deleteUser = async (id) => {

    const res2 = await fetch(`https://redpositive-cruds-backend.onrender.com/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deleteData = await res2.json();
    console.log(deleteData);

    if (res2.status === 422 || !deleteData) {
        console.log("ERROR");
    } else {
        console.log("User Deleted!");
        navigate('/')
    }
}

  return (
    <div className='conatiner mt-3' style={{ textAlign: 'center', justifyItems: 'center' }}>
      <h1 style={{ fontWeight: 400 }}>Hello , <span>{getuserData.name}</span></h1>
      <div >
        <Card sx={{ minWidth: 275 }} style={{ backgroundColor: '#F7F9F9 ' }} className="mt-5" variant="outlined">
          <CardContent>
            <AccountCircleIcon sx={{ fontSize: 80 }} />
            <h3 className='mt-3'>Name : <span style={{ fontWeight: 400 }}>{getuserData.name}</span></h3>
            <h3 className='mt-2'><ContactPhoneIcon sx={{ fontSize: 30 }} /> Phone Number : <span style={{ fontWeight: 400 }}>{getuserData.phone}</span></h3>
            <h3 className='mt-2'><EmailIcon sx={{ fontSize: 30 }} />Email : <span style={{ fontWeight: 400 }}>{getuserData.email}</span></h3>
            <h3 className='mt-2'>Hobbies : <span style={{ fontWeight: 400 }}>{getuserData.hobbies}</span></h3>
            <div className='mt-4'>
              <NavLink to={`/edit/${getuserData._id}`}><button type="" className="btn btn-primary mx-5"><ModeEditIcon /></button></NavLink>
              <button type="" onClick={()=>deleteUser(getuserData._id)} className="btn btn-danger"><DeleteIcon /></button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Details