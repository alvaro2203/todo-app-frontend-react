import { Link } from 'react-router-dom';
import { CirclePlusIcon } from './icons/CirclePlusIcon';

export function TaskNew({ state }) {
  return (
    <div className='p-3 hover:bg-zinc-700 hover:cursor-pointer'>
      <Link to={`/tasks-create/${state}`}>
        <div className='opacity-40 grid content-center h-full justify-items-center'>
          <CirclePlusIcon size='size-14' />
        </div>
      </Link>
    </div>
  );
}
