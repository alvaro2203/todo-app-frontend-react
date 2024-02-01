import { TasksContainer } from '../components/TasksContainer';
import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api';
import { STATE_CHOICES } from '../consts';

const initialState = {
  pending: { label: STATE_CHOICES.pending, tasks: [] },
  doing: { label: STATE_CHOICES.doing, tasks: [] },
  done: { label: STATE_CHOICES.done, tasks: [] },
};

export function TasksPage() {
  const [tasks, setTasks] = useState(initialState);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragging = (dragging) => setIsDragging(dragging);

  async function loadTasks() {
    const res = await getAllTasks();
    const tasksData = res.data;

    setTasks({
      pending: {
        ...tasks.pending,
        tasks: tasksData.filter((task) => task.state === STATE_CHOICES.pending),
      },
      doing: {
        ...tasks.doing,
        tasks: tasksData.filter((task) => task.state === STATE_CHOICES.doing),
      },
      done: {
        ...tasks.done,
        tasks: tasksData.filter((task) => task.state === STATE_CHOICES.done),
      },
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <div className='grid grid-cols-3 gap-5'>
        {Object.keys(tasks).map((taskState) => (
          <div key={taskState} className='p-3'>
            <h1 className='text-center font-bold mb-3'>
              {tasks[taskState].label.toUpperCase()}
            </h1>
            <TasksContainer
              tasks={tasks[taskState].tasks}
              state={taskState.toLowerCase()}
              isDragging={isDragging}
              handleDragging={handleDragging}
              loadTasks={loadTasks}
            />
          </div>
        ))}
      </div>
    </>
  );
}
