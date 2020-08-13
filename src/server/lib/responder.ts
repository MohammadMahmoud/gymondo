import express from 'express';
import status from '../enum/status';
import moment from 'moment';
import * as dotenv from 'dotenv';

dotenv.config();

const responder = (
  body: Record<string, unknown>,
  req: express.Request,
  res: express.Response
): Record<string, unknown> => {
  const statusCode = res.statusCode;
  const method = (status as { [key: string]: any })[statusCode] as string;
  const responseBody = {
    meta: method,
    message: body,
  };
  const message = {
    httpRequest: {
      requestTime: `${moment().locale('de').format('D.M.YYYY hh:mm')}`,
      requestMethod: req.method,
      requestUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      status: res.statusCode,
      protocol: req.protocol,
      userAgent: req.get('User-Agent'),
      responseSize: res.get('Content-Length'),
      route: req.path,
      query: req.query,
      requestBody: req.body,
      responseBody: responseBody,
      requestIP: req.ip,
    },
  };
  //Whitelist from logging
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.LOGGING === 'production'
  ) {
    switch (message.httpRequest.requestUrl) {
      case 'http://localhost:3001/favicon.ico':
      default:
        console.log(JSON.stringify(message, null, 4));
    }
  }
  return responseBody;
};

export default responder;
