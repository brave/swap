export const reduceAddress = (address: string) => {
  const firstHalf = address.slice(0, 4)
  const secondHalf = address.slice(-4)
  const reduced = firstHalf.concat('***', secondHalf)
  return reduced
}
