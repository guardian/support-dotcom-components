import type { EpicTest } from '@sdc/shared/types';
import { fetchS3Data } from '../utils/S3';
import { isProd } from './env';

const S3_BUCKET = 'gu-contributions-public';
const S3_KEY = `super-mode/${isProd ? 'PROD' : 'CODE'}/articles.json`;

export interface SuperModeArticle {
	url: string;
	timestamp: number;
}

export const fetchSuperModeArticles = async (): Promise<SuperModeArticle[]> => {
	return fetchS3Data(S3_BUCKET, S3_KEY).then(JSON.parse);
};

export const isInSuperMode = (
	url: string,
	superModeArticles: SuperModeArticle[],
): boolean => {
	return superModeArticles.map((a) => a.url).includes(url);
};

export const superModeify = (test?: EpicTest): EpicTest | undefined => {
	return test && { ...test, isSuperMode: true };
};
