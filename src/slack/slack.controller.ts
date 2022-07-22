import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { SlackService } from "./slack.service";

@Controller('slack')
export class SlackController{
  constructor(
    private _slackService:SlackService
  ){}

//   @Post('event')
//     async event(@Body() body) {
//         try{
//             if (body.challenge) {
//                 return { challenge: body.challenge };
//             }
//         }
//         catch(error){
//             console.log(error);
//         }

//     }

//   @Post('hello')
//   async printHelloWorld(@Body() Body){
//     const {response_url} = Body;
//     const data = {
//         response_url:response_url,
//         message:"Hello World!"
//     }
//     try{
//       await this._slackService.postMessage(data);
//     }
//     catch(error){
//         console.log(error)
//     }
//   }

 @Get('oauth_redirect')
    async add(@Req() req, @Res() res) {
        console.log("mndmasnmdamns");
        const { code } = req.query;
        console.log(req.query);
        const data = await this._slackService.oauthAccess(
            code,
            `${process.env.APP_URL}/slack/oauth_redirect`,
        )
        console.log("datadatadatadata");
        console.log(data);
        if (data.ok) {
                res.status(HttpStatus.OK).send(`Thanks!`);
            } else {
                res.status(HttpStatus.OK).send(`App was already installed!`);
            }
    }


}