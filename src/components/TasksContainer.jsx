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
  const handleDragOver = (event) => event.preventDefault();
  const object = { state };

  const handleDrop = async (event) => {
    event.preventDefault();

    const id = event.dataTransfer.getData('text');
    var statebeforeUpdate = '';
    const taskOnDrag = await getTask(id).then((task) => {
      statebeforeUpdate = task.data.state;
      return Object.assign(task.data, object);
    });

    if (statebeforeUpdate !== state) {
      await updateTask(taskOnDrag.id, taskOnDrag);
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
