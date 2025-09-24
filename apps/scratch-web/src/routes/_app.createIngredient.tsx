import { createFileRoute } from '@tanstack/react-router';
import { CreateIngredientForm } from '~/contexts/recipeCreation/useCases/createIngredient/components/createIngredientForm';

export const Route = createFileRoute('/_app/createIngredient')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <CreateIngredientForm />
        </div>
    );
}
