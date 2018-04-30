import { stateToHTML } from 'draft-js-export-html';
import {
  convertFromRaw,
  convertToRaw,
  convertFromHTML,
  ContentState
} from 'draft-js';

export const convertToDraftJS = (title, bodyHTML) => {
  const blocksFromHTML = convertFromHTML(bodyHTML);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return {
    body: convertToRaw(state),
    title,
  };
};

export const getRevHTML = rev =>
  stateToHTML(convertFromRaw(Object.assign(rev.body, { entityMap: {} }))).split('\n');
