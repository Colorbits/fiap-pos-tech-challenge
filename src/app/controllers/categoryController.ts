import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IService } from '../../domain/iService';
import { Category, CategoryDto } from '../../shared/models';

@ApiTags('Categorias')
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(
    @Inject('IService<Category>') private categoryService: IService<Category>,
  ) {}

  @ApiOperation({
    summary: 'Obter todas as categorias',
    description:
      'Retorna uma lista de todas as categorias disponíveis no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso.',
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar categorias.' })
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar categorias por filtro',
    description:
      'Busca uma categoria específica com base no ID ou nome da categoria.',
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
    description: 'ID da categoria a ser buscada',
  })
  @ApiQuery({
    name: 'categoryName',
    type: String,
    required: false,
    description: 'Nome da categoria a ser buscada',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria(s) encontrada(s) com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar a categoria.' })
  @Get(':id')
  find(@Param('id') id?: number): Promise<Category[]> {
    return this.categoryService.find(id);
  }

  @ApiOperation({
    summary: 'Criar uma nova categoria',
    description: 'Cria uma nova categoria com base nos dados fornecidos.',
  })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para criação da categoria.',
  })
  @ApiResponse({ status: 500, description: 'Erro ao criar a categoria.' })
  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryService.create(categoryDto);
    this.logger.debug(`Created category: ${JSON.stringify(category)}`);
    return category;
  }

  @ApiOperation({
    summary: 'Editar uma categoria existente',
    description:
      'Atualiza os dados de uma categoria específica com base no ID fornecido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para atualização da categoria.',
  })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar a categoria.' })
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.edit({
      ...categoryDto,
      id,
    });
    this.logger.debug(`Updated category: ${JSON.stringify(updatedCategory)}`);
    return updatedCategory;
  }

  @ApiOperation({
    summary: 'Remover uma categoria',
    description: 'Exclui uma categoria específica com base no ID fornecido.',
  })
  @ApiResponse({ status: 204, description: 'Categoria deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiResponse({ status: 500, description: 'Erro ao remover a categoria.' })
  @Delete(':categoryId')
  async delete(@Param('categoryId') categoryId: number): Promise<void> {
    await this.categoryService.delete(categoryId);
    this.logger.debug(`Deleted category with id: ${categoryId}`);
  }
}
