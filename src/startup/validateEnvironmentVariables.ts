import {
    cleanEnv, port, str,
} from 'envalid';

const validateEnvironmentVariables = (): void => {
    cleanEnv(process.env, {
        JWT_SECRET: str(),
        MONGO_USERS: str(),
        MONGO_LOGGING: str(),
        API_SKILLS: str(),
        PORT: port(),
        HOST: str(),
    });
};

export default validateEnvironmentVariables;
