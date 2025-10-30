using System.Text.Json;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly string _filePath = "tasks.json";
        private List<TaskItem> _tasks = new();
        private readonly object _lock = new();

        public TaskService()
        {
            if (File.Exists(_filePath))
            {
                var json = File.ReadAllText(_filePath);
                var savedTasks = JsonSerializer.Deserialize<List<TaskItem>>(json);
                if (savedTasks != null)
                {
                    _tasks = savedTasks;
                }
            }

        }

        private void SaveToFile()
        {
            lock (_lock)
            {
                var json = JsonSerializer.Serialize(_tasks, new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                File.WriteAllText(_filePath, json);
            }
        }

        public List<TaskItem> GetAll()
        {
            lock (_lock)
            {
                return _tasks.ToList();
            }
        }

        public TaskItem? GetById(Guid id)
        {
            lock (_lock)
            {
                return _tasks.FirstOrDefault(t => t.Id == id);
            }
        }

        public TaskItem Create(string description)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = description,
                IsComplete = false
            };

            lock (_lock)
            {
                _tasks.Add(task);
                SaveToFile();
            }

            return task;
        }

        public TaskItem Update(Guid id, string? description, bool isComplete)
        {
            lock (_lock)
            {
                var task = _tasks.FirstOrDefault(t => t.Id == id);
                if (task != null)
                {
                    if (!string.IsNullOrWhiteSpace(description))
                        task.Description = description;

                    task.IsComplete = isComplete;
                    SaveToFile();
                }
                return task!;
            }
        }

        public void Delete(Guid id)
        {
            lock (_lock)
            {
                var task = _tasks.FirstOrDefault(t => t.Id == id);
                if (task != null)
                {
                    _tasks.Remove(task);
                    SaveToFile();
                }
            }
        }
    }
}
