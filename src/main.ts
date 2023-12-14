import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const context = 'NestApplication';
  const logger = new Logger(context);

  
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });  


  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {

      let upErrors = {};
      const result = errors.map((error) => ({
        property: error.property,
        message: error.constraints[Object.keys(error.constraints)[0]],
      })); 


      upErrors = {
        errors: result,
        statusCode: HttpStatus.BAD_REQUEST,
        success: false
      };

      return new BadRequestException(upErrors);
    },
    stopAtFirstError: true,
  })); 

  app.setGlobalPrefix('api');



  // Swagger

  const config = new DocumentBuilder()
    .setTitle('backend-exchange-api-test')
    .setDescription('Exchange API')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 




  await app.listen(parseInt(process.env.PORT)); 
}
bootstrap();
