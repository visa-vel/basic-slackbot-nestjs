import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { App } from '@slack/bolt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlackModule } from './slack/slack.module';
import { SlackService } from './slack/slack.service';

@Module({
  imports: [SlackModule,HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
   constructor( private slackService:SlackService)
   {}
    initSlack(receiver: any) {
    const boltApp = new App({
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      scopes: "",
      authorize: async () => {
        return {
            botToken: process.env.SLACK_ACCESS_TOKEN,
        };
      },
      receiver,
    });
    this.slackService.initSlackCommand(boltApp);
  }
}


