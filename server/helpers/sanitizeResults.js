export default function convertBigIntToString(obj) {
      if (Array.isArray(obj)) {
        return obj.map(convertBigIntToString);
      } else if (obj && typeof obj === 'object') {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)])
        );
      } else if (typeof obj === 'bigint') {
        return obj.toString();
      }
      //console.log("obj",obj);
      return obj;
}