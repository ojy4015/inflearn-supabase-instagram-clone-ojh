'use server';

import prisma from '@/utils/db';

function handleError(error: any) {
  if (error) {
    console.error('Prisma error:', error);
    throw error;
  }
}

export async function getAllMovies() {
  try {
    const movies = await prisma.movie.findMany();
    return movies;
  } catch (error) {
    console.error('getAllMovies error:', error);
    throw error;
  }
}

interface SearchMoviesParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function searchMovies({
  search = '',
  page = 1,
  pageSize = 12,
}: SearchMoviesParams) {
  try {
    const skip = (page - 1) * pageSize;

    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            overview: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip,
      take: pageSize,
    });

    // Get total count for pagination info
    const totalCount = await prisma.movie.count({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            overview: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return {
      movies,
      page,
      pageSize,
      totalCount,
      hasNextPage: skip + pageSize < totalCount,
    };
  } catch (error) {
    console.error('searchMovies error:', error);
    throw error;
  }
}

export async function getMovie(id: string | number) {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: typeof id === 'string' ? parseInt(id) : id,
      },
    });
    return movie;
  } catch (error) {
    console.error('getMovie error:', error);
    throw error;
  }
}
