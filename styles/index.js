export const STYLES = {
  height: 'h-[250px] sm:h-[350px]',
  flexAround: 'flex justify-around items-center',
  flexBetween: 'flex justify-between items-center',
  flexCenter: 'flex justify-center',
  input:
    'px-4 py-2 rounded-full border-2 border-blue-400 bg-blue-100/10  text-black font-medium placeholder-slate-400 ',
};

export const fade = () => ({
  hidden: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 0,
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
});
