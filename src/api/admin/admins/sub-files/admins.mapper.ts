import { Injectable } from '@nestjs/common/decorators'
import { Builder } from 'builder-pattern'
import { AdminRole } from 'src/database/schemas/admin-role.schema'

@Injectable()
export class AdminMapper {
  toAdminRole(source: AdminRole) {
    return Builder<any>()
      ._id(source._id)
      .is_read(source.is_read)
      .is_add(source.is_add)
      .is_edit(source.is_edit)
      .is_delete(source.is_delete)
      .role(Builder<any>().code(source.role.code).description(source.role.description).build())
      .build()
  }
}
