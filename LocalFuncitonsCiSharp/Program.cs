List<int> comparingThings = new List<int> { 0, 1, 2, 3, 4, 5, };
comparingThings.BinarySearch(5);

TestClosure.IsVariableChangesInParentFunction();

internal static class TestClosure
{
    public static void IsVariableChangesInParentFunction()
    {
        int free = 1;
        void IsVariableChangesInParentFunctionLocal()
        {
            free = 2;
        }
        Console.WriteLine(free);
    }
}