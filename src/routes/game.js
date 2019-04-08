import express from 'express'

import { queryHandler } from '../serverUtils'

export const gameRouter = express.Router({ mergeParams: true })

gameRouter
  .route('/sessions')
  .get((req, res) => queryHandler(req, res, 'SELECT * from game_session'))

gameRouter.route('/frame').get((req, res) => queryHandler(req, res, 'SELECT * from game_frame'))
