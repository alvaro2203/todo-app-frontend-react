import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { StyledButton } from '../components/StyledButton';
import { STATE_CHOICES } from '../consts';
import { DeleteModal } from '../components/DeleteModal';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  function getURLParam(url) {
    const params = url.split('/').filter(Boolean);
    const lastParam = params[params.length - 1];

    return STATE_CHOICES[lastParam] || null;
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      const actionMessage = params.id ? 'Updated' : 'Created';
      params.id ? await updateTask(params.id, data) : await createTask(data);

      toast.success(`${actionMessage} Task`, {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      });

      navigate('/tasks');
    } catch (error) {
      console.log(error);
    }
  });

  const handleDelete = async () => {
    try {
      await deleteTask(params.id);

      toast.success('Deleted Task', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      });

      navigate('/tasks');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTaskData = async () => {
      const state = getURLParam(location.pathname);

      try {
        const { data } = await getTask(params.id);
        setValue('title', data.title);
        setValue('description', data.description);
      } catch (error) {
        console.log({ error });
      }

      if (state) setValue('state', state);
    };

    if (params.id) {
      loadTaskData();
    }
  }, [params.id, location.pathname, setValue]);

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          <input
            type='text'
            placeholder='title'
            {...register('title', { required: true })}
            className='bg-zinc-700 p-3 rounded-lg block w-full mb-2'
          />
          {errors.title && <p className='text-red-600'>Title is required</p>}
        </div>

        <div className='mb-5'>
          <textarea
            cols='30'
            rows='3'
            placeholder='description'
            {...register('description', { required: true })}
            className='bg-zinc-700 p-3 rounded-lg block w-full mb-2'
          ></textarea>
          {errors.description && (
            <p className='text-red-600'>Description is required</p>
          )}
        </div>

        <StyledButton
          customClasses='w-full mt-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800'
          onClick={onSubmit}
        >
          Save
        </StyledButton>
      </form>

      {params.id && (
        <div className='flex justify-end'>
          <StyledButton
            customClasses='w-48 mt-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800'
            onClick={() => setShowModal(true)}
          >
            Delete
          </StyledButton>
        </div>
      )}

      {showModal && <DeleteModal handleDelete={handleDelete} />}
    </div>
  );
}
