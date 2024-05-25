type ButtonProps = {
  content: string;
  handler?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

function Button({ content, handler, type }: ButtonProps) {
  return <button type={type} onClick={handler}>{content}</button>;
}

export default Button;
