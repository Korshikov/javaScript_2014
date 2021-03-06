/*println("=== dump ===");
function dump() {
    for (var i = 0; i < arguments.length; i++) {
        println(arguments[i]);
    }
}
dump(1, 2, "hello", null, undefined);

println("=== printf ===");
function printf(format) {
    var j = 1;
    for (var i = 0; i < format.length; i++) {
        if (format[i] == '%') {
            switch (format[i + 1]) {
                case "d":
                    print(Number(arguments[j++]));
                    break;
                case "s":
                    print("" + arguments[j++]);
                    break;
            }
            i += 1;
        } else {
            print(format[i]);
        }
    }
}
printf("%d+%d=%d", 1, 2, 2 + 3);
println();
printf("%d+%d=%s", 1, 2, 2 + 3);
println();
printf("%d+%d=%s", 1, 2, "hello");
println();
printf("%d+%d=%d", 1, 2, "hello");
println();

println("=== typeof ===");
function tof(a) {
    println("typeof(" + a + ") == '" + typeof(a) + "'");
}
tof(1);
tof(1.1);
tof("abcd");
tof([1, 2]);
tof(undefined);
tof(null);
tof(tof);

println("=== sort ===");
function sort(a) {
    for (var i = 0; i < a.length; i++) {
        var minJ = i;
        for (var j = i; j < a.length; j++) {
            if (a[minJ] > a[j]) {
                minJ = j;
            }
        }
        var t = a[i];
        a[i] = a[minJ];
        a[minJ] = t;
    } 
    return a;
}

println(sort([40, 10, 20, 30, 3]));
println(sort(["40", "10", "20", "a", "30", "3",]));

println("=== sort with comparator ===");
function csort(comparator, a) {
    for (var i = 0; i < a.length; i++) {
        var minJ = i;
        for (var j = i; j < a.length; j++) {
            if (comparator(a[minJ], a[j]) > 0) {
                minJ = j;
            }
        }
        var t = a[i];
        a[i] = a[minJ];
        a[minJ] = t;
    } 
    return a;
}

var absCompare = function(a, b) {
    return Math.abs(a) - Math.abs(b);
}
println(csort(absCompare, [-2, 1, -4, 3]))

var arrayCompare = function(comparator) {
    return function(a, b) {
        for (var i = 0; 
            i < a.length && i < b.length; i++
        ) {
            if (comparator(a[i], b[i]) < 0) {
                return -1;
            } else if (comparator(a[i], b[i]) > 0) {
                return 1;
            }
        }
        return a.length - b.length;
    }
}

println("=== diff ===");
var diff = function(dx) {
    return function(f) {
        return function(x) {
            return (f(x + dx) - f(x)) / dx;
        }
    }
}

var dsin = diff(1e-6)(Math.sin);
for (var i = 0; i < 10; i++) {
    println(i + " " + Math.cos(i) + " " + dsin(i) + " " + Math.abs(Math.cos(i) - dsin(i)));
}

println("=== curry ===");

var curry = function(f) {
    return function(a) {
        return function(b) {
            return f(a, b);
        }
    }
}

var add = curry(function(a, b) { return a + b; });
var add10 = add(10);
println(add(10)(20));
println(add10(20));

println("=== mCurry ===");
var mCurry = function(f) {
    return function(a) {
        return function() {
            var newArguments = [a];
            for (var i = 0; i < arguments.length; i++) {
                newArguments.push(arguments[i]);
            }
            return f.apply(null, newArguments);
        }
    }
}

var sub = mCurry(function(a, b, c) { return a - b - c; });
var sub10 = sub(10);
println(sub(10)(20, 30));
println(sub10(20, 30));

println("=== compose ===");
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    }
}
println(compose(add(10), add(20))(30));
*/

var variable = function(variableName){
    return function(x,y,z){
        if((variableName=="X")||(variableName=="x")){
            return x;
        }
        if((variableName=="Y")||(variableName=="y")){
            return y;
        }
        if((variableName=="Z")||(variableName=="z")){
            return z;
        }
           
    }
}

var cnst = function(constValue){
    return function(){
        return constValue;
    }
}

var add = function(){
    var superArguments = arguments;
    return function(x,y,z){
        var ret = 0;
        for(var i=0; i<superArguments.length; i++){
            ret+= superArguments[i](x,y,z);
        }
        return ret;
    }
}

var subtract = function(){
    var superArguments = arguments;
    return function(x,y,z){
        var ret = superArguments[0](x,y,z);;
        for(var i=1; i<superArguments.length; i++){
            ret-= superArguments[i](x,y,z);
        }
        return ret;
    }
}

var multiply = function(){
    var superArguments = arguments;
    return function(x,y,z){
        var ret = 1;
        for(var i=0; i<superArguments.length; i++){
            ret*= superArguments[i](x,y,z);
        }
        return ret;
    }
}

var divide = function(){
    var superArguments = arguments;
    return function(x,y,z){
        var ret = superArguments[0](x,y,z);;
        for(var i=1; i<superArguments.length; i++){
            ret/= superArguments[i](x,y,z);
        }
        return ret;
    }
}

var abs = function(operand){
    return function(x,y,z){
        return Math.abs(operand(x,y,z));
    }
}

var log = function(operand){
    return function(x,y,z){
        return Math.log(operand(x,y,z));
    }
}

var parse = function(string){
    var operands = [];
    var tockens = string.split("/\s+/g");
    for (var i = 0; i< tockens.length; i++){
        switch(tockens[i][0]){
            case "x":
            case "X":
            case "y":
            case "Y":
            case "z":
            case "Z":
                operand[]=variable(tockens[i])
            break;
        }
    }

}

var expr = subtract(
                    multiply(
                                cnst(2),
                                variable("x")
                            ),
                    cnst(3)
                    );
println(expr(5));

