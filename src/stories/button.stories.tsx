import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../components/ui/button';

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
    component: Button,
    title: 'UI/Button',
    argTypes: {
        variant: {
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            control: { type: 'select' },
        },
        asChild: {
            control: false
        }
    }
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        children: 'Hello Button',
    },
};

export const Outline: Story = {
    args: {
        children: 'Hello Button',
        variant: 'outline',
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Hello Button',
        variant: 'default',
        size: 'default',
        width: 'full',
    },    
    render: (args) => (
        <div className="border w-36">
            <Button {...args} />
        </div>
    ),
};
