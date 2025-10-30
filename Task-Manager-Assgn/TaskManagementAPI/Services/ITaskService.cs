using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public interface ITaskService
    {
        List<TaskItem> GetAll();
        TaskItem? GetById(Guid id);
        TaskItem Create(string description);
        TaskItem Update(Guid id, string? description, bool isComplete);
        void Delete(Guid id);
    }
}