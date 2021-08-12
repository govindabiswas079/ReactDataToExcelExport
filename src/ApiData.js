import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import data from './data';

import ReactHtmlTableToExcel from 'react-html-table-to-excel';

const ApiData = () => {
    const [users, setUsers] = useState([]);



    var config = {
        method: 'get',
        url: 'http://localhost:3001/users',
        headers: { 'content-type': 'appication-json' }
    };

    const UserData = async () => {
        axios(config)
            .then(function (respons) {
                console.log(JSON.stringify(respons.data));
                setUsers(respons.data);
            })
            .catch(function (error) {
                console.log(error)
            });

    }

    /* const UserData = async () => {
        const result = await axios.get('http://localhost:3001/users');
        setUsers(result.data);
        

    } */

    useEffect(() => {
        UserData();
    }, []);

    const deleteUsers = async id => {
        await axios.delete(`http://localhost:3001/users/${id}`);
        UserData();
    };

    return (
        <div className="py-4 container">
            <h1 className="text-center text-info mt-3">All User's</h1>
            <div className="row justify-content-center">
                <table className="table table-striped" id="data-table">
                    <thead>
                        <tr>
                            <td>Sr.</td>
                            <td>Name</td>
                            <td>User Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Website</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((items, index) => (
                            <tr key={index}>
                                <td>{items.id}</td>
                                <td>{items.name}</td>
                                <td>{items.username}</td>
                                <td>{items.email}</td>
                                <td>{items.phone}</td>
                                <td>{items.website}</td>
                                <td>
                                    <button className="btn btn-outline-primary" onClick={() => deleteUsers(items.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactHtmlTableToExcel
                    className="btn btn-info"
                    table="data-table"
                    filename="Data Excel File"
                    sheet="Sheet"
                    buttonText="Export to Excel"
                />
            </div>
        </div>
    )
}

export default ApiData;
