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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IService } from '../../application/iService';
import { FilterProductDto, Product, ProductDto } from '../../shared/models';

@ApiTags('Produtos')
@Controller('product')
export class ProductApi {
  private readonly logger = new Logger(ProductApi.name);

  constructor(
    @Inject('IService<Product>') private productService: IService<Product>,
  ) {}

  @ApiOperation({
    summary: 'Listar produtos com filtro opcional',
    description:
      'Retorna uma lista de produtos com base nos filtros aplicados, como categoria, preço, status e outros.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos encontrada com sucesso.',
    type: [Product],
  })
  @Get()
  find(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productService.find(filterProductDto.categoryId);
  }

  @ApiOperation({
    summary: 'Buscar produto pelo ID',
    description: 'Retorna os detalhes de um produto específico baseado no ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado com sucesso.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.',
  })
  @Get(':id')
  findById(@Param('id') id?: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @ApiOperation({
    summary: 'Criar novo produto',
    description: 'Cria um novo produto com os dados fornecidos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para criação do produto.',
  })
  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    const createdProduct = await this.productService.create(productDto);
    this.logger.debug(`Produto criado: ${JSON.stringify(createdProduct)}`);
    return createdProduct;
  }

  @ApiOperation({
    summary: 'Editar produto existente',
    description:
      'Edita um produto existente com base no ID e nos dados fornecidos.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto a ser editado',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado para atualização.',
  })
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.edit({
      ...productDto,
      id,
    });
    this.logger.debug(`Produto atualizado: ${JSON.stringify(updatedProduct)}`);
    return updatedProduct;
  }

  @ApiOperation({
    summary: 'Remover produto',
    description: 'Remove um produto específico com base no ID.',
  })
  @ApiParam({
    name: 'productId',
    type: Number,
    description: 'ID do produto a ser deletado',
  })
  @ApiResponse({
    status: 204,
    description: 'Produto deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado para deleção.',
  })
  @Delete(':productId')
  async delete(@Param('productId') productId: number): Promise<void> {
    await this.productService.delete(productId);
    this.logger.debug(`Produto deletado com id: ${productId}`);
  }
}
