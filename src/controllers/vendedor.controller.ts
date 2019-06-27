import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Vendedor } from '../entity/vendedor';
import { VendedorService } from '../services/vendedor.service';

@Controller('vendedor')
export class VendedorController extends BaseController<Vendedor>{
    
    constructor(private readonly service:VendedorService){
        super(service);
    }

}
