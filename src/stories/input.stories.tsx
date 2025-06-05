import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
    component: Input,
    title: 'UI/Input',
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
        placeholder: 'Search',
    },
};

export const Password: Story = {
    args: {
        placeholder: 'Password',
        type: 'password',
        defaultValue: 'LongLiveTheKing',
    },
};

export const Icon: Story = {
    args: {
        Icon: Search,
        placeholder: "Search"
    },   
};

export const LabelTop: Story = {
    args: {
        labelText: "Email",
        placeholder: "john@gmail.com",        
    },   
    argTypes:{
        labelPosition: {
            control: 'select',
            options: ['top', 'left'],
        },
    }
};
export const LabelLeft: Story = {
    args: {
        labelText: "Email",
        placeholder: "john@gmail.com",
        labelPosition: "left"
    },   
};

export const OnError: Story = {
    args: {
        labelText: "Email",
        placeholder: "john@gmail.com",        
        error: "Invalid email address"
    },   
};
export const OnErrorLableLeft: Story = {
    args: {
        labelText: "Email",
        placeholder: "john@gmail.com",
        labelPosition: "left",
        error: "Invalid email address"
    },   
};