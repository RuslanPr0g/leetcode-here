static class Ext
{
    internal static int BinarySearchWithLocalFunction<T>(this IList<T> source, T value, IComparer<T>? comparer = null)

    {
        static int BinarySearch(IList<T> localSource, T localValue,
            IComparer<T> localComparer, int startIndex, int endIndex)
        {
            if (startIndex > endIndex) { return -1; }

            int middleIndex = startIndex + (endIndex - startIndex) / 2;

            int compare = localComparer.Compare(localSource[middleIndex], localValue);

            if (compare == 0) { return middleIndex; }

            return compare > 0

                ? BinarySearch(localSource, localValue, localComparer, startIndex, middleIndex - 1)

                : BinarySearch(localSource, localValue, localComparer, middleIndex + 1, endIndex);

        }

        return BinarySearch(source, value, comparer ?? Comparer<T>.Default, 0, source.Count - 1);
    }
}
