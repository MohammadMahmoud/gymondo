import App from './bootstrap/server';
import mongoose from 'mongoose';

const PORT = parseInt(process.env.SERVER_PORT as string, 10) || 3001;

/* istanbul ignore if */
const server = App.listen(PORT, () =>
  console.log(`server listening on port ${PORT}!`)
).on('error', () => {
  console.log(`Error PORT ${PORT} is in already use`);
});

const exitHandler = (errorType: string) => {
  console.info(`\n${errorType} received.`);
  console.log('Closing http server.');
  server.close(async () => {
    console.log('Http server closed.');
    await mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.exit(0);
    });
  });
};

//Graceful shutdown
process.on('SIGINT', async () => exitHandler('SIGINT'));
process.on('SIGTERM', async () => exitHandler('SIGTERM'));
process.on('unhandledRejection', async () => exitHandler('unhandledRejection'));
process.on('uncaughtException', async () => exitHandler('uncaughtException'));

export default App;
