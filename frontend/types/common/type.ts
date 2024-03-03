export interface IResult<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

export interface ICreate {
  formData: FormData;
}

export interface IDelete {
  id: string;
}

export interface IUpdate {
  id: string;
  formData: FormData;
}

export interface IUpdateStockCount {
  id: string,
  data: any
}

export interface IDelete {
  id: string
}