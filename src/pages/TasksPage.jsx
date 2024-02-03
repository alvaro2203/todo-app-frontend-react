import { TasksContainer } from '../components/TasksContainer';
import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api';
import { STATE_CHOICES } from '../consts';

const initialState = {
  [STATE_CHOICES.pending]: [],
  [STATE_CHOICES.doing]: [],
  [STATE_CHOICES.done]: [],
};

export function TasksPage() {
  const [tasks, setTasks] = useState(initialState);
  const [isDragging, setIsDragging] = useState(false);
  const handleDragging = (dragging) => setIsDragging(dragging);
  const loadTasks = async () => setTasks(await getAllTasks());

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-5'>
      {Object.entries(tasks).map(([taskState, tasksData]) => (
        <div key={taskState} className='p-3'>
          <h1 className='text-center font-bold mb-3'>
            {taskState.toUpperCase()}
          </h1>
          <TasksContainer
            tasks={tasksData}
            state={taskState.toLowerCase()}
            isDragging={isDragging}
            handleDragging={handleDragging}
            loadTasks={loadTasks}
          />
        </div>
      ))}
    </div>
  );
}
