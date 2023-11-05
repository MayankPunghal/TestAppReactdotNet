import React, { Component } from 'react';
import StudentForm from './StudentForm';
import './Students.css';
export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, studentList : [] };
    }

    componentDidMount() {
        //this.populateWeatherData();
        this.populateStudentData();
    }

    static renderForecastsTable(forecasts,studentList) {
        return (
            <div>
                <StudentForm />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>DateOfBirth</th>
                            <th>Discipline</th>
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
                            </tr>
                        )}
                    </tbody>
                </table>
                {/*<table className='table table-striped' aria-labelledby="tabelLabel">*/}
                {/*    <thead>*/}
                {/*        <tr>*/}
                {/*            <th>Date</th>*/}
                {/*            <th>Temp. (C)</th>*/}
                {/*            <th>Temp. (F)</th>*/}
                {/*            <th>Summary</th>*/}
                {/*            <th>State</th>*/}
                {/*        </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*        {forecasts.map(forecast =>*/}
                {/*            <tr key={forecast.date}>*/}
                {/*                <td>{forecast.date}</td>*/}
                {/*                <td>{forecast.temperatureC}</td>*/}
                {/*                <td>{forecast.temperatureF}</td>*/}
                {/*                <td>{forecast.summary}</td>*/}
                {/*                <td>{forecast.state}</td>*/}
                {/*            </tr>*/}
                {/*        )}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderForecastsTable(this.state.forecasts, this.state.studentList);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    //async populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    this.setState({ forecasts: data, loading: false });
    //}
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
}
