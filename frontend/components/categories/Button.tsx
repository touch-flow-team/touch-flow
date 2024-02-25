// sm은 왜 안될까.

const BUTTON_SIZE = {
  sm: {
    w: '80px',
    h: '40px',
  },
  md: {
    w: '100px',
    h: '40px',
  },
};

interface IProp {
  text: string;
  size: keyof typeof BUTTON_SIZE;
  onClick?: () => void;
}

const Button = ({ text, size, onClick }: IProp) => {
  return (
    <div
      className={`block w-[${BUTTON_SIZE[size].w}] h-[${BUTTON_SIZE[size].h}] bg-gray-900 rounded-md text-white  text-sm flex justify-center items-center transition ease-in delay-100 hover:bg-gray-700`}
      onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
