import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Table, Modal, Form, FormGroup } from "react-bootstrap";




const Users = () => {
    const [state, setState] = useState({
        list: [],
        profilepic: '',
        profilepicurl: '',
    })


    // Modal for add user

    const [add, setAdd] = useState(false)
    const handleAdd = () => setAdd(true);
    const handleCloseAdd = () => setAdd(false)

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    //Add Functionality
    const [modal, setModal] = useState({
        first_name: '',
        last_name: '',
        email: '',

        profilePicUrl: '',
    })
    const handleInputChange = (e) => {
        setModal({ ...modal, [e.target.name]: e.target.value })
    }

    const addFn = () => {
        console.log("add the values")
        const { data } = userslist;
        data.push(modal)
        setState({ ...state, data: data });
        handleClose();
    }


    const [show, setShow] = useState(false);
    const [userslist, setUserslist] = useState(
        {
            data: []
        }
    )
    useEffect(() => {
        console.log("useEffect")
        axios.get('https://reqres.in/api/users')
            .then(function (response) {
                console.log(response);
                setUserslist(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const deleteUser = (user) => {
        prompt("are you sure want delete this ");
        console.log(user)

        const filterUserslist = userslist.data.filter((each) => each.id !== user.id)
        console.log(filterUserslist)

        setUserslist({ ...userslist, data: filterUserslist })

    }
    const addbtn = () => {
        setShow = true;


    }
    // upload profile pic functionality
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name) {
            console.log(file)
            console.log(URL.createObjectURL(file))
            setState({ ...state, profilePic: file, profilePicUrl: URL.createObjectURL(file) })
        }
        console.log(file)
    }

    const handleRemoveProfile = () => {
        setState({ ...state, profilePic: '', profilePicUrl: '' })
    }

    const handleUpload = () => {
        document.getElementById("profile-pic").click();
    }
    // const editUser = (User) => {
    //     prompt("do u want to edit the data");   

    // }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (


        <div>
            <Button variant="primary" onClick={handleShow}>
                Open Modal
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>MODAL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" name="first_name" value={modal.first_name} onChange={handleInputChange} placeholder="First name" />
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" name="last_name" value={modal.last_name} onChange={handleInputChange} placeholder="Last name" />
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" value={modal.email} onChange={handleInputChange} placeholder="Enter Email" aria-describedby="inputGroupPrepend" required />
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        </Form.Group>
<div className='m-3 text-center'>  <Button variant='success' type="submit">Submit form</Button></div>
<Form.Group as={Col} md="12" controlId="validationCustomUsername">

<Form.Label>Profile Pic</Form.Label>
<div onClick={handleUpload} className="text-success border border-dark "  ><u>Add your profilePic</u>
    <img src={state.profilePicUrl} height="150" />

    <p className='ml-2'><Button variant='danger' onClick={handleRemoveProfile}>Remove</Button></p>
</div>

<Form.Control type="file" hidden name="profilePic" id="profile-pic" onChange={handleFileChange} aria-describedby="inputGroupPrepend" required />
</Form.Group>

<div className='m-3 text-center'>  <Button variant='success' type="submit">Submit form</Button></div>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addFn}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal.Footer>
            </Modal>


            <div className="mt-5">
                {/*
            {/* <Button variant="primary" >add user</Button> */}
                <Table bordered >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Profile pic</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            userslist.data.map((user, index) => {
                                return (

                                    <tr key={index}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td><img src={user.avatar} alt="avatar" /></td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => edituser(user)}>edit</Button> {''}
                                            <Button variant="success" onClick={() => deleteUser(user)}>Delete</Button>



                                        </td>

                                    </tr>


                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Users;