import { ParameterizedContext } from 'koa';
import logger from '../logger';

interface IErrorResponse {
  code: string | number;
  message: string;
}

function sendSuccessResponse(this: ParameterizedContext, body: any) {
  this.body = body;
}

function sendErrorResponse(this: ParameterizedContext, error: any) {
  this.body = { error };
}

const handleCatchedError = (ctx: any, error: IErrorResponse & Error, sn?: string) => {
  if (error.code) {
    logger().error(`Error catched: [sn: ${sn}]\n${error.code}`);
    ctx.sendErrorResponse(error);
  } else {
    logger().error(`Error catched: [sn: ${sn}]\n${error.stack}`);
    ctx.sendErrorResponse({
      code: 'InternalError',
      message: '服务异常',
    });
  }
};

export default async (ctx: any, next: () => void) => {
  const context = ctx;
  const { sn } = ctx;
  const requestBody = JSON.stringify(context.request.body);
  const query = JSON.stringify(context.request.query);
  logger().info(`[sn: ${sn}] ${query} ${requestBody} ${context}`);

  ctx.sendSuccessResponse = sendSuccessResponse.bind(context);
  ctx.sendErrorResponse = sendErrorResponse.bind(context);

  try {
    await next();
  } catch (error) {
    handleCatchedError(ctx, error, sn);
  }
};
