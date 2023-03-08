// import { css } from '@emotion/react';
import React from 'react';

// const styles = {
// };

export const ChoiceCardTab = ({
    id,
    label,
    value,
    onChange,
    checked,
    defaultChecked,
    type = 'radio',
}: {
    id: string;
    label: string;
    value: string;
    onChange: () => void;
    checked?: boolean;
    defaultChecked?: boolean;
    type?: string;
}): JSX.Element => {
    const isChecked = (): boolean => {
        if (checked != null) {
            return checked;
        }

        return !!defaultChecked;
    };

    return (
        <>
            <input
                id={id}
                value={value}
                defaultChecked={defaultChecked != null ? defaultChecked : undefined}
                checked={checked != null ? isChecked() : undefined}
                onChange={onChange}
                type={type}
            />
            <label htmlFor={id}>
                <div>{label}</div>
            </label>
        </>
    );
};
