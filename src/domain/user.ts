import type { Branded } from "~/shared/types/utils";

export type UserName = Branded<string, 'UserName'>;

export type User = {
  id: UniqueId;
  username: UserName;
  email: Email;  
};


