import { IComicsResult } from '../type/Comics';
import { IResult } from '../type/iOneChar';

export const transformCharacter = (char: IResult): IResult => {
  // char.data.results[0]
  return {
    id: char.id,
    name: char.name,
    description: char.description
      ? `${char.description.slice(0, 210)}...`
      : 'There is no description for this character',
    thumbnailPath: char.thumbnail!.path + '.' + char.thumbnail!.extension,
    homepagePath: char.urls![0].url,
    wikiPath: char.urls![1].url,
    comicsPath: char.comics!.items,
  };
};



export const transformComics = (comics: IComicsResult): IComicsResult => {
  return {
    id: comics.id,
    title: comics.title,
    description: comics.description || 'There is no description',
    pageCountPath: comics.pageCount
      ? `${comics.pageCount} p.`
      : 'No information about the number of pages',
    thumbnailPath: comics.thumbnail!.path + '.' + comics.thumbnail!.extension,
    language: comics.textObjects![0]?.language || 'en-us',
    // optional chaining operator
    pricePath: comics.prices![0].price ? `${comics.prices![0].price}$` : 'not available',
  };
};
//
// export const transformComicsForSearch = (comics) => {
//     return {
//         id: comics.id,
//         name: comics.name,
//         description: comics.description || "There is no description",
//         pageCount: comics.pageCount
//             ? `${comics.pageCount} p.`
//             : "No information about the number of pages",
//         thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
//     }
// }
