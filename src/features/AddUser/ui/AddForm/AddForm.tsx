import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FORM_USERS_FIELDS,
  UserForm,
  UserFormSchema,
  useCreateUser,
} from '~/entities/User';

import { FormControl } from '~/shared/ui/FormControl';
import { Input } from '~/shared/ui/Input';
import { Button } from '~/shared/ui/Button';
import { InputPhone } from '~/shared/ui/InputPhone';

import styles from './AddForm.module.scss';

interface IAddFormProps {
  /** A callback to close the `<Drawer />`, which will be called after clicking Cancel or Update */
  onComplete: () => void;
}

/** This component of the form is for adding a new user */
export const AddForm = ({ onComplete }: IAddFormProps) => {
  const { control, handleSubmit } = useForm<UserForm>({
    resolver: zodResolver(UserFormSchema),
  });

  const { mutate: createUser } = useCreateUser();

  const onSubmit = (data: UserForm) => {
    onComplete();
    createUser(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(FORM_USERS_FIELDS).map(([field, label]) => {
          if (field === 'phone') {
            return (
              <Controller
                key={field}
                name={field}
                control={control}
                render={({
                  field: { name, value, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl
                    label={label}
                    labelId={name}
                    error={error?.message}
                  >
                    <InputPhone
                      id={name}
                      name={name}
                      phoneCode="7"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      variant="filled"
                    />
                  </FormControl>
                )}
              />
            );
          }

          return (
            <Controller
              key={field}
              name={field as keyof UserForm}
              control={control}
              render={({
                field: { name, onChange },
                fieldState: { error },
              }) => (
                <FormControl
                  label={label}
                  labelId={name}
                  error={error?.message}
                >
                  <Input
                    id={name}
                    name={name}
                    onChange={onChange}
                    error={!!error}
                    variant="filled"
                  />
                </FormControl>
              )}
            />
          );
        })}

        <div className={styles.actions}>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            data-testid="cancel-add-user"
            onClick={onComplete}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" data-testid="add-user">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
