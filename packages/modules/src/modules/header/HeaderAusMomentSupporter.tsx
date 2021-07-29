import React from 'react';
import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import { Link } from '@guardian/src-link';
import { Hide } from '@guardian/src-layout';
import useNumberOfSupporters from '../../hooks/useNumberOfSupporters';

const ausMomentHeadingStyles = css`
	${from.mobileMedium} {
		${textSans.xsmall({ fontWeight: 'bold' })};
		color: ${brandAlt[400]};
	}

	${from.tablet} {
		${headline.xsmall({ fontWeight: 'bold' })}
		margin-bottom: ${space[1]}px;
	}

	${from.desktop} {
		${headline.medium({ fontWeight: 'bold' })}
		margin-bottom: 0;
	}
`;

const ausMomentSubheadingStyles = css`
	${textSans.small()};
	color: ${brandText.primary};
	margin-bottom: ${space[2]}px;
	line-height: 1.15;

	${from.desktop} {
		${textSans.medium()};
		margin-bottom: ${space[1]}px;
	}
`;

const headerYellowHighlight = css`
	color: ${brandAlt[400]};
	font-weight: 700;
	margin: 5px 0;
`;

const ausMapLinkStyles = css`
	${textSans.small()};
	color: ${brandText.primary};
	line-height: 1.15;

	${from.desktop} {
		${textSans.medium()};
	}
`;

const mobileCtaStyles = css`
	${until.mobileMedium} {
		display: none;
	}

	${textSans.xxsmall()}
	color: ${brandAlt[400]};
`;

const linkStyles = css`
	height: 24px;
	min-height: 24px;
	${textSans.small({ fontWeight: 'bold' })};
	border-radius: 16px;
	padding: 0 ${space[3]}px;
	margin-right: 10px;
	margin-bottom: 6px;

	${from.desktop} {
		${textSans.medium({ fontWeight: 'bold' })};
		height: 36px;
		min-height: 36px;
		padding: 0 ${space[4]}px;
		border-radius: 36px;
	}

	svg {
		width: 24px;
	}
`;

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
	const { heading, primaryCta } = props.content;

	const numberOfSupporters = useNumberOfSupporters();

	return (
		<div>
			<Hide below="mobileMedium">
				<div>
					<div css={ausMomentHeadingStyles}>{heading}</div>
				</div>
			</Hide>
			<Hide below="tablet">
				<div css={ausMomentSubheadingStyles}>
					You&apos;re one of{' '}
					<Link
						href="https://support.theguardian.com/aus-map?INTCMP=Aus_moment_2021_header"
						css={ausMapLinkStyles}
					>
						<span css={headerYellowHighlight}>
							{numberOfSupporters}{' '}
						</span>
						supporters in Australia
					</Link>
				</div>
			</Hide>

			{primaryCta && (
				<>
					<ThemeProvider theme={buttonReaderRevenueBrand}>
						<Hide below="tablet">
							<LinkButton
								priority="primary"
								href={primaryCta.ctaUrl}
								icon={<SvgArrowRightStraight />}
								iconSide="right"
								nudgeIcon={true}
								css={linkStyles}
							>
								{primaryCta.ctaText}
							</LinkButton>
						</Hide>
					</ThemeProvider>

					<Hide above="tablet">
						<div>
							<Link
								href={primaryCta.ctaUrl}
								css={mobileCtaStyles}
							>
								Support us again
							</Link>
						</div>
					</Hide>
				</>
			)}
		</div>
	);
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
