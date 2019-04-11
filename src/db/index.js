import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database(
  'web-test.db',
  sqlite3.OPEN_READWRITE,
  err => err && console.warn(err.message)
)
