import { Injectable, BadGatewayException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IBaseService } from './iBase.service';

@Injectable()
export class BaseService<T> implements IBaseService<T> {

  constructor(
    private readonly genericRepository: Repository<T>
  ) { }

  //Generic CRUD
  findAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this.genericRepository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findOne(id: string): Promise<T> {
    try {
      return <Promise<T>>this.genericRepository.findOne(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(id:string,entity: T): Promise<any> {
    try {
      const responseAux = await this.genericRepository.findOne(id);
      if(responseAux == null) throw new NotFoundException("El id no existe");
      const response = this.genericRepository.update(id,entity);
      return response;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async save(entity: T): Promise<T> {
    try {
      const response: T = await this.genericRepository.save(entity);
      return response;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  delete(id: string) {
    try {
      this.genericRepository.delete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}