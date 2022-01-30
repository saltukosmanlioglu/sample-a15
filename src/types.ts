export interface File {
  id: string;
  name: string;
}

export interface Folder {
  id: string;
  name: string;
  files: Array<File>;
}

export type List = Array<Folder>;
