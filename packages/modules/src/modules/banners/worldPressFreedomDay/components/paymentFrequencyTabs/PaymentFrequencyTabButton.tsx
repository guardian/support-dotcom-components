import React from 'react';
import { css } from '@emotion/react';
import { brand, neutral, space } from '@guardian/source-foundations';
import { ReactNode } from 'react';
import { textSans } from '@guardian/source-foundations';

const tabButtonStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    background-color: ${brand[500]};
    color: ${neutral[100]};
    margin: 0;
    border: none;
    border-bottom: 1px solid ${neutral[86]};
    flex-grow: 1;
    padding: ${space[3]}px 0;
    cursor: pointer;

    /* .src-focus-disabled is added by the Source FocusStyleManager */
    html:not(.src-focus-disabled) &:focus {
        outline: 5px solid ${neutral[86]};
        outline-offset: -5px;
    }

    :not(:last-of-type) {
        border-right: 1px solid ${neutral[86]};
    }

    &[aria-selected='true'] {
        background-color: ${neutral[100]};
        color: ${neutral[7]};
        border-bottom: none;

        html:not(.src-focus-disabled) &:focus {
            outline-color: #0077b6;
        }
    }

    &[aria-selected='false'] {
        color: ${neutral[100]};
    }
`;

export type PaymentFrequencyTabButtonAttributes = {
    role: 'tab';
    id: string;
    ariaSelected: 'true' | 'false';
    ariaControls: string;
};

export type PaymentFrequencyTabButtonProps = PaymentFrequencyTabButtonAttributes & {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
};

export function PaymentFrequencyTabButton({
    role,
    id,
    ariaControls,
    ariaSelected,
    onClick,
    children,
}: PaymentFrequencyTabButtonProps): JSX.Element {
    return (
        <button
            css={tabButtonStyles}
            role={role}
            id={id}
            aria-controls={ariaControls}
            aria-selected={ariaSelected}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
