export class NameHelper {
  static toUpperCaseFormat(name: string): string {
    return `${name[0].toUpperCase()}${name.slice(1)}`;
  }
}
