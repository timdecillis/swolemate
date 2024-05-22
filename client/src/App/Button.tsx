type ButtonProps = {
  content: string;
  handler?: () => void;
};

function Button({ content, handler }: ButtonProps) {
  return <button onClick={handler}>{content}</button>;
}

export default Button;
