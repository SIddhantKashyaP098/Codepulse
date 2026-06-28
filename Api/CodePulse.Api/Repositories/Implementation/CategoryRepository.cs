using CodePulse.Api.Data;
using CodePulse.Api.Models.Domain;
using CodePulse.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.Api.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {

        public ApplicationDbContext dbContext { get; }
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        
        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<Category>> getAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> getCategorybyId(Guid id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync((x) => x.Id == id);
        }

        public async Task<Category?> updateCategory(Category category)
        {
            var existingCategory = await dbContext.Categories.FirstOrDefaultAsync((x) => x.Id == category.Id);

            if (existingCategory != null)
            {
                dbContext.Entry(existingCategory).CurrentValues.SetValues(category);
                await dbContext.SaveChangesAsync();
                return category;
            }
            return null;
        }

        public async Task<bool> DeleteCateogyById(Guid id)
        {
            var category = await dbContext.Categories.FindAsync(id);

            if (category!=null)
            {
                dbContext.Categories.Remove(category); 
                await dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
