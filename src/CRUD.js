import React from "react";
import { useState, useRef } from "react";
function CRUD() {
    const list = [
        {
            id: 1,
            name: "Tuan",
            gender: "Male"
        },
        {
            id: 2,
            name: "Huu",
            gender: "Female"
        },
    ]
    const [lists, setLists] = useState(list);
    const [update, setUpdate] = useState(-1);
    const [idNumber, setIdNumber] = useState(Object.keys(lists).length);
    return (
        <div className="container">
            <div>
                <AddList setLists={setLists} idNumber={idNumber} setIdNumber={setIdNumber}  />
                <form onSubmit={handleSubmit}>
                    <table className="crud-table">
                        {
                            lists.map((e) => (
                                update === e.id ? <EditList /> :
                                    (
                                        <tr>
                                            <td>{e.id}</td>
                                            <td>{e.name}</td>
                                            <td>{e.gender}</td>
                                            <td>
                                                <button className="edit" onClick={() => handleEdit(e.id)}>Edit</button>
                                                <button className="del" type="button" onClick={() => handleDelete(e.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                            ))
                        }
                    </table>
                </form>
            </div>
        </div>
    )
    function handleEdit(id) {
        setUpdate(id);
    }
    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id);
        setIdNumber((e)=> e-1);
        setLists(newlist);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const gender = e.target.gender.value;
        const newlist = lists.map((li) => (
            li.id === update ? { ...lists, name: name, gender: gender } : li
        ))
        setLists(newlist);
        setUpdate(-1);
    }
}

function EditList() {
    return (
        <tr>
            <td><input type="text" name="name" /></td>
            <td><input type="text" name="gender" /></td>
            <td><button className="edit">Submit</button></td>
        </tr>
    )
}

function AddList({ setLists, setIdNumber, idNumber}) {
    const nameRef = useRef();
    const genderRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        setIdNumber((e)=> e+1);
        const name = e.target.name.value;
        const gender = e.target.gender.value;
        if (name.length !== 0 && gender.length !== 0) {
            const newList = {
                id: idNumber,
                name,
                gender
            }
            setLists((prevList) =>
                prevList.concat(newList)
            )
        }
    }
    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter name" ref={nameRef} />
            <input type="text" name="gender" placeholder="Enter gender" ref={genderRef} />
            <button type="submit">Add</button>
        </form>
    )
}

export default CRUD;