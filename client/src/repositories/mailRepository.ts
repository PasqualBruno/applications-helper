import type { AxiosInstance } from "axios";
import type { IApplicationDTO } from "../interfaces/application";
import api from "../services/api";

class MailRepository {
  private readonly api: AxiosInstance;
  private readonly path: string = "/application";

  constructor() {
    this.api = api;
  }

  async sendEmail(data: IApplicationDTO): Promise<any> {
    const response = await this.api.post(`${this.path}/send`, data);
    return response.data;
  }

  //   async listApplications(): Promise<any> {
  //     const response = await this.api.get(`${this.path}/listar`);
  //     return response.data;
  //   }
}

export const ApplicationRepository = new MailRepository();
