import React from 'react';
import { css } from '@emotion/react';
import {Button} from "./Button";
import {headline} from "@guardian/src-foundations/typography";
import {space} from "@guardian/src-foundations";

type Props = {};

const container = css`
    position: relative;
    height: 400px;
    overflow: hidden;
    width: 100%;
`;

const topMessageContainer = css`
    position: relative;
    height: 50px;
`;

const topMessage = (index: number) => {
    return css`
        position: absolute;
        top: 0;
        ${headline.xxsmall({ fontWeight: 'bold' })}
        margin-top: 0;
        margin-bottom: ${space[3]}px;
        
        
        animation-name: message${index};
        animation-duration: 5s;
        animation-delay: ${index * 5}s;
        opacity: 0;
        
        @keyframes message${index} {
            0% {
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `;
};

const animatedColumns = css`

`;

const leftCol = css`
    width: 50%;
    position: relative;
    float: left;
    height: 400px;
    background-color: white;
    overflow: hidden;
`;

const centreCol = css`
    width: 30%;
    position: absolute;
    transform: translateX(-50%);
    left: 60%;
    height: 400px;
    overflow: hidden;
`;
const dateCss = css`
    background-color: white;
    padding: 10px;
    border-radius: 50%;
    border-color: lightgrey;
`;

const rightCol = css`
    width: 30%;
    position: relative;
    float: right;
    height: 400px;
    background-color: white;
    overflow: hidden;
`;

const datePosition = (dateString: string) => {
    const time = new Date(dateString).getTime();
    const percentage = (time - rangeLow) / (rangeHigh - rangeLow);
    return animatePosition(percentage, time.toString());
};

const animatePosition = (percentage: number, id: string) => {
    const phases = 4;
    const phase = Math.floor(percentage * phases);
    const withinPhase = (percentage - ((1 / phases) * phase)) * phases;
    console.log('percentage: ' + percentage + ',phase: ' + phase + ', withinPhase: ' + withinPhase);
    return css`
        position: absolute;
        animation-name: scrollIt${id};
        animation-duration: 10s;
        animation-delay: ${10 + (withinPhase * 5) + (phase * 5)}s;
        animation-fill-mode: forwards;
        top: 0px;
        opacity: 0;
        width: 100%;

        @keyframes scrollIt${id} {
            0% {
                transform: translateY(0%);
                top: 0%;
                opacity: 0;
            }
            10% {
                transform: translateY(${withinPhase * -100}%);
                top: ${withinPhase * 100}%;
                opacity: 1;
            }
            20% {
                transform: translateY(${withinPhase * -90}%);
                top: ${withinPhase * 90}%;
                opacity: 0.3;
            }
            100% {
                filter: blur(2px);
                opacity: 0;
            }
        }
    `;
};

