import { type FieldPath, type FieldValues } from 'react-hook-form';
import { SelectIcon, type SelectProps, type SelectValueProps } from '@radix-ui/react-select';
import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '~/lib/utils';
import { FormInput, type FormInputProps } from '../ui/form';
import { Select, SelectContent, SelectValue } from '../ui/select';

export { SelectItem } from '../ui/select';

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  inputClassName,
  clearable,
  inputProps,
  children,
  ...props
}: FormInputProps<TFieldValues, TName> &
  Omit<SelectProps, 'className'> & {
    inputClassName?: string;
    inputProps?: SelectValueProps;
    clearable?: boolean;
  }) => (
  <FormInput
    {...props}
    className={className}
    render={({ field: { value, onChange, ...field } }) => (
      <Select
        {...field}
        onValueChange={(value) => {
          onChange(value === '' ? null : value);
        }}
        value={value ?? ''}
      >
        <SelectPrimitive.Trigger
          // ref={ref}
          className={cn(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            inputClassName,
          )}
          {...props}
        >
          <SelectValue {...inputProps} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {value && clearable && (
              <SelectIcon
                className="SelectIcon"
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                asChild
              >
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="cursor-pointer"
                  aria-label="clear selection"
                >
                  <CrossCircledIcon className="h-4 w-4 opacity-50" />
                </button>
              </SelectIcon>
            )}
            <SelectIcon className="SelectIcon">
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </SelectIcon>
          </div>
        </SelectPrimitive.Trigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    )}
  />
);
