using TaskManagementAPI.Endpoints;
using TaskManagementAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Register services here
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register your ITaskService implementation
builder.Services.AddScoped<ITaskService, TaskService>();

var clientAppUrl = builder.Configuration["ClientAppUrl"] ?? "http://localhost:3000";


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(clientAppUrl, "https://path-loack-assgn-6rjt.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable CORS - MUST be before other middleware
app.UseCors("AllowReactApp");

// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Map your endpoints
app.MapTaskEndpoints();

app.Run();