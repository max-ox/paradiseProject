const DEFAULT_REFRESH_TOKEN_LIFETIME_DAYS = 30;
const DEFAULT_SMTP_PORT = 587;
const DEFAULT_HTTP_PORT = 3000;
const DB_SETTINGS = {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dbName:  process.env.DATABASE_NAME || 'test',
    host:  process.env.DATABASE_HOST || 'localhost',
    port:  process.env.DATABASE_PORT || '27017',
    dialect: 'mongodb'
}


export default () => ({
    // // MailService
    // mailUser: process.env.M_USER,
    // mailPass: process.env.M_PASS,
    // mailFrom: process.env.M_FROM,

    nodeAuthSecret: process.env.NODE_AUTH_SECRET,

    frontendOrigin: process.env.FRONTEND_ORIGIN,

    // smtpPort: process.env.SMTP_PORT || DEFAULT_SMTP_PORT,

    refreshTokenLifetimeDays: parseInt(process.env.REFRESH_TOKEN_LIFETIME_DAYS) || DEFAULT_REFRESH_TOKEN_LIFETIME_DAYS,

    port: parseInt(process.env.PORT, 10) || DEFAULT_HTTP_PORT,
    dbConnectionStr: `${DB_SETTINGS.dialect}://${DB_SETTINGS.username ? (DB_SETTINGS.username+':'+DB_SETTINGS.password+'@') : ''}${DB_SETTINGS.host}:${DB_SETTINGS.port}/${DB_SETTINGS.dbName}`,



});
