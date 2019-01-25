export default function uniqObjects (arrayOfObjects, uniqKey) {
  const seenSet = new Set()
  const resultArray = []

  for (let i = 0; i < arrayOfObjects.length; i++) {
    const uniqValue = arrayOfObjects[i][uniqKey]

    if (!seenSet.has(uniqValue)) {
      seenSet.add(uniqValue)
      resultArray.push(arrayOfObjects[i])
    }
  }

  return resultArray
}
