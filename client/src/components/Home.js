import React, { useEffect, useState, useContext, useRef } from 'react';
import { addData, deleteData, updateData } from './context/ContextProvider';
import emailjs from 'emailjs-com';
import { Checkbox } from '@mui/material';
import TableRow from './TableRow';


const Home = () => {

    const { udata, setUdata } = useContext(addData);

    const { updata, setUpdata } = useContext(updateData);

    const { deldata, setDeldata } = useContext(deleteData);

    const [getuserData, setuserData] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);


    const getData = async (e) => {

        const res = await fetch('https://redpositive-cruds-backend.onrender.com/getdata', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("ERROR");
        } else {
            setuserData(data);
        }
    }



    const sendData = () => {
        var users = "";
        for (let i = 0; i < selectedUsers.length; i++) {
            users += selectedUsers[i].name + " " + selectedUsers[i].phone + " " + selectedUsers[i].email + " " + selectedUsers[i].hobbies + "\n";
        }

        // setTimeout(() => {
        //     setSelectedUsers("");
        // }, 3000);
        var templateParams = {
            users: users,
        };

        // emailjs.send('service_kunfsyl', 'template_lewh2wq', templateParams, 'nd4K_Db0mDZIMFLfN')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });

        alert("Selected Data Send Successfully!!");

    }

    useEffect(() => {
        getData();
    }, []);

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
            setDeldata(deleteData);
            getData();
        }
    }


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong> Added Successfully!!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ''
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong> Updated Successfully!!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ''
            }
            {
                deldata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{deldata.name}</strong> Deleted Successfully!!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ''
            }
            {/* {
                selectedUsers ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{selectedUsers.name}</strong>'s Data Send Successfully!!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ''
            } */}


            <div className='mt-5'>
                <div className='conatainer'>
                    <div className='add_btn mt-2'>
                        <a alt="Click to Add Data" href="/register" className='btn btn-primary'>Add Data</a>
                    </div>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr className="table-dark">
                                    <th scope="col">Select</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Hobbies</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    getuserData.map((element, id) => {
                                        return (
                                            <TableRow element={element} id={id} deleteUser={deleteUser} key={id} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='add_btn mt-5'>
                            <button alt="Send data in mail" className='btn btn-primary' disabled={selectedUsers.length === 0} onClick={sendData}>Send Data</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home