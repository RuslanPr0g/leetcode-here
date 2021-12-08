# C# Local Function and Closure
C# 7.0 introduces local function, which allows defining and calling a named, nested function inside a function. Unlike a local variable, which has to be used after being defined, a local function can be called before or after it is defined

<pre>
<code>
internal static void MethodWithLocalFunction()

{

    void LocalFunction() // Define local function.

    {

        MethodBase.GetCurrentMethod().Name.WriteLine();

    }

    LocalFunction(); // Call local function.

}

 

internal static int PropertyWithLocalFunction

{

    get

    {

        LocalFunction(); // Call local function.

        void LocalFunction() // Define local function.

        {

            MethodBase.GetCurrentMethod().Name.WriteLine();

        }

        LocalFunction(); // Call local function.

        return 0;

    }

}
</code>
</pre>

Local function is a syntactic sugar. Its definition is compiled to normal method definition, and its call is compiled to method call. For example, the above method with local function is compiled to:

<pre>
<code>
[CompilerGenerated]

internal static void CompiledLocalFunction()

{

    MethodBase.GetCurrentMethod().Name.WriteLine();

}



internal static void CompiledMethodWithLocalFunction()

{

    CompiledLocalFunction();

}
</code>
</pre>

Besides method members, local function can also be nested inside local function:

<pre>
<code>
internal static void LocalFunctionWithLocalFunction()

{

    void LocalFunction()

    {

        void NestedLocalFunction() { }

        NestedLocalFunction();

    }

    LocalFunction();

}
</code>
</pre>

Anonymous function can have local function as well

<pre>
<code>
internal static Action AnonymousFunctionWithLocalFunction()

{

    return () => // Return an anonymous function of type Action.

    {

        void LocalFunction() { }

        LocalFunction();

    };

}
</code>
</pre>

Unlike other named functions, local function does not support ad hoc polymorphism (overload). The following code cannot be compiled:


<pre>
<code>
internal static void LocalFunctionOverload()

{

    void LocalFunction() { }

    void LocalFunction(int int32) { } // Cannot be compiled.

}
</code>
</pre>

Local function is useful to encapsulate code execution in a function. For example, the following binary search function encapsulate the main algorithm in a local function, and execute it recursively:

<pre>
<code>
internal static int BinarySearchWithLocalFunction<T>(this IList<T> source, T value, IComparer<T> comparer = null)

{

    int BinarySearch(

        IList<T>localSource, T localValue, IComparer<T>localComparer, int startIndex, int endIndex)

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
</code>
</pre>

C# local function supports closure, so above local function can be further simplified
<br/>
Local function is also useful with asynchronous function and generator function to isolate the asynchronous execution and deferred execution

## Closure

In object-oriented programming, it is “perfectly nature normal thing” for a type’s method member to use local variable and field member:
<pre>
<code>
internal class Closure

{

    int field = 1; // Outside function Add.

 

    internal void Add()

    {

        int local = 2; // Inside function Add.

        (local + field).WriteLine(); // local + this.field.

    }

}
</code>
</pre>
