# Multi-stage build for .NET 8 minimal API

# Base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Build image with SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY TaskManagementAPI.csproj ./
RUN dotnet restore "TaskManagementAPI.csproj"

# Copy the rest of the source
COPY . .

# Build
RUN dotnet build "TaskManagementAPI.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "TaskManagementAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskManagementAPI.dll"]
