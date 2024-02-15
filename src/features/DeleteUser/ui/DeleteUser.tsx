import { useDeleteUser } from '~/entities/User';

import { Button } from '~/shared/ui/Button';

interface IDeleteUserProps {
  /** ID of the user to be deleted */
  id: string | null;
  /** The callback that will be called after pressing the button */
  onComplete: () => void;
}

/** This component is used to delete the user on the server */
export const DeleteUser = ({ id, onComplete }: IDeleteUserProps) => {
  const { mutate: deleteUser } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUser(id);
    onComplete();
  };

  return (
    <Button
      type="button"
      onClick={handleDeleteUser}
      variant="danger"
      size="sm"
      data-testid="delete-user"
    >
      Delete
    </Button>
  );
};
