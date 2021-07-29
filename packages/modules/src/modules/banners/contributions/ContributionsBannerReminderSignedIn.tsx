import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonBrandAlt } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral, error } from '@guardian/src-foundations/palette';
import { Columns, Column, Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { SvgCheckmark } from '@guardian/src-icons';
import { BannerEnrichedReminderCta } from '../common/types';
import { ReminderStatus } from '../../utils/reminders';

const bodyContainerStyles = css`
	padding: 10px 0;
	box-sizing: border-box;

	${from.tablet} {
		height: 100%;
	}

	${from.leftCol} {
		margin-left: -9px;
		padding: 10px ${space[3]}px;
		border-left: 1px solid black;
	}

	${from.wide} {
		margin-left: -10px;
	}
`;

const ctaContainerStyles = css`
	padding: 10px 0 0;

	${from.tablet} {
		padding: 10px 0;
	}
`;

const secondaryCtaContainerStyles = css`
	margin-left: ${space[4]}px;
`;

const bodyCopyContainerStyles = css`
	${textSans.small({ fontWeight: 'bold' })}
`;

const errorCopyContainerStyles = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${error[400]};
	font-style: italic;
	margin-top: ${space[1]}px;
	margin-bottom: 0;
`;

const infoCopyContainerStyles = css`
	${textSans.small({})}
	font-size: 12px;

	margin-top: ${space[3]}px;
`;

const thankyouHeaderStyles = css`
	${textSans.small({ fontWeight: 'bold' })}
`;

const thankyouBodyStyles = css`
	${textSans.small({})}
`;

const privacyLinkSyles = css`
	font-weight: bold;
	color: ${neutral[0]};
`;

const contactLinkStyles = css`
	color: ${neutral[0]};
`;

export interface ContributionsBannerReminderSignedInProps {
	reminderCta: BannerEnrichedReminderCta;
	reminderStatus: ReminderStatus;
	onReminderSetClick: () => void;
	onReminderCloseClick: () => void;
}

export const ContributionsBannerReminderSignedIn: React.FC<ContributionsBannerReminderSignedInProps> =
	({
		reminderCta,
		reminderStatus,
		onReminderSetClick,
		onReminderCloseClick,
	}) => {
		const Body = () => (
			<div css={bodyContainerStyles}>
				{reminderStatus !== ReminderStatus.Completed && (
					<>
						<div css={bodyCopyContainerStyles}>
							Show your support for the Guardian at a later date.
							To make this easier, set a reminder and we’ll email
							you in May.
						</div>

						{reminderStatus === ReminderStatus.Error && (
							<div css={errorCopyContainerStyles}>
								Sorry we couldn&apos;t set a reminder for you
								this time. Please try again later.
							</div>
						)}

						<div css={infoCopyContainerStyles}>
							We will send you a maximum of two emails in{' '}
							{reminderCta.reminderFields.reminderLabel}. To find
							out what personal data we collect and how we use it,
							view our{' '}
							<a
								css={privacyLinkSyles}
								href="https://www.theguardian.com/help/privacy-policy"
								target="_blank"
								rel="noopener noreferrer"
							>
								Privacy policy
							</a>
						</div>
					</>
				)}

				{reminderStatus === ReminderStatus.Completed && (
					<>
						<div css={thankyouHeaderStyles}>
							Thank you! Your reminder is set
						</div>

						<div css={thankyouBodyStyles}>
							We will be in touch to invite you to contribute.
							Look out for a messsage in your inbox in{' '}
							{reminderCta.reminderFields.reminderLabel}. If you
							have any questions about contributing, please{' '}
							<a
								href="mailto:contribution.support@theguardian.com"
								css={contactLinkStyles}
							>
								contact us
							</a>
						</div>
					</>
				)}
			</div>
		);

		const Ctas = () => (
			<div css={ctaContainerStyles}>
				<div>
					<ThemeProvider theme={buttonBrandAlt}>
						<div>
							<Button
								onClick={onReminderSetClick}
								size="small"
								priority="tertiary"
								icon={<SvgCheckmark />}
								iconSide="right"
								disabled={
									reminderStatus === ReminderStatus.Submitting
								}
							>
								Set a reminder
							</Button>
						</div>

						<div css={secondaryCtaContainerStyles}>
							<Button
								onClick={onReminderCloseClick}
								priority="subdued"
							>
								Not now
							</Button>
						</div>
					</ThemeProvider>
				</div>
			</div>
		);

		return (
			<>
				<Hide above="tablet">
					<Columns>
						<Column width={1}>
							<Body />
							{reminderStatus !== ReminderStatus.Completed && (
								<Ctas />
							)}
						</Column>
					</Columns>
				</Hide>

				<Hide below="tablet">
					<Hide above="leftCol">
						<Columns>
							<Column width={8 / 12}>
								<Body />
							</Column>
							<Column width={4 / 12}>
								{reminderStatus !==
									ReminderStatus.Completed && <Ctas />}
							</Column>
						</Columns>
					</Hide>
				</Hide>

				<Hide below="leftCol">
					<Hide above="wide">
						<Columns>
							<Column width={2 / 14}> </Column>
							<Column width={8 / 14}>
								<Body />
							</Column>
							<Column width={4 / 14}>
								{reminderStatus !==
									ReminderStatus.Completed && <Ctas />}
							</Column>
						</Columns>
					</Hide>
				</Hide>

				<Hide below="wide">
					<Columns>
						<Column width={3 / 16}> </Column>
						<Column width={8 / 16}>
							<Body />
						</Column>
						<Column width={4 / 16}>
							{reminderStatus !== ReminderStatus.Completed && (
								<Ctas />
							)}
						</Column>
						<Column width={1 / 16}> </Column>
					</Columns>
				</Hide>
			</>
		);
	};
