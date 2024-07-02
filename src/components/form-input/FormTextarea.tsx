import { type FieldPath, type FieldValues } from 'react-hook-form';

import { cn } from '~/lib/utils';
import { FormInput, type FormInputProps } from '../ui/form';
import { Textarea } from '../ui/textarea';

const rowHeight = {
  1: 'h-8',
  2: 'h-16',
  3: 'h-24',
  4: 'h-28',
  5: 'h-32',
  6: 'h-36',
};

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  rows = 3,
  noResize = false,
  ...props
}: FormInputProps<TFieldValues, TName> & { rows?: number; noResize?: boolean }) => (
  <FormInput
    {...props}
    className={className}
    render={({ field: { value, ...field } }) => (
      <Textarea
        className={cn(rowHeight[rows as keyof typeof rowHeight], noResize && 'resize-none')}
        {...field}
        value={value ?? ''}
      />
    )}
  />
);
