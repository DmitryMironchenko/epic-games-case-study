import express from 'express';

import { queryHandler } from '../serverUtils';

export const weaponRouter = express.Router({ mergeParams: true });

weaponRouter
  .route('/kills')
  .get((req, res) =>
    queryHandler(
      req,
      res,
      'SELECT COUNT(weapon) kills, weapon FROM player_kill GROUP BY weapon ORDER BY kills ASC',
    )
  );
