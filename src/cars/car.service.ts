import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dtos/create-car-dto';
import { Car } from './schema/car.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = new this.carModel(createCarDto);
    return await car.save();
  }

  async findOne(licensePlate: string): Promise<Car | null> {
    return await this.carModel.findOne({ licensePlate }).exec();
  }

  async findAll(): Promise<Car[]> {
    return await this.carModel.find().exec();
  }

  async update(licensePlate: string, updateCarDto: Partial<CreateCarDto>): Promise<Car> {
    return await this.carModel.findOneAndUpdate({ licensePlate }, updateCarDto, { new: true }).exec();
  }

  async delete(licensePlate: string): Promise<void> {
    await this.carModel.findOneAndDelete({ licensePlate }).exec();
  }
}


// 1. **Event Loop**:
//     - O Event Loop é um conceito crucial em ambientes JavaScript para gerenciar operações assíncronas. No contexto do Nest, ele é utilizado para lidar com solicitações HTTP de forma eficiente, garantindo a não-bloqueio da execução do código.
// 2. **Libuv e V8**:
//     - O Libuv é uma biblioteca multiplataforma utilizada pelo Node.js para lidar com operações de I/O assíncronas. V8 é o motor JavaScript de código aberto do Google, que interpreta e executa o código JavaScript. No contexto do Nest, essas tecnologias são essenciais para o funcionamento do servidor HTTP e para a execução eficiente do código JavaScript/TypeScript.
// 3. **Resolução de promessas**:
//     - A resolução de promessas é um conceito fundamental em JavaScript/TypeScript para lidar com operações assíncronas. No Nest, é comumente usado para tratar solicitações HTTP e operações de banco de dados de forma não-bloqueante e eficiente.
// 4. **Consumo de APIs**:
//     - O Nest oferece recursos para consumir APIs externas de forma assíncrona e eficiente, utilizando módulos como o **`HttpModule`** para realizar requisições HTTP a outros serviços.
// 5. **Nest Framework**:
//     - O Nest é um framework para construção de aplicativos server-side robustos e escaláveis em Node.js. Ele utiliza TypeScript como linguagem principal e é fortemente baseado na arquitetura MVC (Model-View-Controller), facilitando a organização e manutenção do código.
// 6. **Controllers**:
//     - Os controllers no Nest são responsáveis por lidar com as solicitações HTTP, definindo os endpoints da API e tratando as requisições recebidas.
    
//     ```jsx
//     import { Controller, Get } from '@nestjs/common';
    
//     @Controller('users')
//     export class UsersController {
//         @Get()
//         getUsers(): string {
//             return 'Lista de usuários';
//         }
//     }
//     ```
    
// 7. **Providers**:
//     - Os providers são classes ou funções responsáveis por criar, gerenciar e fornecer instâncias de objetos reutilizáveis em toda a aplicação, como serviços, bancos de dados, etc.
    
//     ```jsx
//     import { Injectable } from '@nestjs/common';
    
//     @Injectable()
//     export class UsersService {
//         getUsers(): string[] {
//             return ['Usuário 1', 'Usuário 2', 'Usuário 3'];
//         }
//     }
//     ```
    
// 8. **Modules**:
//     - Os módulos no Nest são uma forma de organizar e encapsular diferentes partes da aplicação. Eles agrupam controllers, providers e outros elementos relacionados por funcionalidade ou contexto.
    
//     ```jsx
//     import { Module } from '@nestjs/common';
//     import { UsersController } from './users.controller';
//     import { UsersService } from './users.service';
    
//     @Module({
//         controllers: [UsersController],
//         providers: [UsersService],
//     })
//     export class UsersModule {}
//     ```
    
// 9. **Middleware**:
//     - Middleware são funções que têm acesso às solicitações HTTP, podendo executar operações antes ou depois que a solicitação atinja o controller. No Nest, o middleware é utilizado para adicionar funcionalidades como logging, autenticação, validação de entrada, etc.
    
//     ```tsx
//     import { Injectable, NestMiddleware } from '@nestjs/common';
//     import { Request, Response, NextFunction } from 'express';
    
