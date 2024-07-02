import { type FieldPath, type FieldValues } from 'react-hook-form';

import { FormInput, type FormInputProps } from '../ui/form';
import { DateInput, type DateInputProps } from '../date-input';

export const FormDateField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  inputClassName,
  ...props
}: FormInputProps<TFieldValues, TName> &
  Omit<DateInputProps, 'className'> & { inputClassName?: string }) => (
  <FormInput
    {...props}
    className={`relative w-full ${className}`}
    render={({ field: { value, ...field } }) => (
      <DateInput {...field} value={value ?? ''} className={`w-full pr-10 ${inputClassName}`} />
    )}
  />
);
