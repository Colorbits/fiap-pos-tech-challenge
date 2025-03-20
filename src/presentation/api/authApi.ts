import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Issuer, generators } from 'openid-client';

let client;
// Initialize OpenID Client
async function initializeClient() {
  const issuer = await Issuer.discover(
    'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_i7EkLxU8u',
  );
  client = new issuer.Client({
    client_id: '3foubimolhukrqiuj0jdnetv75',
    client_secret: '<client secret>',
    redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net'],
    response_types: ['code'],
  });
}
initializeClient().catch(console.error);

const getPathFromURL = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.pathname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

@ApiTags('Login')
@Controller('auth')
export class AuthApi {
  private readonly logger = new Logger(AuthApi.name);

  // constructor(@Inject('IService<Auth>') private authService: AuthService) {}

  @Get('')
  verify(req, res) {
    console.log('verify', { req, res });

    return {
      isAuthenticated: req.session.userInfo ? true : false,
      userInfo: req.session.userInfo,
    };
  }

  @Get('login')
  login(req, res) {
    console.log('login', { req, res });

    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
      scope: 'email openid phone',
      state: state,
      nonce: nonce,
    });
    console.log('redirect', authUrl);
    // res.redirect(authUrl);

    return {
      authUrl,
    };
  }

  @Get('logout')
  logout(req, res) {
    console.log('logout', { req, res });

    req.session.destroy();
    const logoutUrl = `https://us-east-2i7eklxu8u.auth.us-east-2.amazoncognito.com/logout?client_id=3foubimolhukrqiuj0jdnetv75&logout_uri=<logout uri>`;
    res.redirect(logoutUrl);
  }

  async get(req, res) {
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(
      'https://d84l1y8p4kdic.cloudfront.net',
      params,
      {
        nonce: req.session.nonce,
        state: req.session.state,
      },
    );

    const userInfo = await client.userinfo(tokenSet.access_token);
    req.session.userInfo = userInfo;

    res.redirect('/');
  }
}
