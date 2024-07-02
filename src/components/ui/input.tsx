import * as React from 'react';

import { cn } from 'src/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export interface MuiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const MuiInput = React.forwardRef<HTMLInputElement, MuiInputProps>(
  ({ className, type, label, placeholder, ...props }, ref) => (
    <div className="relative h-10 w-full min-w-[200px]">
      <input
        id="mui-input"
        type={type}
        className={cn(
          'text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0',
          className,
        )}
        ref={ref}
        placeholder={placeholder ?? ' '}
        {...props}
      />
      <label
        htmlFor="mui-input"
        className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"
      >
        {label}
      </label>
    </div>
  ),
);
MuiInput.displayName = 'MuiInput';

const MuiInput1 = React.forwardRef<HTMLInputElement, MuiInputProps>(
  ({ className, type, label, placeholder, ...props }, ref) => (
    <div className="relative h-9 w-full min-w-[200px]">
      <input
        id="mui-input"
        type={type}
        className={cn(
          'peer h-full w-full rounded-[7px] border border-input border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-inherit shadow-sm outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-input placeholder-shown:border-t-input focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 focus-visible:ring-1 disabled:border-0 disabled:opacity-50',
          className,
        )}
        ref={ref}
        placeholder={placeholder ?? ' '}
        {...props}
      />
      <label
        htmlFor="mui-input"
        className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-inherit transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-input before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-input after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-inherit peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-inherit peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-input peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-input peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-inherit"
      >
        {label}
      </label>
    </div>
  ),
);
MuiInput1.displayName = 'MuiInput';

export { Input, MuiInput };
