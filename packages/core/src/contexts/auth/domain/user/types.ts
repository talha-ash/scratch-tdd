import type { Email, UniqueId } from '~core/shared/types/common';
import type { Branded } from '~core/shared/types/utils';

export type UserName = Branded<string, 'UserName'>;

export interface User {
    id: UniqueId;
    username: UserName;
    email: Email;
}
