import { Prisma } from '@prisma/client';
import { ORDER, SORT } from '../../src/modules/character/enum/sort.enum';

export const generateSortParameters = (sortby: SORT, dir: ORDER) => {
  let sort;
  let order: Prisma.SortOrder = dir === ORDER.ASC ? 'asc' : 'desc';
  if (sortby === SORT.GENDER) {
    sort = {
      gender: order,
    };
  } else if (sortby === SORT.HEIGHT) {
    sort = {
      height: order,
    };
  } else if (sortby === SORT.NAME) {
    sort = {
      name: order,
    };
  } else {
    sort = undefined;
  }

  return sort;
};
