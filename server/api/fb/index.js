'use strict';

import config from '../../config/environment';
import FB from 'fb';
var debug = require('debug')('authAPI:fb/index');
import refreshToken from './refreshToken';
import ProviderToken from '../../api/providerToken/providerToken.model';

FB.options({
  appId: config.facebook.clientID,
  appSecret: config.facebook.clientSecret
});

var express = require('express');

var router = express.Router();

router.get('/', (req, response) => {
  //get access token by profile id
  if (!req.user) {
    return response.end('Unauthorized!');
  }

  const PROFILE = req.user.provider+':'+req.user.profileId;
  ProviderToken.findByProfileId(PROFILE).then(function (res) {

    FB.setAccessToken(res.accessToken);
    FB.api('me/friends?limit=10', function (res) {
      if(!res || res.error) {
        debug('api/fb GET', !res ? 'error occurred' : res.error);
        return;
      }

      return response.status(200).json(res.data);
    });

  });
});

router.get('/refreshToken', (req, response) => {

  if (!req.user) {
    return response.end('Unauthorized!');
  }

  refreshToken(req.user.provider, req.user.profileId).then(function () {
    response.end();
  }, function () {
    response.end();
  });

});

module.exports = router;
