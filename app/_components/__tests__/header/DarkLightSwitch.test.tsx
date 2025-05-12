import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkLightSwitch from "@/app/_components/header/DarkLightSwitch";

describe('DarkLightSwitch', () => {
    it('renders with initial mode', () => {
        render(<DarkLightSwitch mode={false} handleChangeAction={jest.fn()} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('toggles when clicked', () => {
        const handleChangeAction = jest.fn();
        render(<DarkLightSwitch mode={false} handleChangeAction={handleChangeAction} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(handleChangeAction).toHaveBeenCalled();
    });

    it('respects initial checked state', () => {
        render(<DarkLightSwitch mode={true} handleChangeAction={jest.fn()} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });
});
