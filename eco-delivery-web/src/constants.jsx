export const TOKEN_KEY = 'dispatch_token'
export const NAME_KEY = 'dispatch_firstname'
export const ID_KEY = 'dispatch_userid'
export const BASE_URL = 
                process.env.NODE_ENV === 'production' 
                    ? 'http://eco-spring-app.us-east-2.elasticbeanstalk.com' 
                    : 'http://localhost:8080'
                    