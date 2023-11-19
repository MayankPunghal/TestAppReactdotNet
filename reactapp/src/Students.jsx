import { Component} from 'react';
import StudentForm from './StudentForm';
import Styles from './Students.css';
import StudentPoPup from './StudentPoPup';
export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, studentList: [], selectedStudent: null,showModal: false };
    }


    refreshStudentList = async () => {
        await fetch("/api/Student/1/getstudentList")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching student data');
                }
            })
            .then((data) => {
                this.setState({ studentList: data });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount() {
        this.populateStudentData();
    }


    static renderStudentList(studentList, selectedStudent, showModal, handleDeleteStudent, handleStudentClick, handleSaveStudent, handleClose) {
        return (
            <div>
                <table className='table table-striped student-table' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>ID</th>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>Name</th>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>Email</th>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>Contact</th>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>DateOfBirth</th>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>Discipline</th>
                            <th style={{alignContext:'center', justifyContent:'center', textAlign:'center'}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map(student =>
                            <tr key={student.studentID}>
                                {/*<td>{student.studentID}</td>*/}
                                <td>
                                    {/* Clickable button for student ID */}
                                    <button
                                        onClick={() => handleStudentClick(student)}
                                        style={{
                                            backgroundColor: 'lightblue',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {student.studentID}
                                    </button>
                                </td>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.contact}</td>
                                <td>{student.dateOfBirth}</td>
                                <td>{student.discipline}</td>
                                <td>    
                                    <button style={{ backgroundColor: 'beige', color: 'black', margin:'0px 5px 0px 0px' }} className={Styles.deltebutton} onClick={() => handleDeleteStudent(student.studentID)}>Delete</button>
                                    {/*<button style = {{ backgroundColor: 'salmon', color: 'white' }} onClick={() => handleEditStudent(student)}>Edit</button>*/}
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
                {showModal && (
                    <StudentPoPup
                        student={selectedStudent}
                        handleSave={handleSaveStudent}
                        handleClose={handleClose}
                        refreshStudentList={this.refreshStudentList} 
                />
                )}
            </div>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started</em></p>
            : App.renderStudentList(this.state.studentList, this.state.selectedStudent, this.state.showModal, this.handleDeleteStudent, this.handleStudentClick, this.handleSaveStudent, this.handleClose);

        return (
            <div>
                <div style={{ width:'98vw', height:'auto',display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 id="tabelLabel" >Student List</h1>
                    {/*<button style={{ backgroundColor: 'blueviolet', color: 'white' }} onClick={() => handleEditStudent(student)}>Add Student</button>*/}
                </div>
                <div style={{ width: '80vw', height: 'auto' }}>
                    {contents}
                    <StudentForm refreshStudentList={this.refreshStudentList} />
                </div>
            </div>
        );
    }
    handleSaveStudent = async (editedStudent) => {
        try {
            const response = await fetch(`/api/Student/1/updateStudent/${editedStudent.studentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedStudent),
            });

            if (response.ok) {
                // Handle success: maybe update state or fetch data again
                console.log('Student updated successfully');
                // Refresh student list or perform necessary actions
                this.populateStudentData();
                this.setState({ showModal: false });
            } else {
                // Handle errors or display error messages
                console.error('Error updating student');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    async populateStudentData() {
        await fetch("/api/Student/1/getstudentList")
            .then((response) => {
                if (response.ok) {
                    console.log(response)
                    return response.json();
                } else {
                    throw new Error('Error fetching student data');
                }
            })
            .then((data) => {
                this.setState({ loading: false, studentList: data });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    handleDeleteStudent = (studentID) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            fetch(`/api/Student/1/deleteStudent/${studentID}`,
                {
                    method: 'DELETE',
                })
                .then((response) => {
                    if (response.ok) {
                        console.log('Student deleted successfully');
                        this.populateStudentData();
                    } else {
                        console.error('Error deleting student');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                }
                );
        }
    };


    handleClose = () => {
        this.setState({ showModal: false });
    };

    handleStudentClick = (student) => {
        this.setState({ showModal: true, selectedStudent: student });
    };

    //handleStudentClick = (student) => {

    //    // Open a new window for the modal
    //    const newWindow = window.open(
    //        '',
    //        'StudentDetails', // Window name
    //        'width=400,height=400'
    //    );
    //    const studentDetails = `
    //    <html>
    //    <head>
    //        <title>Student Details</title>
    //        <style>
    //            /* Add your CSS styles here */
    //            body {
    //                font-family: Arial, sans-serif;
    //                margin: 20px;
    //            }
    //            h1 {
    //                text-align: center;
    //            }
    //            .detail {
    //                margin-bottom: 10px;
    //            }
    //        </style>
    //    </head>
    //    <body>
    //        <h1>Student Details</h1>
    //        <div class="detail"><strong>ID:</strong> ${student.studentID}</div>
    //        <div class="detail"><strong>Name:</strong> ${student.firstName} ${student.lastName}</div>
    //        <div class="detail"><strong>Email:</strong> ${student.email}</div>
    //        <div class="detail"><strong>Contact:</strong> ${student.contact}</div>
    //        <div class="detail"><strong>Date of Birth:</strong> ${student.dateOfBirth}</div>
    //        <div class="detail"><strong>Discipline:</strong> ${student.discipline}</div>
    //        <div class="editButton">
    //            <button onclick="window.opener.handleEditStudent(${JSON.stringify(student)})">Edit</button>
    //        </div>
    //    </body>
    //    </html>
    //`;

    //    newWindow.document.write(studentDetails);
    //    newWindow.document.body.addEventListener('click', (event) => {
    //        event.preventDefault();
    //    });
    //};

}
