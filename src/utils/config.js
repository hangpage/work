const config = {};

config.URL = '';

config.DOCS = 'https://www.showdoc.cc/253952337641641';

config.MAP_KEY = '788e08def03f95c670944fe2c78fa76f';

config.UPLOAD_URL = '/api/upload/uploadFile';

if(process.env.NODE_ENV === 'production'){
  config.UPLOAD_URL = '/beili/upload/uploadFile';
}


export default config;
