interface Attributes {
  [key: string]: any;
  expires?: number | Date | string;
}

// https://github.com/js-cookie/js-cookie
export default class Cookies {
  public static set(
    name: string,
    value: string,
    _attributes: Attributes = { expires: 7 }
  ) {
    if (typeof document === "undefined") {
      return;
    }

    const attributes = { path: "/", ..._attributes } as Attributes;

    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires && typeof attributes.expires === "object") {
      attributes.expires = attributes.expires.toUTCString();
    }

    let stringifiedAttributes = "";
    for (const attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }

      stringifiedAttributes += "; " + attributeName;

      if (attributes[attributeName] === true) {
        continue;
      }

      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }

    document.cookie = `${name}=${value}${stringifiedAttributes}`;
  }

  public static get(name: string) {
    if (typeof document === "undefined") {
      return;
    }

    const cookies = document.cookie ? document.cookie.split("; ") : [];

    const jar: any = {};
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split("=");

      const value = parts.slice(1).join("=");

      try {
        const found = decodeURIComponent(parts[0]);
        if (!jar[found]) {
          function read(value: string) {
            if (value[0] === '"') {
              value = value.slice(1, -1);
            }
            return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
          }

          jar[found] = read(value);
        }

        if (name === found) {
          break;
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar;
  }

  public static remove(name: string) {
    Cookies.set(name, "", { expires: -1 });
  }
}
