import React, { useRef } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';

const TableRow = ({ element, id, deleteUser, selectedUsers, setSelectedUsers }) => {
    return (
        <>
            <tr>
                <th scope="row"><input className="form-check form-check-input " type="checkbox" value="" id="flexCheckDefault" 
                onChange={(event) => event.target.checked ? setSelectedUsers([...selectedUsers, element]) : setSelectedUsers(selectedUsers.filter((user)=>user._id !== element._id))} /></th>
                <td>{id + 1}</td>
                <td>{element.name}</td>
                <td>{element.phone}</td>
                <td>{element.email}</td>
                <td>{element.hobbies}</td>
                <td className="d-flex justify-content-between">
                    <NavLink to={`view/${element._id}`}><button type="" alt="Read" className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                    <NavLink to={`edit/${element._id}`}><button type="" className="btn btn-primary"><ModeEditIcon /></button></NavLink>
                    <button type="" onClick={() => deleteUser(element._id)} className="btn btn-danger"><DeleteIcon /></button>
                </td>
            </tr>
        </>
    )
}

export default TableRow