import React from "react"
import { addParameters, addDecorator } from "@storybook/react"
import { useEffect } from "@storybook/addons"
import { FocusStyleManager } from "@guardian/src-foundations/utils"
import { breakpoints, Breakpoint } from "@guardian/src-foundations"

const isProd = process.env.NODE_ENV === "production"

const viewportMeta = {
	mobile: {
		name: "Mobile",
		type: "mobile",
	},
	mobileMedium: {
		name: "Mobile Medium",
		type: "mobile",
	},
	mobileLandscape: {
		name: "Mobile Landscape",
		type: "mobile",
	},
	phablet: {
		name: "Phablet",
		type: "mobile",
	},
	tablet: {
		name: "Tablet",
		type: "tablet",
	},
	desktop: {
		name: "Desktop",
		type: "desktop",
	},
	leftCol: {
		name: "Left Col",
		type: "desktop",
	},
	wide: {
		name: "Wide",
		type: "desktop",
	},
}
const viewportEntries = Object.entries(breakpoints).map(([name, width]) => {
	return [
		name,
		{
			name: viewportMeta[name].name,
			styles: {
				width: `${width}px`,
				height: "100%",
			},
			type: viewportMeta[name].type,
		},
	]
})
const viewports = Object.fromEntries(viewportEntries)

addParameters({
	options: {
		isToolshown: !isProd,
		isFullscreen: isProd,
	},
	viewport: {
		viewports,
		defaultViewport: "responsive",
	},
})

const FocusManagerDecorator = storyFn => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs()
	})

	return <div>{storyFn()}</div>
}

addDecorator(FocusManagerDecorator)
