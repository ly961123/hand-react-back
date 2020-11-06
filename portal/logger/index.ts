import ip from 'ip';
import moment from 'moment';
import { createLogger, format, transports } from 'winston';

const baseLogPath = process.env.LOG_PATH || 'logs';
const getLoggerFileName = (name: string) => {
  const ipAddress = ip.address();
  return `${baseLogPath}/${name}.log.${moment().format('YYYY-MM-DD')}.${ipAddress}`;
};

const logger = () => {
  const { combine, timestamp, label, printf } = format;
  const logFormat = printf(({ level, message, label: formatLabel }) => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${formatLabel}] ${level}: ${message}`);

  const transportList = [
    new transports.Console(),
    new transports.File({
      filename: getLoggerFileName('error'), level: 'error',
    }),
    new transports.File({
      filename: getLoggerFileName('info'), level: 'info',
    }),
    new transports.File({
      filename: getLoggerFileName('access'), level: 'verbose',
    }),
  ];

  return createLogger({
    level: 'info',
    format: combine(
      label({ label: 'LOG' }),
      timestamp(),
      logFormat,
    ),
    transports: transportList,
  });
};

export default logger;
