using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UMAPP;
using UMAPP.Controllers;
using System.Net.Http;
using UMAPP.Models;
using System;
using Newtonsoft.Json;

namespace UMAPP.Tests.Controllers
{
    [TestClass]
    public class AccountControllerTest
    {
        [TestMethod]
        public void Register()
        {
            HttpClient client = new HttpClient();
            RegisterBindingModel model = new RegisterBindingModel();
            model.Email = "test" + DateTime.Now.ToBinary().ToString() + "@qq.com";
            model.Password = "123456";
            model.ConfirmPassword = "123456";
            string jsonString = JsonConvert.SerializeObject(model);

            var request = client.PostAsJsonAsync("http://localhost:56250/api/Account/Register", model);
            var result = request.Result;
        }
    }
}
