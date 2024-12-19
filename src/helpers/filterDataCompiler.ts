interface Filter {
  minRate: number;
  maxRate: number;
  minPrice: number;
  maxPrice: number;
}

function filterDataCompiler({
  filter,
  sort,
  inStock,
}: {
  filter?: string | Filter;
  sort?: string;
  inStock?: string;
}) {
  const sortQuery = JSON.parse((sort as string) || "{}");

  const defaultFilter: Filter = {
    minRate: 0,
    maxRate: 5,
    minPrice: 1,
    maxPrice: 200,
  };

  if (!filter || filter === JSON.stringify(defaultFilter)) {
    return { filterQuery: {}, sortQuery };
  }

  filter = JSON.parse(filter as string) as Filter;
  filter = { ...defaultFilter, ...filter } as Filter;

  const filterQuery = {
    stock: inStock ? { $gt: 0 } : {},
    price: {
      $gte: filter.minPrice,
      $lte: filter.maxPrice,
    },
    rate: {
      $gte: filter.minRate,
      $lte: filter.maxRate,
    },
  };

  return { filterQuery, sortQuery };
}

export { filterDataCompiler };
