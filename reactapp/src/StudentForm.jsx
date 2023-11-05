import React, { useState } from 'react';

function StudentForm({ refreshStudentList }) {
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Contact: '',
        DateOfBirth: '',
        Discipline: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/Student/1/setstudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Student added successfully, you can handle the response as needed.
                console.log('Student added successfully');
                refreshStudentList();
                setFormData({
                    Username: '',
                    Password: '',
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    Contact: '',
                    DateOfBirth: '',
                    Discipline: '',
                });
            } else {
                // Handle errors or display error messages.
                console.error('Error adding student');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        console.log(formData); // For demonstration, log the data to the console.
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="Contact"
                        value={formData.Contact}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="DateOfBirth"
                        value={formData.DateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Discipline:</label>
                    <input
                        type="text"
                        name="Discipline"
                        value={formData.Discipline}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default StudentForm;
