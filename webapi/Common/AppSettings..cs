using System.Text.Json;

namespace webapi.common;
public class AppSettings
{
    public static Setting Settings { get; }
    static AppSettings()
    {
        var config = File.ReadAllText("appsettings.json");
        Settings = JsonSerializer.Deserialize<Setting>(config) ?? throw new InvalidOperationException();
    }
    //public class Preferences
    //{
    //    public static int Offset => Convert.ToInt32(Settings.AppSettings.Offset);
    //}

    public class Setting
    {
        public Sqlconnection? SqlConnection { get; init; }
    }
    public class Sqlconnection
    {
        public TestApp? TestApp { get; init; }
    }
    public class TestApp
    {
        public string? ConnectionString { get; init; }
        public int CommnadTimeout { get; init; }
    }

}

