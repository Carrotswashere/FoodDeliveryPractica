using Microsoft.AspNetCore.Mvc;
using FoodDevRaloo.Models;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly FoodDevRaloo.Data.ApplicationDbContext _context;

    public UsersController(FoodDevRaloo.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _context.Users.ToList();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        user.data_ora_creare = DateTime.Now; // Set the creation date
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }
}
