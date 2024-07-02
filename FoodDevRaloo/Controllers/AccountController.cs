using Microsoft.AspNetCore.Mvc;
using FoodDevRaloo.Data;
using FoodDevRaloo.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Antiforgery;

namespace FoodDevRaloo.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IAntiforgery _antiforgery;

        public AccountController(ApplicationDbContext context, IAntiforgery antiforgery)
        {
            _context = context;
            _antiforgery = antiforgery;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => (u.username == model.UsernameOrEmail || u.email == model.UsernameOrEmail) && u.pass == model.Password);

                if (user != null)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.email),
                        new Claim(ClaimTypes.NameIdentifier, user.userID.ToString())
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Invalid login attempt.");
            }
            return View(model);
        }

        [HttpGet]
        public IActionResult Signup()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Signup(SignupViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    firstname = model.FirstName,
                    lastname = model.LastName,
                    username = model.Username,
                    email = model.Email,
                    pass = model.Password, // Note: Passwords should be hashed in a real application
                    data_ora_creare = DateTime.Now
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction("Login", "Account");
            }

            return View(model);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == User.Identity.Name); // Assuming email is the user identity

            if (user == null)
            {
                return NotFound();
            }

            var model = new ProfileViewModel
            {
                UserID = user.userID,
                Username = user.username,
                Email = user.email,
                FirstName = user.firstname,
                LastName = user.lastname,
                Address = user.address,
            };

            ViewData["RequestVerificationToken"] = _antiforgery.GetAndStoreTokens(HttpContext).RequestToken;

            return View(model);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ChangeAddress([FromBody] ChangeAddressModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == User.Identity.Name); // Assuming email is the user identity

            if (user != null)
            {
                user.address = model.Address;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return Json(new { success = true, address = user.address });
            }

            return Json(new { success = false });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == User.Identity.Name); // Assuming email is the user identity

            if (user != null && user.pass == model.CurrentPassword)
            {
                if (model.NewPassword == model.ConfirmNewPassword)
                {
                    user.pass = model.NewPassword; // Note: Passwords should be hashed in a real application
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                    return Json(new { success = true });
                }
                return Json(new { success = false, message = "New passwords do not match." });
            }

            return Json(new { success = false, message = "Current password is incorrect." });
        }
    }

    public class ChangeAddressModel
    {
        public string Address { get; set; }
    }

    public class ChangePasswordModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
