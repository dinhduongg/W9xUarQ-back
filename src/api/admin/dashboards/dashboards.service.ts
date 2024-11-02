import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Dashboard } from 'src/database/schemas/dashboard.schema'
import { DashboardDto } from './dto/dashboards.dto'

@Injectable()
export class DashboardsService {
  constructor(@InjectModel(Dashboard.name) private readonly dashboardModel: Model<Dashboard>) {}

  async findAll(query: any) {
    try {
      const { parent_id } = query
      const where = {}

      if (parent_id) {
        where['parent_id'] = parent_id
      } else {
        where['parent_id'] = { $eq: null }
      }

      const dashboards = await this.dashboardModel.find(where).sort({ sorted: 'asc' })
      return { dashboards }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const dashboard = await this.dashboardModel.findById(id)
      return { dashboard }
    } catch (error) {
      throw error
    }
  }

  async create(body: DashboardDto) {
    try {
      const dashboard = await this.dashboardModel.create(body)
      return { dashboard }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, body: DashboardDto) {
    try {
      const dashboard = await this.dashboardModel.findByIdAndUpdate(id, body, { new: true })
      return { dashboard }
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const dashboard = await this.dashboardModel.findByIdAndDelete(id)

      if (dashboard.id) {
        await this.dashboardModel.deleteMany({ parent_id: dashboard.id })
      }

      return { success: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
