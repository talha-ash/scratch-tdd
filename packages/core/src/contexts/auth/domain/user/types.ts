import type { Email, UniqueId } from '~shared/types/common';
import type { Branded } from '~shared/types/utils';

export type UserName = Branded<string, 'UserName'>;

export interface User  {
    id: UniqueId;
    username: UserName;
    email: Email;
};
