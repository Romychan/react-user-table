import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FORM_USERS_FIELDS,
  User,
  UserForm,
  UserFormSchema,
  useUpdateUser,
  useUserStore,
} from '~/entities/User';

import { Button } from '~/shared/ui/Button';
import { FormControl } from '~/shared/ui/FormControl';
import { Input } from '~/shared/ui/Input';
import { InputPhone } from '~/shared/ui/InputPhone';

import styles from './UpdateUser.module.scss';

interface IUpdateUserProps {
  /** Initial user data */
  user: User;
  /** A slot for additional actions */
  actionSlot?: ReactNode;
}

/** This component of the form is for updating the user on the server */
export const UpdateUser = ({ user, actionSlot }: IUpdateUserProps) => {
  const { setCurrentUserId } = useUserStore();

  const { mutate: updateUser } = useUpdateUser();

  const { control, handleSubmit } = useForm<UserForm>({
    resolver: zodResolver(UserFormSchema),
    values: { ...user },
  });

  const handleUpdateSubmit = (data: UserForm) => {
    updateUser({ ...data, id: user.id, image: user.image });
    setCurrentUserId({ id: null });
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(handleUpdateSubmit)}
      data-testid="update-user-form"
    >
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
                  variant="secondary"
                  labelPosition="left"
                  error={error?.message}
                >
                  <InputPhone
                    id={name}
                    name={name}
                    phoneCode="7"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    variant="unfilled"
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
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <FormControl
                label={label}
                labelId={name}
                variant="secondary"
                labelPosition="left"
                error={error?.message}
              >
                <Input
                  id={name}
                  name={name}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  variant="unfilled"
                />
              </FormControl>
            )}
          />
        );
      })}

      <div className={styles.actions}>
        {actionSlot}
        <Button type="submit" size="sm" data-testid="update-user">
          Update
        </Button>
      </div>
    </form>
  );
};
