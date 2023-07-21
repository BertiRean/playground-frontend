// Ask the Time Complexity of startsWith in terms of O(n)
export const prefixSearch = (source, target) => {
  if (target.length === 0)
      return true;

  const srcLower = source.toLowerCase();
  const targetLower = target.toLowerCase();
  
  return srcLower.startsWith(targetLower);
}
