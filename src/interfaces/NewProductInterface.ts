interface INewProdcut {
  userId: string;
  rating?: number | undefined;
  title: string;
  price: number;
  stock?: number;
  details: string;
}

export default INewProdcut;
