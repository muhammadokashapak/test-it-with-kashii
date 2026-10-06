export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  context?: Record<string, unknown>;
  run_id?: string;
  action_id?: string;
}

export class KashiiLogger {
  private service: string;

  constructor(service: string) {
    this.service = service;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, extra?: { run_id?: string; action_id?: string }): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      message,
      context,
      run_id: extra?.run_id,
      action_id: extra?.action_id,
    };
    const output = JSON.stringify(entry);
    if (level === 'error') {
      console.error(output);
    } else if (level === 'warn') {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  debug(message: string, context?: Record<string, unknown>, extra?: { run_id?: string; action_id?: string }): void {
    this.log('debug', message, context, extra);
  }

  info(message: string, context?: Record<string, unknown>, extra?: { run_id?: string; action_id?: string }): void {
    this.log('info', message, context, extra);
  }

  warn(message: string, context?: Record<string, unknown>, extra?: { run_id?: string; action_id?: string }): void {
    this.log('warn', message, context, extra);
  }

  error(message: string, context?: Record<string, unknown>, extra?: { run_id?: string; action_id?: string }): void {
    this.log('error', message, context, extra);
  }
}

export const createLogger = (service: string): KashiiLogger => new KashiiLogger(service);
