import { List } from './types';

export default function move(list: List, source: string, destination: string): List {
  /* Take a deep copy of given list */
  const arr = JSON.parse(JSON.stringify(list)) as List;
  /**
   * iterate on folders to find container of source file.
   * Array.prototype.every() is used instead of for loop.
   * return true for continue, return false for break.
   */
  const sourceFolder = arr.every((folder) => {
    /* index of matching file with given source id */
    const fileIndex = folder.files.findIndex((file) => file.id === source);

    /* Next iteration if file not found */
    if (fileIndex === -1) {
      return true;
    }

    /* Find destination folder with given destination id */
    const newFolder = arr.find((_newFolder) => _newFolder.id === destination);

    /* Throw an error if destination folder not found */
    if (!newFolder) {
      throw new Error('Destination folder not found');
    }

    /* Delete source file from current folder */
    const file = folder.files.splice(fileIndex, 1)[0];

    /* Push deleted file to destination folder */
    newFolder.files.push(file);

    /* break the iteration */
    return false;
  });

  /* Throw an error if source file not found anywhere */
  if (sourceFolder) {
    throw new Error('Source file not found');
  }

  /* return the arr that is mutated already */
  return arr;
}
