import { BadRequestException, Injectable } from '@nestjs/common';
import { QIANFAN_URL } from './qianfan.constants';
import { ConfigService } from '@nestjs/config';
import { QianFanInput } from './qianfan.input';

@Injectable()
export class QianFanService {
  constructor(private config: ConfigService) {}

  async textGeneration(input: QianFanInput) {
    const token = await this.getAccessToken();
    const { prompt } = input;
    const response = await fetch(
      `${QIANFAN_URL}/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${token}`,
      {
        method: 'POST',
        headers: this.setHeader(),
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new BadRequestException(data);
    }
  }

  private async getAccessToken() {
    const response = await fetch(
      `${QIANFAN_URL}/oauth/2.0/token?client_id=${this.config.getOrThrow('QIANFAN_API_KEY')}&client_secret=${this.config.getOrThrow('QIANFAN_SECRET_KEY')}&grant_type=client_credentials`,
      {
        method: 'POST',
        headers: this.setHeader(),
      },
    );

    const data = await response.json();

    if (response.ok) {
      return data.access_token;
    } else {
      throw new BadRequestException(data);
    }
  }

  private setHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', `application/json`);
    return headers;
  }
}
