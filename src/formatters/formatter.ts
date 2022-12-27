import { MissingIndex } from '../missing-index';

export abstract class Formatter {
  abstract format(elements: MissingIndex[]): string;
}
