import type { Brand } from "~/shared/types/utils";

export type UserName = Brand<string, 'UserName'>;

export type User = {
  id: UniqueId;
  username: UserName;
  email: Email;  
};


