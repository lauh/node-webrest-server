import express from 'express';
import path from 'path';


interface Options {
  port: number;
  public_path?: string;
};

export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string

  constructor(options: Options) {
    const {port, public_path = 'public'} = options;
    this.port = port;
    this.publicPath = public_path;

  }

  async start() {

    // middlewres

    // public folder
    this.app.use(express.static('./src/public'));

    this.app.get('*', (req, res) => {
      // console.log('reqUrl', req.url);
      // res.send('hola mundo')
      const indexPath = path.join(__dirname + `../../${this.publicPath}/index.html`); // ../../public/index.html
      res.sendFile(indexPath);
      return;
    })

    this.app.listen(3000, () => {
      console.log(`Server running on Port ${3000}`);
      
    });
  }
}