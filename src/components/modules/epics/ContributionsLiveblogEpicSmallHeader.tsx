import React from "react";
import {EpicProps} from "./ContributionsEpic";
import {ContributionsLiveblogEpicComponent} from "./ContributionsLiveblogEpic";
import {LiveblogEpicDesignTestVariants} from "../../../tests/liveblogEpicDesignTest";

export const ContributionsLiveblogEpic: React.FC<EpicProps> = ContributionsLiveblogEpicComponent(
    LiveblogEpicDesignTestVariants.smallHeader
);
