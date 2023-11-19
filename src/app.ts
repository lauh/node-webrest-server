import { envs } from './config/envs';
import { Server } from './presentation/server';

( () => {
  main();
})();

function main() {
  console.log('main');
  const server = new Server({
    port: Number(envs.PORT),
    public_path: envs.PUBLIC_PATH
  });
  server.start();
  
}