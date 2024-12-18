import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Library, LibrarySchema } from 'src/database/schemas/libraries.schema'
import { Slide, SlideSchema } from 'src/database/schemas/slide.schema'
import { AdminsModule } from '../admins/admins.module'
import { LibrariesModule } from '../libraries/libraries.module'
import { SlidesController } from './slides.controller'
import { SlidesService } from './slides.service'
import { CloudinaryModule } from 'src/api/cloudinary/cloudinary.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Slide.name, schema: SlideSchema },
      { name: Library.name, schema: LibrarySchema },
    ]),
    AdminsModule,
    LibrariesModule,
    CloudinaryModule,
  ],
  controllers: [SlidesController],
  providers: [SlidesService],
})
export class SlidesModule {}
