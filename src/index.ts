import app from './app'
import connection from './database/config'

connection.then(() => {
    console.log('Database connected')
    app.listen(app.get('port'), () => {
        console.log(`App live on: http://localhost:${app.get('port') as number}`)
    })
}
).catch(err => { console.error('Error connecting to database:', err) })