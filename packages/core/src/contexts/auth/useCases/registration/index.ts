export * as RegistrationApi from './registerAdapter';
export * as RegistrationService from './registerService';
import { useRegistrationFormHandler } from './useRegistrationFormHandler';
import { useRegistrationMutation } from './useRegistrationMutation';

const RegistrationHooks = { useRegistrationFormHandler, useRegistrationMutation };

export { RegistrationHooks };
