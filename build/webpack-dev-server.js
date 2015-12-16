import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../config';
import webpackConfig from './webpack/development_hot';

const paths = config.get('utils_paths');

const devServer = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: paths.project(config.get('dir_src')),
  hot: true,
  quiet: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  noInfo: false,
  lazy: false,

  stats: {
    colors: true
  },
  historyApiFallback: true
});

export default devServer;
