# LocalFunctionsInCSharp
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
