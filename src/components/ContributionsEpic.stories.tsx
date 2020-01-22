import React, { ReactElement } from 'react';
import { ContributionsEpic } from './ContributionsEpic';
import { withKnobs, text, array } from '@storybook/addon-knobs';

export default {
    component: ContributionsEpic,
    title: 'Components/ContributionsEpic',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    const heading = 'Since you’re here...';
    const paragraphs = [
        '… we have a small favour to ask. More people, like you, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
        'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
        'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
        'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
    ];
    const highlighted = [
        'Support The Guardian from as little as £1 – and it only takes a minute. Thank you.',
    ];

    return (
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <ContributionsEpic
                heading={text('heading', heading)}
                paragraphs={array('paragraphs', paragraphs)}
                highlighted={array('highlighted', highlighted)}
            />
        </div>
    );
};

defaultStory.story = { name: 'Default epic' };
