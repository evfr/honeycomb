import express from 'express';
import { performance } from 'perf_hooks';
import { Request, Response, NextFunction } from 'express';
import UserController from './controllers/UserController';
import PDFController from './controllers/PDFController';

import DbService from './services/DbService';

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // middleware to measure response time
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const start = performance.now();
    
      res.on('finish', () => {
        const end = performance.now();
        const responseTime = end - start;
    
        console.log(`Response time: ${responseTime} ms`);
      });
    
      next();
    });

    // logging middleware for incoming requests
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const timestamp = new Date().toISOString();
      const method = req.method;
      const url = req.originalUrl;

      console.log(`[${timestamp}] ${method} ${url}`);

      // Continue with the request handling
      next();
    });
  }

  private configureRoutes(): void {
    const userController = new UserController();
    const pdfController = new PDFController();

    this.app.post('/signup', userController.signUp);
    this.app.post('/login', userController.login);

    this.app.post('/fillform', userController.authenticate, pdfController.fillForm);
  }

  public async start(): Promise<void> {
    await DbService.getDb();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const port = 3000;
const server = new Server(port);
server.start();
