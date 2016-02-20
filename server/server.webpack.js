import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.babel';

export default function (port, proxy) {
  /** Append port to
      Webpack Dev Server entry point string **/
  config.entry[0] = config.entry[0] + port;

  /** Enable Webpack compiler
      and instantiate Webpack Dev Server **/
  let compiler = webpack (config);
  let server = new webpackDevServer (compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true },
    /** Delegates API routes to
        arbitrary Express server **/
    proxy: {
      '*': 'http://localhost:' + proxy },
  });

  server.listen (port, 'localhost', (error, result) => {
    if (error) {
      console.log (error); }
    else {
      console.log ('Webpack is listening on port ' + port); }
  });
};
