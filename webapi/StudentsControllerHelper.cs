using System.Data;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using webapi.Context;
using webapi.Helper;
using webapi.Models;

namespace webapi
{
    public class StudentsControllerHelper
    {
        public IEnumerable<Students> GetStudentsList()
        {
            //var dt = SqlHelper.ExecuteDataTable(SqlHelper.GetConnectionString(""),CommandType.Text, "select * from students WITH(NOLOCK)");
            var context = new TestAppContext();
            var lstOfStudents = context.Students.ToArray();
            Console.WriteLine("Proc has been called");
            return lstOfStudents;
        }
        public string DeleteStudentById(int sid)
        {
            //var dt = SqlHelper.ExecuteDataTable(SqlHelper.GetConnectionString(""),CommandType.Text, "select * from students WITH(NOLOCK)");
            try
            {
                var context = new TestAppContext();
                var lstOfStudents = context.Students.Where(a => a.StudentID == sid).ExecuteDelete();
                Console.WriteLine("Proc has been called");
                return "success";
            }
            catch (Exception)
            {
                return "Fail";
            }
        }
        public string SetStudent(Students s)
        {
            //var dt = SqlHelper.ExecuteDataTable(SqlHelper.GetConnectionString(""),CommandType.Text, "select * from students WITH(NOLOCK)");
            try
            {
                var context = new TestAppContext();
                var lstOfStudents = context.Students.Add(s); 
                context.SaveChanges();
                return "success";
            }
            catch (Exception)
            {
                return "fail";
                Console.WriteLine("Error in set student");
            }
        }
    }
}
