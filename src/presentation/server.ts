import express, { Router } from 'express';
import path from 'path';


interface Options {
  port: number;
  routes: Router;
  public_path?: string;
};

export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const {port, routes, public_path = 'public'} = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = public_path;

  }

  async start() {

    //* middlewres
    this.app.use(express.json()); //  nos permite recibir bodies de tipo raw
    this.app.use(express.urlencoded({ extended: true })); // nos permite recibir bodies de tipo x-www-form-urlencoded

    //* public folder
    this.app.use(express.static('./src/public'));

    //* Routes    
    this.app.use(this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../${this.publicPath}/index.html`); // ../../public/index.html
      res.sendFile(indexPath);
      return;
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on Port ${this.port}`);
      
    });
  }
}