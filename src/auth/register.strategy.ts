import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StrategyNames } from '../common/enum';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, StrategyNames.REGISTER_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super(async (request, done) => {
      try {
        const user = await this.authService.getUser(request.body.userId);
        done(undefined, user);
      } catch (e) {
        done(e, undefined);
      }
    });
  }
}
