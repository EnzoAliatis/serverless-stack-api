import { success } from './libs/response-lib';

export async function main(event, context) {
  return success('hola con todos');
}
