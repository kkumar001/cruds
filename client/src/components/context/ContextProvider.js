import React, { createContext, useState } from 'react';

export const addData = createContext("");
export const updateData = createContext("");
export const deleteData = createContext("");

const ContextProvider = ({ children }) => {

    const [udata, setUdata] = useState("");
    const [updata, setUpdata] = useState("");
    const [deldata, setDeldata] = useState("");

    return (
        <addData.Provider value={{ udata, setUdata }}>
            <updateData.Provider value={{ updata, setUpdata }}>
                <deleteData.Provider value={{ deldata, setDeldata }}>
                    {children}
                </deleteData.Provider>
            </updateData.Provider>
        </addData.Provider>
    )
}

export default ContextProvider;