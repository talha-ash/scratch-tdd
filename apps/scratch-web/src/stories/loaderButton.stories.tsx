import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoaderButton } from '~/components/ui/loaderButton';

type StoryProps = ComponentProps<typeof LoaderButton>;

const meta: Meta<StoryProps> = {
    component: LoaderButton,
    title: 'UI/LoaderButton',
    argTypes: {
        variant: {
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            control: { type: 'select' },
        },
        asChild: {
            control: false,
        },
    },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        children: 'Hello Button',
        loading: true,
    },
};
