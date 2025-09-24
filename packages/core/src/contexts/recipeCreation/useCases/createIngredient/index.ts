export * as CreateIngredientApi from './createIngredientAdapter';
export * as CreateIngredientService from './createIngredientService';
import { useCreateIngredientFormHandler } from './useCreateIngredientFormHandler';
import { useCreateIngredientMutation } from './useCreateIngredientMutation';

const CreateIngredientHooks = { useCreateIngredientFormHandler, useCreateIngredientMutation };

export { CreateIngredientHooks };
