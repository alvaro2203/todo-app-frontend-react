import { useState } from 'react';
import { updateTask, getTask } from '../api/tasks.api';
import { TaskCard } from './TaskCard';
import { TaskNew } from './TaskNew';
import toast from 'react-hot-toast';

export function TasksContainer({
  tasks,
  state,
  isDragging,
  handleDragging,
  loadTasks,
}) {
  const [stateBeforeUpdate, setStateBeforeUpdate] = useState('');
  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = async (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');

    try {
      const { data } = await getTask(id);
      setStateBeforeUpdate(data.state);

      if (stateBeforeUpdate !== state) {
        await updateTask(id, { ...data, state });
        handleDragging(false);
        loadTasks();
        toast.success('Updated Task', {
          position: 'bottom-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div
      className={`grid grid-cols-1 gap-5 ${
        isDragging ? 'border-dashed border-2 border-sky-800' : 'p-0.5'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} handleDragging={handleDragging} />
      ))}
      <TaskNew state={state} />
    </div>
  );
}
