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
import { ApiConsumes } from '@nestjs/swagger';
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
      new HttpException('Only image files are allowed!', HttpStatus.FORBIDDEN),
      false,
    );
  }
  callback(null, true);
};

@Controller('product/:productId/image')
export class ProductImageController {
  private readonly logger = new Logger(ProductImageController.name);
  constructor(
    @Inject('IService<ProductImage>')
    private productImageService: IService<ProductImage>,
  ) {}

  @Get(':imageId')
  async findById(@Param('imageId') imageId: number, @Res() res) {
    const image = await this.productImageService.findById(imageId);
    console.log(image);
    return res.sendFile(image.path, { root: '.' });
  }

  @Post()
  @ApiConsumes('multipart/form-data')
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
    console.log(productId, file);
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

  @Delete(':productImageId')
  async delete(@Param('productImageId') productImageId: number): Promise<void> {
    await this.productImageService.delete(productImageId);
    this.logger.debug(`Deleted product with id: ${productImageId}`);
  }
}
