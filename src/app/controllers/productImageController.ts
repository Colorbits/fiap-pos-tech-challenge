import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { IService } from '../../domain/iService';
import { ProductImage, ProductImageDto } from '../../shared/models';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { extname } from 'path';

const destination = '/files';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Somente arquivos de imagem são permitidos!',
        HttpStatus.FORBIDDEN,
      ),
      false,
    );
  }
  callback(null, true);
};

@ApiTags('Imagens de Produtos')
@Controller('product/:productId/image')
export class ProductImageController {
  private readonly logger = new Logger(ProductImageController.name);

  constructor(
    @Inject('IService<ProductImage>')
    private productImageService: IService<ProductImage>,
  ) {}

  @ApiOperation({
    summary: 'Buscar imagem do produto pelo ID',
    description:
      'Retorna a imagem específica de um produto com base no ID da imagem.',
  })
  @ApiParam({
    name: 'productId',
    type: Number,
    description: 'ID do produto ao qual a imagem pertence',
  })
  @ApiParam({
    name: 'imageId',
    type: Number,
    description: 'ID da imagem do produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem encontrada e retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagem do produto não encontrada.',
  })
  @Get(':imageId')
  async findById(@Param('imageId') imageId: number, @Res() res) {
    const image = await this.productImageService.findById(imageId);
    return res.sendFile(image.path, { root: '.' });
  }

  @ApiOperation({
    summary: 'Fazer upload de uma imagem para um produto',
    description:
      'Permite o envio de uma imagem para um produto específico, armazenando o arquivo.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'productId',
    type: Number,
    description: 'ID do produto para o qual a imagem será carregada',
  })
  @ApiResponse({
    status: 201,
    description: 'Imagem do produto carregada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Arquivo inválido, apenas imagens são permitidas.',
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: `.${destination}`,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async upload(
    @Param('productId') productId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const productImageDto: ProductImageDto = {
      productId,
      path: file.path,
    };
    const createdProductImage =
      await this.productImageService.create(productImageDto);
    this.logger.debug(
      `Updated productImage: ${JSON.stringify(createdProductImage)}`,
    );
    return file;
  }

  @ApiOperation({
    summary: 'Remover uma imagem de produto',
    description:
      'Remove a imagem de um produto específico com base no ID da imagem.',
  })
  @ApiParam({
    name: 'productImageId',
    type: Number,
    description: 'ID da imagem do produto a ser removida',
  })
  @ApiResponse({
    status: 204,
    description: 'Imagem removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagem do produto não encontrada para remoção.',
  })
  @Delete(':productImageId')
  async delete(@Param('productImageId') productImageId: number): Promise<void> {
    await this.productImageService.delete(productImageId);
    this.logger.debug(`Deleted product with id: ${productImageId}`);
  }
}
