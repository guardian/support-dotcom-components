import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';

export const UsEoyMomentBannerVisualV3 = (): JSX.Element => {
    return (
        <div css={styles}>
            <div className="year_number year_number1">
                <div className="inside_number">2</div>
            </div>
            <div className="year_number year_number2">
                <div className="inside_number">0</div>
            </div>
            <div className="year_number year_number3">
                <div className="inside_number">2</div>
            </div>
            <div className="year_number year_number4">
                <div className="number_animation">
                    <div className="inside_number">3</div>
                    <div className="inside_number">2</div>
                    <div className="inside_number">1</div>
                    <div className="inside_number">0</div>
                    <div className="inside_number">1</div>
                    <div className="inside_number">5</div>
                    <div className="inside_number">7</div>
                    <div className="inside_number">6</div>
                    <div className="inside_number">9</div>
                    <div className="inside_number">8</div>
                    <div className="inside_number">1</div>
                    <div className="inside_number">2</div>
                    <div className="inside_number">3</div>
                </div>
            </div>
        </div>
    );
};

// ---- Styles ---- //

const styles = css`
    background-image: url(https://interactive.guim.co.uk/thrashers/us-eoy-2022-v3/hashed/mobile.8a0cfa8e.png);
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 32px auto 16px;

    ${from.mobileMedium} {
        width: 300px;
        height: 108px;
    }
    ${from.mobileLandscape} {
        width: 360px;
        height: 130px;
    }
    ${from.phablet} {
        width: 480px;
        height: 172px;
    }

    ${from.tablet} {
        width: 100%;
        height: 250px;
        margin-bottom: 0;

        background-image: url(https://interactive.guim.co.uk/thrashers/us-eoy-2022-v3/hashed/desktop.90cec45d.png);
        overflow: hidden;
        bottom: 0px;
        max-width: 100%;
        background-position: 100% 100%;
        background-repeat: no-repeat;
        background-size: contain;
    }

    ${from.desktop} {
        height: 290px;
    }

    ${from.leftCol} {
        background-position-x: 50%;
    }

    & .year_number {
        position: absolute;
        font-size: 60px;
        font-family: 'Guardian Titlepiece', 'Guardian Headline Full', 'Guardian Headline',
            'Guardian Egyptian Web', Georgia, serif;
        font-weight: bold;
        width: 22%;
        height: 80px;
        line-height: 90px;
        text-align: center;
        overflow: hidden;
    }

    & .year_number .inside_number {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    & .year_number1 {
        bottom: 46%;
        left: 11%;
        color: #c70000;

        ${from.tablet} {
            bottom: 53%;
            left: 4.2%;
        }

        ${from.desktop} {
            bottom: 63%;
            left: 4.2%;
        }

        ${from.leftCol} {
            left: 8%;
        }
    }

    & .year_number2 {
        bottom: 56%;
        left: 29.6%;
        color: #e05e00;

        ${from.tablet} {
            bottom: 67%;
            left: 27.6%;
        }

        ${from.desktop} {
            bottom: 78%;
            left: 27.6%;
        }

        ${from.leftCol} {
            left: 28.6%;
        }
    }

    & .year_number3 {
        bottom: 35%;
        left: 49%;
        color: #0084c6;

        ${from.phablet} {
            bottom: 35.5%;
        }

        ${from.tablet} {
            bottom: 47.5%;
            left: 50%;
        }

        ${from.desktop} {
            bottom: 55.5%;
            left: 50%;
        }

        ${from.leftCol} {
            left: 49%;
        }
    }

    & .year_number4 {
        bottom: 54.5%;
        left: 68.5%;
        color: #7d0068;

        ${from.tablet} {
            bottom: 152px;
            left: 73.8%;
        }

        ${from.desktop} {
            bottom: 205px;
            left: 73.8%;
        }

        ${from.leftCol} {
            left: 69.5%;
        }
    }

    & .number_animation {
        position: absolute;
        bottom: -100%;
        left: 0;
        width: 100%;
        height: 1300%;
        -webkit-animation-duration: 7s;
        animation-duration: 7s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-name: bounce;
        animation-name: bounce;
        -webkit-animation-timing-function: cubic-bezier(0.67, 0.015, 0.26, 0.995);
        animation-timing-function: cubic-bezier(0.67, 0.015, 0.26, 0.995);
    }
    @-webkit-keyframes bounce {
        0% {
            bottom: -100%;
        }
        40% {
            bottom: -100%;
        }
        70% {
            bottom: -1200%;
        }
        100% {
            bottom: -1200%;
        }
    }
    @keyframes bounce {
        0% {
            bottom: -100%;
        }
        40% {
            bottom: -100%;
        }
        70% {
            bottom: -1200%;
        }
        100% {
            bottom: -1200%;
        }
    }
    & .year_number4 .inside_number {
        height: 7.6923076923%;
        bottom: 0px;
        vertical-align: text-bottom;
    }
    & .year_number4 .inside_number:nth-child(2) {
        bottom: 7.6923076923%;
    }
    & .year_number4 .inside_number:nth-child(3) {
        bottom: 15.3846153846%;
    }
    & .year_number4 .inside_number:nth-child(4) {
        bottom: 23.0769230769%;
    }
    & .year_number4 .inside_number:nth-child(5) {
        bottom: 30.7692307692%;
    }
    & .year_number4 .inside_number:nth-child(6) {
        bottom: 38.4615384615%;
    }
    & .year_number4 .inside_number:nth-child(7) {
        bottom: 46.1538461538%;
    }
    & .year_number4 .inside_number:nth-child(8) {
        bottom: 53.8461538461%;
    }
    & .year_number4 .inside_number:nth-child(9) {
        bottom: 61.5384615384%;
    }
    & .year_number4 .inside_number:nth-child(10) {
        bottom: 69.2307692307%;
    }
    & .year_number4 .inside_number:nth-child(11) {
        bottom: 76.923076923%;
    }
    & .year_number4 .inside_number:nth-child(12) {
        bottom: 84.6153846153%;
    }
    & .year_number4 .inside_number:nth-child(13) {
        bottom: 92.3076923076%;
    }
`;
