import express from 'express'
import { capitalize } from 'lodash'

import { queryHandler } from '../serverUtils'

export const playerRouter = express.Router({ mergeParams: true })

playerRouter
  .route('/kills')
  .get((req, res) =>
    queryHandler(
      req,
      res,
      'SELECT killer_guid, COUNT(victim_guid) "kills" FROM player_kill GROUP BY killer_guid;'
    )
  )

playerRouter.route('/:type').get((req, res) => {
  const { type } = req.params
  return queryHandler(
    req,
    res,
    `SELECT * from player_state WHERE playerguid = '${capitalize(type)}'`
  )
})
