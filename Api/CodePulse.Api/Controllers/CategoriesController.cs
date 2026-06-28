using CodePulse.Api.Data;
using CodePulse.Api.Models.Domain;
using CodePulse.Api.Models.DTO;
using CodePulse.Api.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace CodePulse.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public ICategoryRepository CategoryRepository { get; }
        public CategoriesController(ICategoryRepository categoryRepository)
        {

            CategoryRepository = categoryRepository;
        }



        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            // map dto to domain model 

            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };
            // now since we want to talk to database we need to inject the db context into
            // the constructor of this controller
            // and then we can use it here to save the category to the database
            await CategoryRepository.CreateAsync(category);
            // Now We Will map Back from Domain Model to Dto . to send it in Repsonse 
            var Response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(Response);
        }

        // Get: api/categories 
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await CategoryRepository.getAllAsync();

            // this is a domain model because it is coming form the databse and we never 
            // want to expose our domain model .. so now we will map it to a dto 

            var response = new List<CategoryDto>();
            foreach (var category in categories)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }
            return Ok(response);
        }

        [HttpGet]
        // Get: api/categories/{id}
        [Route("{id:Guid}")]
        public async Task<IActionResult> getCategorybyid([FromRoute] Guid id)
        {
            // since it involve interaction with db ... so we have to use repository 
            var category = await CategoryRepository.getCategorybyId(id);
            // now check if it null return error status 
            if (category == null)
            {
                return NotFound();
            }
            else
            {
                // map model to dto and then return 
                var response = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                };
                return Ok(response);
            }
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, updateCategoryRequestDto request)
        {
            // abhi kya kya karna h dekho category object mila h  request me . then
            // ushko update kara save karna aur return bhi kar dena taki angular ui me update kar de 
            // first map request dto  to domain model
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            var x = await CategoryRepository.updateCategory(category);
            if (x == null)
            {
                return NotFound();
            }
            // map domain model to dto and return
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);
        }

        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> DeleteCategoryByid([FromRoute] Guid id)
        {
            // toh kya kar ki first dekh ki database me woh id h ki nahi .. if h toh detelte kar de 
            // and if nahi h toh  not found wala error show kar de  bus 
            bool success= await CategoryRepository.DeleteCateogyById(id);
            if (success == true)
            {
                return Ok();
            }
            else return NotFound();
        }
    }
}
