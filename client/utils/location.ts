import AMapLoader from '@amap/amap-jsapi-loader';

export const location = () => {
  return AMapLoader.load({
    'key': '116afc288137336b95607e7faf55f2af', // 申请好的Web端开发者Key，首次调用 load 时必填
    'version': '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    'plugins': [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });
};
