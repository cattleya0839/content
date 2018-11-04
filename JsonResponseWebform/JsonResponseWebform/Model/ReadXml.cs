using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Xml.Serialization;

namespace JsonResponseWebform.Model
{
    public static class ReadXml
    {
        private static string directoryOfXml = Path.Combine(
            AppDomain.CurrentDomain.BaseDirectory, "App_Data", "Xml");
        public static T CreateObjectFromXml<T>(string fileName)
        {
            var filePath = Path.Combine(directoryOfXml, fileName);
            if(File.Exists(filePath))
            {
                using (var streamReaderOfXml = new StreamReader(filePath))
                {
                    var xmlSerealizer = new XmlSerializer(typeof(T));
                    var deserealizeObj = (T)xmlSerealizer.Deserialize(streamReaderOfXml);
                    return deserealizeObj;
                }
            }
            else
            {
                return default(T);
            }
        }
    }
}