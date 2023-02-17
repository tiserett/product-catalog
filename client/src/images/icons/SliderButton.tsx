type Props = {
  color?: string,
};

export const SliderButton: React.FC<Props> = ({ color }) => {
  return (
    <svg
      width="14"
      height="4"
      viewBox="0 0 14 4"
      fill={color || '#3B3E4A'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="14"
        height="4"
        fill="#3B3E4A"
      />
    </svg>
  );
};
