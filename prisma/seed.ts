import { PrismaClient } from '@prisma/client';

import { fetchMovies } from '../src/helpers/fetchMovies';
import { movieType } from '../src/types/movieType';
import { seedCharacter } from '../src/helpers/seedCharacter';

const prisma = new PrismaClient();

export const seedDb = async () => {
  const seedStatus = await prisma.seed.findFirst();
  console.log(seedStatus);
  if (seedStatus) return;

  const data = await fetchMovies();

  const movies: movieType[] = data.results;

  movies.forEach(async (movie: movieType, index: number) => {
    const movieData = {
      name: movie.title,
      opening_crawl: movie.opening_crawl,
      release_date: movie.release_date,
    };
    const savedMovie = await prisma.movie.create({
      data: movieData,
    });

    for (let character of movie.characters) {
      await seedCharacter(character, savedMovie.id);
    }
  });

  await prisma.seed.create({
    data: { status: true },
  });
};

seedDb()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