//     @Injectable()
//     export class LoggerMiddleware implements NestMiddleware {
//         use(req: Request, res: Response, next: NextFunction) {
//             console.log(`Request...`);
//             next();
//         }
//     }
//     ```
    
// 10. **Exception Filters**:
//     - Os Exception Filters no Nest são utilizados para capturar e tratar exceções que ocorrem durante a execução da aplicação, retornando respostas HTTP adequadas.
    
//     ```tsx
//     import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
//     import { Request, Response } from 'express';
    
//     @Catch(HttpException)
//     export class HttpExceptionFilter implements ExceptionFilter {
//         catch(exception: HttpException, host: ArgumentsHost) {
//             const ctx = host.switchToHttp();
//             const response = ctx.getResponse<Response>();
//             const request = ctx.getRequest<Request>();
//             const status = exception.getStatus();
    
//             response
//                 .status(status)
//                 .json({
//                     statusCode: status,
//                     timestamp: new Date().toISOString(),
//                     path: request.url,
//                 });
//         }
//     }
    
//     ```
    
// 11. **Pipes**:
//     - Os pipes no Nest são utilizados para transformar e validar dados de entrada nas requisições HTTP, garantindo que os dados recebidos estejam no formato correto antes de serem processados.
    
//     ```tsx
//     import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
    
//     @Injectable()
//     export class ValidationPipe implements PipeTransform<any> {
//         transform(value: any, metadata: ArgumentMetadata) {
//             if (!value) {
//                 throw new BadRequestException('O corpo da requisição está vazio');
//             }
//             return value;
//         }
//     }
//     ```
    
// 12. **Autenticação**:
//     - O Nest oferece suporte integrado para autenticação de usuários, permitindo a implementação de estratégias de autenticação como JWT, OAuth, etc.
    
//     ```tsx
//     import { Injectable } from '@nestjs/common';
//     import { PassportStrategy } from '@nestjs/passport';
//     import { Strategy } from 'passport-local';
//     import { AuthService } from './auth.service';
    
//     @Injectable()
//     export class LocalStrategy extends PassportStrategy(Strategy) {
//         constructor(private authService: AuthService) {
//             super();
//         }
    
//         async validate(username: string, password: string): Promise<any> {
//             const user = await this.authService.validateUser(username, password);
//             if (!user) {
//                 return null;
//             }
//             return user;
//         }
//     }
//     ```
    
// 13. **Autorização**:
//     - A autorização no Nest diz respeito a determinar se um usuário autenticado tem permissão para acessar determinado recurso ou executar determinada ação na aplicação.
    
//     ```tsx
//     import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//     import { Observable } from 'rxjs';
    
//     @Injectable()
//     export class RolesGuard implements CanActivate {
//         canActivate(
//             context: ExecutionContext,
//         ): boolean | Promise<boolean> | Observable<boolean> {
//             const request = context.switchToHttp().getRequest();
//             const user = request.user;
//             // Verifica se o usuário possui a permissão necessária
//             return user.roles.includes('admin');
//         }
//     }
//     ```
    
// 14. **Guards**:
//     - Os guards no Nest são interceptores que podem ser utilizados para proteger rotas e endpoints, verificando se o usuário possui as permissões necessárias para acessá-los.
        
//         ```tsx
//         import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//         import { Observable } from 'rxjs';
        
//         @Injectable()
//         export class AuthGuard implements CanActivate {
//             canActivate(
//                 context: ExecutionContext,
//             ): boolean | Promise<boolean> | Observable<boolean> {
//                 const request = context.switchToHttp().getRequest();
//                 return this.authService.validateRequest(request);
//             }
//         }
//         ```
        
// 15. **Teste de Carga**:
//     - O teste de carga é uma prática importante para avaliar o desempenho e a capacidade de resposta de uma aplicação sob carga simulada. No contexto do Nest, podem ser utilizadas ferramentas como Artillery ou Loader.io para realizar esses testes e otimizar o desempenho da aplicação.
    
//     ```tsx
//     config:
//       target: 'http://localhost:3000'
//       phases:
//         - duration: 60
//           arrivalRate: 20
//     scenarios:
//       - flow:
//           - get:
//               url: '/users'
//     ```
