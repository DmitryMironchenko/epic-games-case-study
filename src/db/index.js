import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database(
  'web-test.db',
  sqlite3.OPEN_READONLY,
  err => err && console.warn(err.message)
)
