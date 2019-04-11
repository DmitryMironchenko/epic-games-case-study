import { isEmpty } from 'lodash'

import { db } from '../db'

export const rawQueryBackdoor = async sql => {
  db.all(sql, (err, res) => {
    if (err) {
      console.log(err.message);
      throw new Error(err.message);
    } else return res;
  });
}

const basicQuery = (sql, res) =>
  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err.message)
      res.json({ error: err.message })
    } else res.send(rows)
  })

export const queryHandler = (req, res, sql, opts = {}) => {
  if (isEmpty(opts)) {
    basicQuery(sql, res)
  } else {
    if (isEmpty(req.query)) {
      res.send(
        `This query is extremely large, therefore you must pass ${opts.param} as a query param`
      )
    } else {
      basicQuery(`${sql}${req.query[opts.param]}`, res)
    }
  }
}
