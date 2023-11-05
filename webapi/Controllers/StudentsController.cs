using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using webapi.Helper;
using webapi.Models;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private static readonly string[] State = new[]
   {
        "MH", "MP", "UP", "PB", "HR"
    };


    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)],
            State = State[Random.Shared.Next(State.Length)]
        })
        .ToArray();
    }
}
[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{

    [HttpGet(ApiRoute.Students.getStudentList, Name = "GetStudentData")]
    public IEnumerable<Students> GetStudentData()
    {
        //Proc call
        var arrStudents = new WeatherForecast1ControllerHelper().GetStudentsList();
        return arrStudents;
    }


    [HttpPost(ApiRoute.Students.setStudent, Name = "SetStudentData")]
    public string SetStudentData(SetStudentDataRequestProxy std)
    {
        //Proc call
        Students stu = new Students()
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
        var resp = new WeatherForecast1ControllerHelper().SetStudent(stu);
        if(resp == "success")
        return "Student Data Inserted Successfully";
        else 
            return "Student Data Not Inserted Due To Some Error";
    }
}
