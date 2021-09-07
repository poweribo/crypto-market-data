import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product, ProductOrderBoook, RequestMessage } from '@market-data/api-interfaces';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { createHmac } from 'crypto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  API_URL = 'https://api.pro.coinbase.com';
  API_URL_SANDBOX = 'https://api-public.sandbox.pro.coinbase.com';

  apiUrl = this.API_URL;

  apiKey = '';
  apiSecret = '';

  constructor(private httpService: HttpService, private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.apiSecret = this.configService.get<string>('API_SECRET');

    if (this.apiKey === '' || this.apiSecret === '') {
      console.log('Missing API Key/Secret');
    } else {
      console.log('Found API Key/Secret');
    }
  }

  signRequest(req : RequestMessage):AxiosRequestConfig {
    // get unix time in seconds
    const timestamp = Math.floor(Date.now() / 1000);
    const message = timestamp + req.method + req.path + req.body;

    // create a hexedecimal encoded SHA256 signature of the message
    const signature = createHmac("sha256", this.apiSecret).update(message).digest("hex");

    // create the request options object
    const options:AxiosRequestConfig = {
        url: req.path,
        baseURL: this.apiUrl,
        headers: {
            'CB-ACCESS-KEY': this.apiKey,
            'CB-ACCESS-SIGN': signature,
            'CB-ACCESS-TIMESTAMP': timestamp
        }
    };

    return options;
  }

  getProducts():Observable<Product[]> {
    const config:AxiosRequestConfig = this.signRequest({
        method: 'GET',
        path: '/products',
        body: ''
    });

    return this.httpService.get(config.url, config)
      .pipe(map(response => response.data));
  }

  getProductOrderBook(id: string):Observable<ProductOrderBoook> {
    const config:AxiosRequestConfig = this.signRequest({
        method: 'GET',
        path: `/products/${id}/book/?level=2`,
        body: ''
    });

    return this.httpService.get(config.url, config)
      .pipe(map(response => response.data));
  }
}
