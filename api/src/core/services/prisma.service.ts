import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logs } from '../config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      Logger.log('Prisma connected', PrismaService.name);
    } catch (e: any) {
      Logs.error(e.message.replace(/\n/g, ' '), { context: PrismaService.name });
    }

    this.$on('query' as never, (e: any) => {
      const msg = JSON.stringify({ query: e.query, params: e.params });
      Logs.prisma(msg, {
        context: PrismaService.name,
        ms: `+${e.duration}ms`,
      });
    });
    this.$on('info' as never, (e: any) => {
      const msg = JSON.stringify({ query: e.query, params: e.params });
      Logs.info(msg, {
        context: PrismaService.name,
        ms: `+${e.duration}ms`,
      });
    });
    this.$on('warn' as never, (e: any) => {
      const msg = JSON.stringify({ query: e.query, params: e.params });
      Logs.warn(msg, {
        context: PrismaService.name,
        ms: `+${e.duration}ms`,
      });
    });
    this.$on('error' as never, (e: any) => {
      const msg = JSON.stringify({ query: e.query, params: e.params });
      Logs.error(msg, {
        context: PrismaService.name,
        ms: `+${e.duration}ms`,
      });
    });
  }
}
