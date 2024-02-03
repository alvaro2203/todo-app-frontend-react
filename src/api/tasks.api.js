import axios from 'axios';
import { STATE_CHOICES } from '../consts';

const tasksApi = axios.create({
  baseURL: 'http://localhost:8000/tasks/api/v1/tasks/',
});

export const getAllTasks = () => {
  return tasksApi.get('/').then(({ data }) => {
    return {
      pending: data.filter((task) => task.state === STATE_CHOICES.pending),
      doing: data.filter((task) => task.state === STATE_CHOICES.doing),
      done: data.filter((task) => task.state === STATE_CHOICES.done),
    };
  });
};
export const getTask = (id) => tasksApi.get(`/${id}/`);
export const createTask = (task) => tasksApi.post('/', task);
export const deleteTask = (id) => tasksApi.delete(`/${id}`);
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
