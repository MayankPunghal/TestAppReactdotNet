namespace webapi.Helper
{
    public class ApiRoute
    {
        const string Version = "1";
        internal static class Students
        {
            const string Route = Version + "/";
            internal const string getStudentList = Route + "getStudentList";
            internal const string setStudent = Route + "setStudent";
            internal const string deleteStudent = Route + "deleteStudent";
            internal const string updateStudent = Route + "updateStudent";
        }
    }
}