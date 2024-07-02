import { useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

import styles from './date-input.module.css';
import { Input, type InputProps } from './ui/input';

export type DateInputProps = InputProps;

export const DateInput = ({ className, type = 'date', style, ...props }: InputProps) => {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const customIconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const alignIcon = () => {
      if (dateInputRef.current && customIconRef.current) {
        const inputHeight = dateInputRef.current.offsetHeight;
        customIconRef.current.style.top = `${inputHeight / 2}px`;
      }
    };

    alignIcon();
    window.addEventListener('resize', alignIcon);

    return () => {
      window.removeEventListener('resize', alignIcon);
    };
  }, []);

  const handleIconClick = () => {
    console.log('1');

    dateInputRef.current?.showPicker(); // Show the date picker

    console.log(dateInputRef.current);
  };

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={type}
        ref={dateInputRef}
        className={`w-full pr-10 ${className} ${styles.dateInput}`}
      />
      <div
        ref={customIconRef}
        className="absolute right-2 top-1/2 flex h-full -translate-y-1/2 transform cursor-pointer items-center"
        onClick={handleIconClick}
      >
        <Calendar className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
};
