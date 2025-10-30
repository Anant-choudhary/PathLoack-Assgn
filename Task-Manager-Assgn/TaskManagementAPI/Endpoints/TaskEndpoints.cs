using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Models.DTOs;
using TaskManagementAPI.Services;
using Microsoft.AspNetCore.OpenApi;

namespace TaskManagementAPI.Endpoints
{
    public static class TaskEndpoints
    {
        public static void MapTaskEndpoints(this WebApplication app)
        {
  
            app.MapGet("/api/tasks", ([FromServices] ITaskService service) =>
            {
                return Results.Ok(service.GetAll());
            })
            .WithName("GetAllTasks")
            .WithOpenApi();

            // POST /api/tasks - Create a new task
            app.MapPost("/api/tasks", ([FromBody] CreateTaskRequest request, [FromServices] ITaskService service) =>
            {
                if (string.IsNullOrWhiteSpace(request.Description))
                {
                    return Results.BadRequest(new { error = "Description is required" });
                }

                var task = service.Create(request.Description);
                return Results.Created($"/api/tasks/{task.Id}", task);
            })
            .WithName("CreateTask")
            .WithOpenApi();

            // PUT /api/tasks/{id} - Update a task
            app.MapPut("/api/tasks/{id}", (Guid id, [FromBody] UpdateTaskRequest request, [FromServices] ITaskService service) =>
            {
                var task = service.GetById(id);
                if (task == null)
                {
                    return Results.NotFound(new { error = "Task not found" });
                }

                var updated = service.Update(id, request.Description, request.IsComplete);
                return Results.Ok(updated);
            })
            .WithName("UpdateTask")
            .WithOpenApi();

            // DELETE /api/tasks/{id} - Delete a task
            app.MapDelete("/api/tasks/{id}", (Guid id, [FromServices] ITaskService service) =>
            {
                Console.WriteLine("Deleting task with ID: " + id);
                var task = service.GetById(id);

                if (task == null)
                {
                    return Results.NotFound(new { error = "Task not found" });
                }

                service.Delete(id);
                return Results.NoContent();
            })
            .WithName("DeleteTask")
            .WithOpenApi();
        }
    }
}
