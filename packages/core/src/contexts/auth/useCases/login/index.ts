export * as LoginApi from './loginAdapter';
export * as LoginService from './loginService';
import { useLoginFormHandler } from './useLoginFormHandler';
import { useLoginMutation } from './useLoginMutation';

const LoginHooks = { useLoginFormHandler, useLoginMutation };

export { LoginHooks };
