using System;
using System.Web.Script.Serialization;
using JsonResponseWebform.Model;
using JsonResponseWebform.Model.Client;

namespace JsonResponseWebform
{
    public partial class ResponseJson : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //　ページの呼び出しメソッドを取得する。

            object responseObj = default(object);
            try
            {
                // クエリ文字からファイル名を取得
                var fileName = GetQuery("file");
                fileName = fileName.ToLower().EndsWith(".xml") ?
                    fileName.ToLower() : fileName.ToLower() + ".xml";
                // Xmlファイルからオブジェクトを取得
                responseObj = ReadXml.CreateObjectFromXml<ClientInfo>("client.xml");
            }
            catch
            {
                responseObj = new { error = "errorが発生しました。" };
            }
            finally
            {
                // callbackが存在するときjsonp形式に変更
                var callback = GetQuery("callback");
                var responseStr = string.IsNullOrWhiteSpace(callback) ?
                    new JavaScriptSerializer().Serialize(responseObj) : string.Format("{0}({1});", callback ,new JavaScriptSerializer().Serialize(responseObj));
                Response.AppendHeader("Access-Control-Allow-Origin", "*");
                Response.ContentType = "text/javascript";
                Response.Output.Write(responseStr);
                Response.End();
            }
        }

        private string GetQuery(string queryName)
        {
            return Request.HttpMethod.Equals("GET") ?
                Request.QueryString[queryName] : Request.Form[queryName];
        }
    }
}