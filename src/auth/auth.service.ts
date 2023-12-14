// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import  Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'redis-11353.c322.us-east-1-2.ec2.cloud.redislabs.com', 
      port: 11353,  
      password: 'a6LyQ9MxNzQUKP53cZkvyOidSS7ktydj'    
    });
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const storedEmail = await this.redisClient.get('user:demo@gmail.com:email');
    const storedPassword = await this.redisClient.get('user:demo@gmail.com:password');

    return email === storedEmail && password === storedPassword;
  }
}
