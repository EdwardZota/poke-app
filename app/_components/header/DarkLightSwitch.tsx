'use client';
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';

interface DarkLightSwitchProps {
    handleChangeAction: () => void;
    mode: boolean;
}

export default function DarkLightSwitch({ handleChangeAction, mode }: DarkLightSwitchProps){
    const [checked, setChecked] = React.useState(mode);

    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        handleChangeAction?.();
    };

    return (
        <SwitchRoot>
            <SwitchInput type="checkbox" checked={checked} onChange={handleToggle} />
            <SwitchTrack>
                <SwitchThumb className={clsx(checked && 'checked')} />
            </SwitchTrack>
        </SwitchRoot>
    );
}

const blue = {
    600: '#1d88fa',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const SwitchRoot = styled('span')`
    display: inline-block;
    position: relative;
    width: 64px;
    height: 36px;
    padding: 8px;
`;

const SwitchInput = styled('input')`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
    cursor: pointer;
`;

const SwitchThumb = styled('span')`
    position: absolute;
    display: block;
    background-color: ${blue[600]};
    width: 30px;
    height: 30px;
    border-radius: 8px;
    top: 3px;
    left: 4px;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 25%;
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
    '#ffeb3b',
)}' d='M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z'/></svg>") no-repeat center center;
    }

    &.focusVisible {
        background-color: #79b;
    }

    &.checked {
        transform: translateX(24px);

        &::before {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
    '#fff',
)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>');
            background-color: #393939;
            border-radius: 25%;
        }
    }
`;

const SwitchTrack = styled('span')(
    ({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[400]};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: block;
`,
);