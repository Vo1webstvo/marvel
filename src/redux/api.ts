import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformCharacter, transformComics } from '../utils/transformResponse.ts';
import {IResult, IServRes } from '../type/iOneChar.ts';
import { IComics, IComicsResult } from '../type/Comics.ts';




type CharListParams = {
  limit: number;
  offset: number;
};

// Define a service using a base URL and expected endpoints
export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com:443/v1/public' }),
  endpoints: (builder) => ({
    getComics: builder.query<IComicsResult[], number>({
      query: (limit) => `/comics?limit=${limit}&offset=1&apikey=537ee451b8fd1f8d64eeb59fd0a2eb43`,
      transformResponse: (comics: IComics) => comics.data.results.map(transformComics),
    }),
    getOneComic: builder.query<IComicsResult, number>({
      query: (id) => `/comics/${id}?apikey=537ee451b8fd1f8d64eeb59fd0a2eb43`,
      transformResponse: (comics: IComics) => transformComics(comics.data.results[0]),
    }),
    getCharList: builder.query<IResult[], CharListParams>({
      query: ({ limit, offset }) =>
        `/characters?limit=${limit}&offset=${offset}&apikey=537ee451b8fd1f8d64eeb59fd0a2eb43`,
      transformResponse: (charlist: IServRes) =>
        charlist.data.results.map(transformCharacter),
    }),
    getOneChar: builder.query<IResult, number>({
      query: (id) => `/characters/${id}?apikey=537ee451b8fd1f8d64eeb59fd0a2eb43`,
      transformResponse: (char: IServRes) => transformCharacter(char.data.results[0]),  //char.data.results должен совпасть с IResult !!!!
    }),
  }),
});

export const { useGetComicsQuery, useGetOneComicQuery, useGetCharListQuery, useGetOneCharQuery } =
  marvelApi;
