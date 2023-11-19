import React, { useState } from 'react';
import './StudentPopUp.css'; // Import the CSS file

const StudentPopUp = ({ student, handleSave, handleClose, refreshStudentList}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState({ ...student });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent({ ...editedStudent, [name]: value });
    };

    const handleSubmit = () => {
        handleSave(editedStudent);
        refreshStudentList();
        setIsEditing(false);
    };


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    {isEditing ? (
                        <>
                            <h1>Edit Student</h1>
                            <div>
                                {/* Form fields to edit */}
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedStudent.firstName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedStudent.lastName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editedStudent.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    name="contact"
                                    value={editedStudent.contact}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={editedStudent.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="discipline"
                                    value={editedStudent.discipline}
                                    onChange={handleInputChange}
                                />
                                {/* Other input fields */}
                            </div>
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleClose}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h1>Student Details</h1>
                            <div><strong>Name:</strong> {student.firstName} {student.lastName}</div>
                            <div><strong>Email:</strong> {student.email}</div>
                            <div><strong>Contact:</strong> {student.contact}</div>
                            <div><strong>Date of Birth:</strong> {student.dateOfBirth}</div>
                                <div><strong>Discipline:</strong> {student.discipline}</div>
                            <div className="modal-buttons">
                                <button onClick={() => handleEdit(student)}>Edit</button>
                                <button onClick={handleClose}>Close</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentPopUp;
