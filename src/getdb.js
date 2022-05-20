import sq3 from 'sqlite3'
const pathUtil = require('../utils/pathUtil.js')

export const dbPath = pathUtil.getAppResourcePath('db/data.sqlite1')
const sqlite3 = sq3.verbose()
const db = new sqlite3.Database("./db.sqlite")

db.serialize(() => {
  db.run('create table test(name varchar(15))', function () {
    db.run("insert into test values('hello,word')", function () {
      db.all('select * from test', function (err, res) {
        if (!err) {
          console.log(JSON.stringify(res))
        } else {
          console.log(err)
        }
      })
    })
  })
})
export default db