import React from 'react';
import { css } from '@emotion/core';

const container = css`
    height: 36px;
    width: 36px;
`;

const EnvironmentMomentBannerRoundel: React.FC = () => (
    <div css={container}>
        <svg
            width="36"
            height="36"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 18.5C0 8.28258 8.28289 0 18.5001 0C28.7174 0 37 8.28258 37 18.5C37 28.7173 28.7174 37 18.5001 37C8.28289 37 0 28.7173 0 18.5ZM27.787 20.3627L29.686 19.5138V18.9301H19.3604V19.459L21.378 20.1718V30.4374V31.6312V32.2673C23.9891 31.7223 26.7189 30.1364 27.787 29.119V20.3627ZM20.1627 4.92877C20.1819 4.92877 20.2209 4.92913 20.2209 4.92913V4.32915C13.8033 3.90004 5.04066 8.68116 5.16407 18.5144C5.04066 28.3195 13.8033 33.1006 20.2209 32.6715V32.0716L20.1627 32.0718C15.882 32.0718 13.433 26.3001 13.5564 18.4862C13.433 10.7007 15.882 4.92877 20.1627 4.92877ZM27.9649 7.50385C26.8893 6.33369 24.0211 4.68541 21.5114 4.30212V4.89837L27.3469 12.9068H27.9649V7.50385Z"
                fill="black"
            />
        </svg>
    </div>
);

export default EnvironmentMomentBannerRoundel;
