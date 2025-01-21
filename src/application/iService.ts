export interface IService<T> {
  create(type: Partial<T>): Promise<T>;

  edit(type: Partial<T>): Promise<T>;

  delete(id: number): Promise<void>;

  find(id?: number, status?: string, term?: string): Promise<T[]>;

  findById(id: number): Promise<T>;

  findAll(): Promise<T[]>;
}
