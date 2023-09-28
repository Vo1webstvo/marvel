export interface IServRes {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IData;
}

export interface IData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IResult[];
}

export interface IResult {
  id: number;
  name: string;
  description: string;
  modified?: string;
  thumbnail?: Thumbnail; //делаем эти свойства, а потом thumbnailPath чтоб можно в функции использовать для построения пути!
  resourceURI?: string;
  comics?: Comics;
  series?: Series;
  stories?: Stories;
  events?: Events;
  urls?: Url[];
  thumbnailPath: string;
  homepagePath: string;
  wikiPath: string;
  comicsPath: string[];
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface Series {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface Url {
  type: string;
  url: string;
}
