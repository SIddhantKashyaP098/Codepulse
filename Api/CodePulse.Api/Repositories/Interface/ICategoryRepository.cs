using CodePulse.Api.Models.Domain;

namespace CodePulse.Api.Repositories.Interface
{
    public interface ICategoryRepository
    {

        Task<Category> CreateAsync(Category category);

        Task<IEnumerable<Category>> getAllAsync();

        Task<Category?> getCategorybyId(Guid id);

        Task<Category?>updateCategory(Category category);

        Task<bool>DeleteCateogyById(Guid id);
    }
}
