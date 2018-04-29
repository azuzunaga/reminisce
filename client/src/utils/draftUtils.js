import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, convertFromHTML } from 'draft-js';

export const convertToDraftJS = (title, bodyHTML) => {
  const blocksFromHTML = convertFromHTML(bodyHTML);
  return {
    title,
    body: {
      blocks: blocksFromHTML.contentBlocks,
      entityMap: blocksFromHTML.entityMap
    }
  };
};

export const getRevHTML = rev =>
  stateToHTML(convertFromRaw(Object.assign(rev.body, { entityMap: {} }))).split('\n');
