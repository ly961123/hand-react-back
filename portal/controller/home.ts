import axios from 'axios';
import ip from 'ip';
import cheerio from 'cheerio';

const readWebpackHtml = async (): Promise<string> => {
  const html = await axios.get(`http://${ip.address()}:8000/index.html`);
  return html.data;
};

export const index = async (ctx: any) => {
  
  // const global = {
  //   env: process.env.NODE_ENV || 'development',
  //   downloadHost: process.env.DOWNLOAD_HOST || 'http://9.137.96.6',
  // };

  const html = await readWebpackHtml();
  const $ = cheerio.load(html);
  // $('#crm-global').attr('value', JSON.stringify(global));
  
  // =====================================================最最重要========================================
  ctx.body = $.html();
};
