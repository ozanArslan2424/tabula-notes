import { PiCircleDashedBold, PiCircleFill } from "react-icons/pi";

export const LoadingIcon = ({ size = 24 }: { size?: number }) => {
  return <PiCircleDashedBold size={size} className="animate-spin" />;
};

export const LoadingIcon2 = ({ size = 10 }: { size?: number }) => {
  return (
    <div className="flex items-center gap-1">
      <PiCircleFill size={size} className="animate-pulse duration-700" />
      <PiCircleFill size={size} className="animate-pulse delay-150 duration-700" />
      <PiCircleFill size={size} className="animate-pulse delay-300 duration-700" />
    </div>
  );
};
