import uniqObjects from "../../modules/uniqueObjects";

export const handler = (event, context, callback) => callback(null, {
  event,
  function: {
    name: 'hello',
  },
  output: uniqObjects([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }], 'a')
})