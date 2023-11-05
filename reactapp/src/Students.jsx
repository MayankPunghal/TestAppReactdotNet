import React, { Component } from 'react';
import StudentForm from './StudentForm';
import Styles from './Students.css';
export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, studentList: [] };
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


    static renderForecastsTable(studentList, handleDeleteStudent) {
        return (
            <div>
                <table className='table table-striped student-table' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>DateOfBirth</th>
                            <th>Discipline</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map(student =>
                            <tr key={student.studentID}>
                                <td>{student.studentID}</td>
                                <td>{student.fullName}</td>
                                <td>{student.email}</td>
                                <td>{student.contact}</td>
                                <td>{student.dateOfBirth}</td>
                                <td>{student.discipline}</td>
                                <td>
                                    <button className={Styles.deltebutton} onClick={() => handleDeleteStudent(student.studentID)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderForecastsTable(this.state.studentList, this.handleDeleteStudent);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                <StudentForm refreshStudentList={this.refreshStudentList} />
            </div>
        );
    }

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
                        // Student deleted successfully, you can handle the response as needed.
                        console.log('Student deleted successfully');
                        // Refresh the student list after deletion
                        this.populateStudentData();
                    } else {
                        // Handle errors or display error messages.
                        console.error('Error deleting student');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                }
                );
        }
    };

}
