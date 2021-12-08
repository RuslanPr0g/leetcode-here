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
