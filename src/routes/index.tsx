import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    const { successToast } = useToastNotification();

    useEffect(() => {
        successToast('Welcome to the home page!');
    }, []);
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <Button>Hello World</Button>
        </div>
    );
}
