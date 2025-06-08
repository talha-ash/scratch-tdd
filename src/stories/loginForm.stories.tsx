import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoginForm } from '~/contexts/auth/components/loginForm';

type StoryProps = ComponentProps<typeof LoginForm>;

const meta: Meta<StoryProps> = {
    component: LoginForm,
    title: 'Login/LoginForm',
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
