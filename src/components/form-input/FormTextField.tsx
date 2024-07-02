import { type FieldPath, type FieldValues } from 'react-hook-form';

import { FormInput, type FormInputProps } from '../ui/form';
import { Input, type InputProps } from '../ui/input';

export const FormTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  inputClassName,
  placeholder,
  type,
  onBlur,
  ...props
}: FormInputProps<TFieldValues, TName> &
  Omit<InputProps, 'className'> & { inputClassName?: string }) => (
  <FormInput
    {...props}
    className={className}
    render={({ field: { value, ...field } }) => (
      <Input
        {...field}
        value={value ?? ''}
        placeholder={placeholder}
        type={type}
        className={inputClassName}
        onBlur={onBlur}
      />
    )}
  />
);
