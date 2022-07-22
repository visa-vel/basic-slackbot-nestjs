import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ErrorCode, WebAPICallResult,WebClient } from "@slack/web-api";

@Injectable()
export class SlackService{
  private _webClient: WebClient;
    constructor(
        private _httpService : HttpService){
      this._webClient = new WebClient()
    }
  
    async oauthAccess(
      code: string,
      redirectUri: string,
  ): Promise<WebAPICallResult> {
      const data = {
          code: code,
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          redirect_uri: redirectUri,
      };
      console.log("datadatadatadata");
      console.log(data);
      let response;
      try {
          response = await this._webClient.oauth.v2.access(data);
      } catch (error) {
          console.log(error);
          if (error.code === ErrorCode.PlatformError) {
              response = error.data;
          } else {
              throw new Error(error);
          }
      }

      return response;
  }

  async initSlackCommand(boltApp){
    console.info("slack command");
    boltApp.command('/hello', ({ ack }) => {
      console.info("who are u");
      ack({
          "blocks": [
              {
                  "type": "section",
                  "text": {
                      "type": "mrkdwn",
                      "text": "Hello World! "
                  }
              }
          ]
      });
  });
    }

   

}