import axios from 'axios';
import { TaskItem } from '../types/task';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/tasks';

// Rest of the code...

class TaskService {
  async getTasks(): Promise<TaskItem[]> {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async getTaskById(id: string): Promise<TaskItem | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      return null;
    }
  }

  async addTask(description: string): Promise<TaskItem | null> {
    try {
      const response = await axios.post(API_BASE_URL, { description });
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      return null;
    }
  }

  async updateTask(id: string, updatedTask: Partial<TaskItem>): Promise<TaskItem | null> {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }
}

export const taskService = new TaskService();