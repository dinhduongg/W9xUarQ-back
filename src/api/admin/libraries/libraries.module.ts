import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CloudinaryModule } from 'src/api/cloudinary/cloudinary.module'
import { Library, LibrarySchema } from 'src/database/schemas/libraries.schema'
import { AdminsModule } from '../admins/admins.module'
import { LibrariesController } from './libraries.controller'
import { LibrariesService } from './libraries.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Library.name, schema: LibrarySchema }]), AdminsModule, CloudinaryModule],
  controllers: [LibrariesController],
  providers: [LibrariesService],
  exports: [LibrariesService],
})
export class LibrariesModule {}
