import { StyledButton } from './StyledButton';
import { UnmadeIcon } from './icons/UnmadeIcon';

export function DeleteModal(handleDelete) {
  return (
    <>
      <div
        tabindex='-1'
        className='flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div className='relative p-3 w-full max-w-md max-h-full bg-zinc-800 hover:cursor-pointer rounded-lg'>
          <div className='relative'>
            <button
              type='button'
              className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => setShowModal(false)}
            >
              <UnmadeIcon />
            </button>
            <div className='p-4 md:p-5 text-center'>
              <WarningIcon />
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this task?
              </h3>
              <StyledButton
                customClasses='bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-sm inline-flex py-2.5 me-2'
                onClick={handleDelete}
              >
                Yes, I'm sure
              </StyledButton>
              <StyledButton
                onClick={() => setShowModal(false)}
                customClasses='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 text-sm py-2.5 me-2 inline-flex'
              >
                No, cancel
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
