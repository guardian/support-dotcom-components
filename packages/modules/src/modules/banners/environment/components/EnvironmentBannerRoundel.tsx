import React from 'react';
import { css } from '@emotion/react';
import type { ReactComponent } from '../../../../types';

const container = css`
    height: 36px;
    width: 36px;
`;

export const EnvironmentBannerRoundel: ReactComponent = () => (
    <div css={container}>
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0001 0C8.05903 0 0 8.05873 0 18C0 27.9412 8.05903 36 18.0001 36C27.9412 36 36 27.9412 36 18C36 8.05873 27.9412 0 18.0001 0Z"
                fill="#121212"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 18C0 8.05873 8.05903 0 18.0001 0C27.9412 0 36 8.05873 36 18C36 27.9412 27.9412 36 18.0001 36C8.05903 36 0 27.9412 0 18ZM27.036 19.8123L28.8837 18.9864V18.4185H18.8371V18.9331L20.8003 19.6266V29.6148V30.7763V31.3952C23.3408 30.8649 25.9967 29.3219 27.036 28.332V19.8123ZM19.6177 4.79558C19.6365 4.79558 19.6744 4.79593 19.6744 4.79593V4.21216C13.4302 3.79465 4.90442 8.44655 5.0245 18.014C4.90442 27.5541 13.4302 32.206 19.6744 31.7885V31.2048L19.6177 31.2051C15.4527 31.2051 13.0699 25.5893 13.19 17.9866C13.0699 10.4115 15.4527 4.79558 19.6177 4.79558ZM27.2091 7.30104C26.1626 6.16251 23.3719 4.55878 20.93 4.18584V4.76598L26.6078 12.5579H27.2091V7.30104Z"
                fill="white"
            />
        </svg>
    </div>
);
