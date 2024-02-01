import { Link } from 'react-router-dom';
import { EditIcon } from './icons/EditIcon';
import { useState } from 'react';

export function TaskCard({ task, handleDragging }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text', task.id);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  return (
    <div
      className={`bg-zinc-800 p-3 hover:bg-zinc-700 grid grid-cols-8 ${
        isHovered ? 'relative' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='col-span-7'>
        <h1 className='font-bold uppercase'>{task.title}</h1>
        <p className='text-slate-400'>{task.description}</p>
      </div>
      {isHovered && (
        <div className='col-span-1 grid place-content-center'>
          <Link to={`/tasks/${task.id}`}>
            <EditIcon />
          </Link>
        </div>
      )}
    </div>
  );
}
