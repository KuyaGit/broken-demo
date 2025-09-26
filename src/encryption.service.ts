import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  public async encrpytText(toEncrpyt: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(toEncrpyt, saltOrRounds);
    return hash;
  }
}
