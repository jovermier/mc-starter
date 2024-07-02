import { type FieldPath, type FieldValues } from 'react-hook-form';

import { cn } from '~/lib/utils';
import { FormInput, type FormInputProps } from '../ui/form';
import { Switch } from '../ui/switch';

export const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  ...props
}: FormInputProps<TFieldValues, TName>) => (
  <FormInput
    {...props}
    className={cn(
      'mb-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm',
      className,
    )}
    render={({ field: { onChange, value, ...field } }) => (
      <Switch {...field} checked={value} onCheckedChange={onChange} />
    )}
  />
);
