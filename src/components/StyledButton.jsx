export function StyledButton({ children, customClasses, ...props }) {
  const defaultSytles =
    'text-white p-3 rounded-lg block text-center font-medium px-5';
  const buttonStyles = customClasses
    ? `${defaultSytles} ${customClasses}`
    : defaultSytles;

  return (
    <button type='button' className={buttonStyles} {...props}>
      {children}
    </button>
  );
}
