import { type FieldPath, type FieldValues } from 'react-hook-form';

import { FormInput, type FormInputProps, FormLabel } from '../ui/form';
import { Checkbox, type CheckboxProps } from '../ui/checkbox';
import { cn } from '~/lib/utils';

export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  inputClassName,
  label,
  children,
  ...props
}: FormInputProps<TFieldValues, TName> &
  Omit<CheckboxProps, 'className'> & { inputClassName?: string }) => (
  <FormInput
    className={cn('flex flex-row items-start space-x-3 space-y-0', className)}
    {...props}
    // className={className}
    render={({ field: { value, onChange, ...field } }) => (
      <Checkbox className={inputClassName} {...field} checked={value} onCheckedChange={onChange} />
    )}
  >
    {label && <FormLabel>{label}</FormLabel>}
    {children}
  </FormInput>
);
