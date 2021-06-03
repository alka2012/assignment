import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json } = format;

export const initLogger = async () =>
  createLogger({
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      json(),
    ),
    exitOnError: false,
    transports: [new transports.Console({ level: 'debug' })],
    exceptionHandlers: [new transports.Console({ level: 'debug' })],
  });

export default initLogger;