export const EpicEnvironment: React.FC<Props> = (allProps: Props) => {
    return (
        <div css={container}>
            <div css={topMessageContainer}>
                <div css={topMessage(0)}>We have produced 3000 environment articles in the past year...</div>
                <div css={topMessage(1)}>...and over a million readers have supported us...</div>
                <div css={topMessage(6)}>...we aren't going to give up now...</div>
                <div css={topMessage(7)}>...please show your support today</div>
            </div>
            <div css={animatedColumns}>
                <div css={leftCol}>
                    {articles.map(article => (
                        <div css={datePosition(article[0])}>
                            <a href={article[2]}>{article[1]}</a>
                        </div>
                    ))}
                </div>
                <div css={rightCol}>
                    {console.log('con', contributions)}
                    {contributions.map((contribution, index) => (
                        <div css={animatePosition(contribution, "R"+index.toString())}>
                            <Button onClickAction={() => {}} showArrow>
                                Support The Guardian
                            </Button>
                        </div>
                    ))}
                </div>
                <div css={centreCol}>
                    {dates.map((date, index) => {
                        return (
                            <div css={animatePosition(index / dates.length, "D" + index.toString())}>
                                <div css={dateCss}>{date}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const dates = [
    'October 2020',
    'November 2020',
    'December 2020',
    'January 2021',
    'February 2021',
    'March 2021',
    'April 2021',
    'May 2021',
    'June 2021',
    'July 2021',
    'August 2021',
    'September 2021',
];

const contributions = Array.from({ length: 50 }, () => Math.random()).sort();

const rangeLow = new Date('2019-09-16T04:00:45Z').getTime();
const rangeHigh = new Date('2020-08-07T09:00:33Z').getTime();

const articles = [
    [
        '2019-09-16T04:00:45Z',
        '$1m a minute: the farming subsidies destroying the world - report',
        'https://www.theguardian.com/environment/2019/sep/16/1m-a-minute-the-farming-subsidies-destroying-the-world',
    ],
    [
        '2019-09-23T19:27:17Z',
        'Greta Thunberg condemns world leaders in emotional speech at UN',
        'https://www.theguardian.com/environment/2019/sep/23/greta-thunberg-speech-un-2019-address',
    ],
    [
        '2019-10-09T11:00:11Z',
        'Revealed: the 20 firms behind a third of all carbon emissions',
        'https://www.theguardian.com/environment/2019/oct/09/revealed-20-firms-third-carbon-emissions',
    ],
    [
        '2019-10-10T11:00:16Z',
        'Exclusive: carmakers among key opponents of climate action',
        'https://www.theguardian.com/environment/2019/oct/10/exclusive-carmakers-opponents-climate-action-us-europe-emissions',
    ],
    [
        '2019-10-11T06:00:09Z',
        'Revealed: Google made large contributions to climate change deniers',
        'https://www.theguardian.com/environment/2019/oct/11/google-contributions-climate-change-deniers',
    ],
    [
        '2019-10-22T05:01:15Z',
        'The real David Attenborough',
        'https://www.theguardian.com/tv-and-radio/2019/oct/22/david-attenborough-climate-change-bbc',
    ],
    [
        '2019-11-13T10:57:51Z',
        'Air pollution nanoparticles linked to brain cancer for first time',
        'https://www.theguardian.com/environment/2019/nov/13/air-pollution-particles-linked-to-brain-cancer-in-new-research',
    ],
    [
        '2019-11-18T16:13:38Z',
        "Amazon deforestation 'at highest level in a decade'",
        'https://www.theguardian.com/environment/2019/nov/18/amazon-deforestation-at-highest-level-in-a-decade',
    ],
    [
        '2019-12-18T07:00:12Z',
        "How water is helping to end 'the first climate change war'",
        'https://www.theguardian.com/world/2019/dec/18/how-water-is-helping-to-end-the-first-climate-change-war',
    ],
    [
        '2019-12-27T11:00:38Z',
        'Revealed: microplastic pollution is raining down on city dwellers',
        'https://www.theguardian.com/environment/2019/dec/27/revealed-microplastic-pollution-is-raining-down-on-city-dwellers',
    ],
    [
        '2020-01-08T06:00:20Z',
        "'Like sending bees to war': the deadly truth behind your almond milk obsession",
        'https://www.theguardian.com/environment/2020/jan/07/honeybees-deaths-almonds-hives-aoe',
    ],
    [
        '2020-01-13T16:57:33Z',
        'Ocean temperatures hit record high as rate of heating accelerates',
        'https://www.theguardian.com/environment/2020/jan/13/ocean-temperatures-hit-record-high-as-rate-of-heating-accelerates',
    ],
    [
        '2020-02-02T16:40:30Z',
        'Will HS2 really help cut the UK’s carbon footprint?',
        'https://www.theguardian.com/uk-news/2020/feb/02/will-hs2-really-help-cut-the-uks-carbon-footprint',
    ],
    [
        '2020-02-02T16:40:54Z',
        "Fears grow over HS2's potential impact on biodiversity",
        'https://www.theguardian.com/uk-news/2020/feb/02/fears-grow-over-hs2s-potential-impact-on-biodiversity',
    ],
    [
        '2020-02-11T03:01:31Z',
        "Counting the cost of the bushfires: Australia's summer of dread",
        'https://www.theguardian.com/environment/ng-interactive/2020/feb/11/counting-the-cost-of-australias-summer-of-dread',
    ],
    [
        '2020-02-13T13:48:26Z',
        'Antarctic temperature rises above 20C for first time on record',
        'https://www.theguardian.com/world/2020/feb/13/antarctic-temperature-rises-above-20c-first-time-record',
    ],
    [
        '2020-02-17T07:00:51Z',
        'Beavers cut flooding and pollution and boost wildlife populations',
        'https://www.theguardian.com/environment/2020/feb/17/beavers-cut-flooding-and-pollution-and-boost-wildlife-populations',
    ],
    [
        '2020-02-21T08:00:48Z',
        'Revealed: quarter of all tweets about climate crisis produced by bots',
        'https://www.theguardian.com/technology/2020/feb/21/climate-tweets-twitter-bots-analysis',
    ],
    [
        '2020-03-18T06:00:16Z',
        "'Tip of the iceberg': is our destruction of nature responsible for Covid-19?",
        'https://www.theguardian.com/environment/2020/mar/18/tip-of-the-iceberg-is-our-destruction-of-nature-responsible-for-covid-19-aoe',
    ],
    [
        '2020-03-25T05:12:51Z',
        'Great Barrier Reef suffers third mass coral bleaching event in five years',
        'https://www.theguardian.com/environment/2020/mar/25/great-barrier-reef-suffers-third-mass-coral-bleaching-event-in-five-years',
    ],
    [
        '2020-03-25T07:00:53Z',
        "Coronavirus: 'Nature is sending us a message’, says UN environment chief",
        'https://www.theguardian.com/world/2020/mar/25/coronavirus-nature-is-sending-us-a-message-says-un-environment-chief',
    ],
    [
        '2020-03-27T11:19:09Z',
        'Canada mourns Takaya – the lone sea wolf whose spirit captured the world',
        'https://www.theguardian.com/environment/2020/mar/27/canada-mourns-takaya-the-lone-sea-wolf-whose-spirit-captured-the-world-aoe',
    ],
    [
        '2020-04-08T15:00:20Z',
        'Scientists create mutant enzyme that recycles plastic bottles in hours',
        'https://www.theguardian.com/environment/2020/apr/08/scientists-create-mutant-enzyme-that-recycles-plastic-bottles-in-hours',
    ],
    [
        '2020-04-09T05:00:37Z',
        'The sound of icebergs melting: my journey into the Antarctic',
        'https://www.theguardian.com/world/ng-interactive/2020/apr/09/sound-of-icebergs-melting-journey-into-antarctic-jonathan-watts-greenpeace',
    ],
    [
        '2020-04-17T09:00:10Z',
        'Polluter bailouts and lobbying during Covid-19 pandemic',
        'https://www.theguardian.com/environment/2020/apr/17/polluter-bailouts-and-lobbying-during-covid-19-pandemic',
    ],
    [
        '2020-04-21T22:34:30Z',
        "Coronavirus pandemic 'will cause famine of biblical proportions'",
        'https://www.theguardian.com/global-development/2020/apr/21/coronavirus-pandemic-will-cause-famine-of-biblical-proportions',
    ],
    [
        '2020-04-24T13:29:23Z',
        'Coronavirus detected on particles of air pollution',
        'https://www.theguardian.com/environment/2020/apr/24/coronavirus-detected-particles-air-pollution',
    ],
    [
        '2020-04-27T09:21:56Z',
        'Halt destruction of nature or suffer even worse pandemics, say world’s top scientists',
        'https://www.theguardian.com/world/2020/apr/27/halt-destruction-nature-worse-pandemics-top-scientists',
    ],
    [
        '2020-05-04T06:00:13Z',
        'Is air pollution making the coronavirus pandemic even more deadly?',
        'https://www.theguardian.com/world/2020/may/04/is-air-pollution-making-the-coronavirus-pandemic-even-more-deadly',
    ],
    [
        '2020-05-14T06:30:02Z',
        "'Everyone's on top of you, sneezing and coughing': life inside Ireland's meat plants",
        'https://www.theguardian.com/environment/2020/may/14/everyones-on-top-of-you-sneezing-and-coughing-life-inside-irelands-meat-plants-covid-19',
    ],
    [
        '2020-05-17T14:26:30Z',
        "Is the Covid-19 crisis the catalyst for greening the world's airlines?",
        'https://www.theguardian.com/world/2020/may/17/is-covid-19-crisis-the-catalyst-for-the-greening-of-worlds-airlines',
    ],
    [
        '2020-05-18T14:00:30Z',
        "'A new normal': how coronavirus will transform transport in Britain's cities",
        'https://www.theguardian.com/environment/2020/may/18/a-new-normal-how-coronavirus-will-transform-transport-in-britains-cities',
    ],
    [
        '2020-05-18T14:00:30Z',
        'Coronavirus offers chance to create fairer UK food supply chain, say experts',
        'https://www.theguardian.com/environment/2020/may/18/coronavirus-offers-chance-to-create-fairer-uk-food-supply-chain-say-experts',
    ],
    [
        '2020-05-19T11:13:20Z',
        "How renewable energy could power Britain's economic recovery",
        'https://www.theguardian.com/environment/2020/may/19/how-renewable-energy-could-power-britains-economic-recovery',
    ],
    [
        '2020-06-09T16:01:02Z',
        'World faces worst food crisis for at least 50 years, UN warns',
        'https://www.theguardian.com/society/2020/jun/09/world-faces-worst-food-crisis-50-years-un-coronavirus',
    ],
    [
        '2020-06-12T20:00:02Z',
        'Gas ‘completely dominated’ discussion about Covid-19 recovery, commission adviser says',
        'https://www.theguardian.com/australia-news/2020/jun/13/gas-completely-dominated-discussion-about-covid-19-recovery-commission-adviser-says',
    ],
    [
        '2020-06-23T09:00:42Z',
        'Revealed: millions of Americans can’t afford water as bills rise 80% in a decade',
        'https://www.theguardian.com/us-news/2020/jun/23/millions-of-americans-cant-afford-water-bills-rise',
    ],
    [
        '2020-07-01T13:35:31Z',
        'Hundreds of elephants dead in mysterious mass die-off',
        'https://www.theguardian.com/environment/2020/jul/01/more-than-350-elephants-dead-in-mysterious-mass-die-off-botswana-aoe',
    ],
    [
        '2020-07-01T14:00:24Z',
        "Exclusive: water firms discharged raw sewage into England's rivers 200,000 times in 2019",
        'https://www.theguardian.com/environment/2020/jul/01/water-firms-raw-sewage-england-rivers',
    ],
    [
        '2020-07-06T06:00:04Z',
        'Britain beyond lockdown: what we learned from two weeks on the road',
        'https://www.theguardian.com/politics/2020/jul/06/britain-beyond-lockdown-what-we-learned-from-two-weeks-on-the-road',
    ],
    [
        '2020-07-06T16:00:07Z',
        'Coronavirus: world treating symptoms, not cause of pandemics, says UN',
        'https://www.theguardian.com/world/2020/jul/06/coronavirus-world-treating-symptoms-not-cause-pandemics-un-report',
    ],
    [
        '2020-07-07T10:00:26Z',
        'Over 5,600 fossil fuel companies have taken at least $3bn in US Covid-19 aid',
        'https://www.theguardian.com/environment/2020/jul/07/fossil-fuel-industry-coronavirus-aid-us-analysis',
    ],
    [
        '2020-07-10T06:00:09Z',
        'Wild bison to return to UK for first time in 6,000 years',
        'https://www.theguardian.com/environment/2020/jul/10/wild-bison-to-return-to-uk-kent',
    ],
    [
        '2020-07-13T11:00:08Z',
        '‘Compelling’ evidence air pollution worsens coronavirus – study',
        'https://www.theguardian.com/world/2020/jul/13/compelling-evidence-air-pollution-worsens-coronavirus-study',
    ],
    [
        '2020-07-14T06:00:42Z',
        'Farmers hatch plan to return area the size of Dorset to wild nature',
        'https://www.theguardian.com/environment/2020/jul/14/farmers-wildeast-hatch-plan-return-area-size-dorset-wild-nature-east-anglia',
    ],
    [
        '2020-07-19T10:00:00Z',
        'Covid-19 impact on ethnic minorities linked to housing and air pollution',
        'https://www.theguardian.com/world/2020/jul/19/covid-19-impact-on-ethnic-minorities-linked-to-housing-and-air-pollution',
    ],
    [
        '2020-07-23T18:00:00Z',
        "Cost of preventing next pandemic 'equal to just 2% of Covid-19 economic damage'",
        'https://www.theguardian.com/world/2020/jul/23/preventing-next-pandemic-fraction-cost-covid-19-economic-fallout',
    ],
    [
        '2020-07-27T07:00:47Z',
        'How the global climate fight could be lost if Trump is re-elected',
        'https://www.theguardian.com/us-news/2020/jul/27/global-climate-fight-could-be-lost-trump-re-elected',
    ],
    [
        '2020-07-28T09:00:19Z',
        'Killer heat: US racial injustices will worsen as climate crisis escalates',
        'https://www.theguardian.com/us-news/2020/jul/28/us-racial-injustices-will-worsen-climate-crisis-escalates',
    ],
    [
        '2020-07-29T02:00:19Z',
        'Australia after the bushfires',
        'https://www.theguardian.com/environment/ng-interactive/2020/jul/29/australia-after-the-bushfires-aoe',
    ],
    [
        '2020-08-04T05:00:00Z',
        'The evolution of Extinction Rebellion',
        'https://www.theguardian.com/environment/2020/aug/04/evolution-of-extinction-rebellion-climate-emergency-protest-coronavirus-pandemic',
    ],
    [
        '2020-08-06T05:00:21Z',
        "England's first wild beavers for 400 years allowed to live on River Otter",
        'https://www.theguardian.com/environment/2020/aug/06/englands-first-wild-beavers-for-400-years-allowed-to-live-on-river-otter',
    ],
    [
        '2020-08-07T09:00:33Z',
        "Covid-19 lockdown will have 'negligible' impact on climate crisis – study",
        'https://www.theguardian.com/environment/2020/aug/07/covid-19-lockdown-will-have-negligible-impact-on-climate-crisis-study',
    ],
];
