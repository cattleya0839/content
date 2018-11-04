using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace JsonResponseWebform.Model.Client
{
    [Serializable]
    public class Client
    {
        private string _subscriptionFlag = "";

        [XmlAttribute("id")]
        public string Id { get; set; }

        [XmlAttribute("tel_num")]
        public string TelNum { get; set; }

        [XmlAttribute("subscription")]
        public string SubscriptionFlag { get => _subscriptionFlag; set => 
                _subscriptionFlag = (bool.TryParse(value, out bool result) && result) ? "true" : string.Empty ;  }

        [XmlAttribute("name")]
        public string Name { get; set; } = string.Empty;
    }
}