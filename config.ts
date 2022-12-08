import dotenv from 'dotenv';

dotenv.config();

export interface ServerConfig {
  PRIVATE_KEY: {
    [CHAIN_NAME: string]: string;
  },
  PROVIDER:{
    [PROVIDER_NAME: string]: string;
  }
}

export const SERVER_CONFIG: ServerConfig = {
  PRIVATE_KEY: {
    YEN: process.env.YEN_PRIVATE_KEY as string,
  },
  PROVIDER:{
    YEN:  process.env.YEN_PROVIDER as string,
  }
};
