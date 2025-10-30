namespace TaskManagementAPI.Models.DTOs
{
    public record UpdateTaskRequest(string? Description, bool IsComplete);
}