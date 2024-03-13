import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logs } from '../config';
import { hrtime } from 'process';

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
    const start = hrtime();
    try {
      await this.$connect();
      const end = hrtime(start);
      Logs.info('Prisma connected', {
        context: PrismaService.name,
        ms: `+${(end[1] / 1000000).toFixed(0)}ms`,
      });
    } catch (e: any) {
      const end = hrtime(start);
      Logs.error(e.message.replace(/\n/g, ' '), {
        context: PrismaService.name,
        stack: e.stack,
        ms: `+${(end[1] / 1000000).toFixed(0)}ms`,
      });
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
