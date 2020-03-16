import { sortBy, toPairs, fromPairs } from 'lodash';

/* 对root.properties进行排序 */
function sortProperties(properties: object): object {
  const propertiesArr: Array<[string, any]> = (Object.entries || toPairs)(properties);
  const sortPropertiesArr: Array<[string, any]> = sortBy(propertiesArr, function(o: [string, any]): number {
    return o[1].$order ?? 0;
  });

  // @ts-ignore
  return (Object.fromEntries || fromPairs)(sortPropertiesArr);
}

export default sortProperties;
