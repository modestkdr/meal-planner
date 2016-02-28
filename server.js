import Webpack from './server/server.webpack';
import Express from './server/server.express'
require('dotenv').config();

var PORT_NUMBER = parseInt(process.env.PORT_NUMBER);
var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  /** Production workflow builds bundled files
      and runs a single Express server
      pointing to the ./dist directory **/
  Express (PORT_NUMBER, isProduction); }
else {
  /** Development workflow leverages the Webpack Dev Server
      for serving files while using an abitrary Express server
      for serving API routes  **/
  Express (PORT_NUMBER + 1, isProduction);
  Webpack (PORT_NUMBER, PORT_NUMBER + 1); }
