export const nextPosition = (
  items: { id: number; position: number }[],
  index?: number,
  excludedId?: number
) => {
  const POSITION_GAP = 65535;

  const filteredItems =
    excludedId === undefined
      ? items
      : items.filter((item) => item.id !== excludedId);

  if (index === undefined) {
    const lastItem = filteredItems[filteredItems.length - 1];

    return (lastItem ? lastItem.position : 0) + POSITION_GAP;
  }

  const prevItem = filteredItems[index - 1];
  const nextItem = filteredItems[index];

  const prevPosition = prevItem ? prevItem.position : 0;

  if (!nextItem) {
    return prevPosition + POSITION_GAP;
  }

  return prevPosition + (nextItem.position - prevPosition) * 0.5;
};
