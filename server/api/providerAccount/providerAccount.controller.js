/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/providerAccount              ->  index
 * POST    /api/providerAccount              ->  create
 * GET     /api/providerAccount/:id          ->  show
 * PUT     /api/providerAccount/:id          ->  update
 * DELETE  /api/providerAccount/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ProviderAccount from './providerAccount.model';
import request from 'request';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ProviderAccounts
export function index(req, res) {
  request('http://localhost:9000/api/oprWithoutAuth/providerAccount', function (err, res, body) {
    respondWithResult(body);
  });
  //req.app.models.provideraccount.find()
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
}

// Gets a single ProviderAccount from the DB
export function show(req, res) {
  req.app.models.provideraccount.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ProviderAccount in the DB
export function create(req, res) {
  ProviderAccount.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ProviderAccount in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ProviderAccount.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ProviderAccount from the DB
export function destroy(req, res) {
  ProviderAccount.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
