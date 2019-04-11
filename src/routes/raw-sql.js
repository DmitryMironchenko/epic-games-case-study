import express from 'express';

import { queryHandler, rawQueryBackdoor } from '../serverUtils';

export const rawSqlRouter = express.Router({ mergeParams: true });

rawSqlRouter
  .route('/')
  .get(async (req, res) => {
    const { query } = req.query;

    !!query && await rawQueryBackdoor(
      `INSERT INTO query_history (query) VALUES ("${query}")`,
    );

    queryHandler(req, res, req.query.query);
  });

rawSqlRouter
  .route('/history')
  .get((req, res) => queryHandler(req, res, 'SELECT * FROM query_history ORDER BY query_id DESC LIMIT 10'));
