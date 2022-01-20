import { PrismaClient } from '@prisma/client';
import { chatacterType } from 'src/types/characterType';
import { fetchCharacter } from './fetchCharacter';

const prisma = new PrismaClient();

export const seedCharacter = async (
  character: string,
  savedMovieId: number,
) => {
  const person: chatacterType = await fetchCharacter(character);
  const characterData = {
    movieId: savedMovieId,
    name: person.name,
    height: person.height,
    gender: person.gender,
  };
  await prisma.character.create({
    data: characterData,
  });
};
