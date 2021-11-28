import { getAllEntriesFactory, getEntriesBySlugFactory } from './apiFactory';

const CONTENT = 'pages/_content';
const MAIN_PAGE = `${CONTENT}/main`;

export const getMainContentBySlug = getEntriesBySlugFactory(MAIN_PAGE);
export const getAllMainContent = getAllEntriesFactory(MAIN_PAGE);
