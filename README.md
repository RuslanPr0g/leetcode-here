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

Here in Closure type, its method accesses data inside and outside its definition. Similarly, local function can access variable inside and outside its definition as well:

<pre>
<code>
internal static void LocalFunctionWithClosure()

{

    int free = 1; // Outside local function Add.

    void Add()

    {

        int local = 2; // Inside local function Add.

        (local + free).WriteLine();

    }

    Add();

}
</code>
</pre>

Here free is a variable defined by outer function and is outside the local function. In C# it can be accessed by both the outer function and the local function. It is the local variable of the outer function, and it is called free variable of the local function. In another word, for a local function, if a variable is neither its local variable, nor its parameter, then this variable is its free variable. Free variable is also called outer variable, non-local variable, or captured variable. This capability for local function to access a free variable, is called closure. C# closure is also a syntactic sugar. The above example is compiled to a closure structure:

<pre>
<code>
[CompilerGenerated]

[StructLayout(LayoutKind.Auto)]

private struct Closure1

{

    public int Free;

}

 

[CompilerGenerated]

private static void CompiledAdd(ref Closure1 closure)

{

    int local = 2;

    (local + closure.Free).WriteLine();

}

 

internal static void CompiledLocalFunctionWithClosure()

{

    int free = 1;

    Closure1 closure = new Closure1() { Free = free };

    CompiledAdd(ref closure);

}
</code>
</pre>

C# compiler generates:
- A closure structure to capture the free variable as field.
- A normal method member definition to represent the local function, with a closure parameter. In its body, the reference to free variable is compiled to reference to closure’s field.
-   A normal method member call with a closure argument, whose field is initialized with the free variable. The instantiated closure is passed to the generated method member as alias to avoid copying the closure instance, since it is a structure. Function input as alias is discussed in the function input and output chapter.
