import { BaseApiService } from '@/services/api/BaseApiService'
import { Pill, PillForm } from '@/interfaces/laba2'

class PillsService extends BaseApiService {
  async uploadPills (): Promise<Pill[]> {
    return await this.callMethod('get', 'pills')
  }

  async createPills (pillForm: PillForm): Promise<Pill> {
    return await this.callMethod('post', 'pills', { pill: pillForm })
  }

  async updatePills (pillForm: PillForm, pillId: string): Promise<Pill> {
    return await this.callMethod('put', `pills/${pillId}`, { pill: pillForm })
  }

  async deletePill (pillId: string): Promise<void> {
    await this.callMethod('delete', `pills/${pillId}`)
  }
}

export default new PillsService()
