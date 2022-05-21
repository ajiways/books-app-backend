import { NestFactory } from '@nestjs/core';
import { ConfigurationService } from './configuration/configuration.service';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();

  const config: ConfigurationService = app.get(ConfigurationService);

  await app.listen(config.env.APP_PORT);
}
bootstrap();
