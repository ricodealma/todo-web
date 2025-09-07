export interface ITodo {
  isCompleted: boolean;
  title: string;
  id: string;
  editing?: boolean;
}

export interface ITodoRequest extends Omit<ITodo, 'id'> {}

export interface ISearch<T> {
  data: T[];
  paging: IPaging;
}

export interface IPaging {
    total: number,
    currentPage: number,
    perPage:  number,
    pages: number
}