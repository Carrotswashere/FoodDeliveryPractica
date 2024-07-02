using Microsoft.AspNetCore.Mvc;

namespace FoodDevRaloo.Controllers
{
    public class RestaurantsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
