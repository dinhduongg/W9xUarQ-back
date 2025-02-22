import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Sequence, SequenceSchema } from './schemas/sequence.schema'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongodb_username = configService.get('mongo_db.username')
        const mongodb_password = configService.get('mongo_db.password')
        const mongodb_app_name = configService.get('mongo_db.app_name')
        const mongodb_database_name = configService.get('mongo_db.database_name')

        return {
          uri: `mongodb+srv://${mongodb_username}:${mongodb_password}@w9xuarq-back.h9uv7.mongodb.net/?retryWrites=true&w=majority`,
          appName: mongodb_app_name,
          dbName: mongodb_database_name,
        }
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Sequence.name, schema: SequenceSchema }]),
  ],
})
export class DatabaseModule {}
