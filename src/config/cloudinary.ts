import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

function dotenvConfig() {
  const envFile = fs.existsSync('.env.development') ? '.env.development' : '.env'
  dotenv.config({ path: envFile })
}

dotenvConfig()

const configService = new ConfigService()

cloudinary.config({
  cloud_name: configService.get('CLOUDINARY_NAME'),
  api_key: configService.get('CLOUDINARY_API_KEY'),
  api_secret: configService.get('CLOUDINARY_API_SECRET'),
})

export { cloudinary }
