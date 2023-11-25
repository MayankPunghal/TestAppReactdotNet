using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using webapi.Context;
using webapi.Helper;
using webapi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using static webapi.Helper.ApiRoute;

namespace webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{

    [HttpGet(ApiRoute.Students.getStudentList, Name = "GetStudentData")]
    public IEnumerable<Models.Students> GetStudentData()
    {
        //Proc call
        var arrStudents = new StudentsControllerHelper().GetStudentsList();
        return arrStudents;
    }

    [HttpDelete(ApiRoute.Students.deleteStudent+ "/{studentID}", Name = "DeleteStudentById")]
    public IActionResult DeleteStudentById(int studentID)
    {
        //Proc call
        var arrStudents = new StudentsControllerHelper().DeleteStudentById(studentID);
        return Ok();
    }


    [HttpPost(ApiRoute.Students.setStudent, Name = "SetStudentData")]
    public string SetStudentData(SetStudentDataRequestProxy std)
    {
        //Proc call
        Models.Students stu = new Models.Students()
        {
            Username = std.Username,
            Password = std.Password,
            FirstName = std.FirstName,
            LastName = std.LastName,
            Contact = std.Contact,
            Discipline = std.Discipline,
            Email = std.Email,
            DateOfBirth = std.DateOfBirth,

        };
        var resp = new StudentsControllerHelper().SetStudent(stu);
        if(resp == "success")
        return "Student Data Inserted Successfully";
        else 
            return "Student Data Not Inserted Due To Some Error";
    }

    [HttpPut(ApiRoute.Students.updateStudent + "/{studentID}", Name = "UpdateStudentData")]
    public async Task<IActionResult> UpdateStudent(int studentID, [FromBody] Models.Students updatedStudent)
    {
        // Fetch the existing student from the database using studentID
        var context = new TestAppContext();
        var existingStudent = await context.Students.FindAsync(studentID);

        if (existingStudent == null)
        {
            return NotFound(); // Return 404 if student doesn't exist
        }

        // Update the properties of the existing student with the new values
        existingStudent.FirstName = updatedStudent.FirstName;
        existingStudent.LastName = updatedStudent.LastName;
        existingStudent.Email = updatedStudent.Email;
        existingStudent.Discipline = updatedStudent.Discipline;
        existingStudent.DateOfBirth = updatedStudent.DateOfBirth;
        existingStudent.Contact = updatedStudent.Contact;
        existingStudent.FullName = updatedStudent.FirstName + " " + updatedStudent.LastName;
        // Update other properties similarly...

        // Save the changes back to the database
        context.Students.Update(existingStudent);
        await context.SaveChangesAsync();

        return Ok(existingStudent); // Return the updated student
    }
}
