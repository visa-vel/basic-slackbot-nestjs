import { NestFactory } from '@nestjs/core';
import { App, ExpressReceiver } from '@slack/bolt';
import { AppModule } from './app.module';


async function bootstrap() {
  const receiver = new ExpressReceiver({ 
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    endpoints: { events: '/slack/events', interactive: '/slack/interactive' , commands: '/slack/command' },
  });


  const app = await NestFactory.create(AppModule);
  

  const appModule = app.get(AppModule);
  appModule.initSlack(receiver);
  app.use(receiver.router);
  await app.listen(process.env.PORT);
 
}
bootstrap();
