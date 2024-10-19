import { Category, CategoryDto } from '../../../shared/models';
import { IRepository } from '../iRepository';

export class MockCategoryRepository implements IRepository<Category> {
  find(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  private readonly categorys: Category[] = [];

  async create(categoryDto: CategoryDto): Promise<Category> {
    const createdCategory = new Category(categoryDto);
    this.categorys.push(createdCategory);
    return Promise.resolve(createdCategory);
  }

  async findAll(): Promise<Category[]> {
    return Promise.resolve(this.categorys);
  }

  async edit(categoryDto: CategoryDto): Promise<Category> {
    const categoryIndex = this.categorys.findIndex(
      (category) => category.id === categoryDto.id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      ...this.categorys[categoryIndex],
      ...categoryDto,
    };
    this.categorys[categoryIndex] = updatedCategory;
    return Promise.resolve(updatedCategory);
  }

  async delete(id: number): Promise<void> {
    const categoryIndex = this.categorys.findIndex(
      (category) => category.id === id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categorys.splice(categoryIndex, 1);
    return Promise.resolve();
  }
}
