let str = " This is An String For Testing.. ";

// string - is an immutable means spacific place par value change no thay
// array - is an mutable means particular index par value change thay sakse

console.log(str.length); // count the length

console.log(str[7]); // access spacific character

console.log(str.toUpperCase()); // Uppercase

console.log(str.toLowerCase()); // Lowercase

console.log(str.trim()); // remove starting and ending space

console.log(str.trimStart()); // remove starting space

console.log(str.trimEnd()); // remove ending space

console.log(str.slice(7, 14)); // slice spacific word

console.log(str.concat("this is concat string")); // concat string

console.log(str.replace("This", "hello")); // replace spacific word or character string (This replace one time but replaceAll() fuction replace all words)

console.log(str.charAt(3)); // get spacific index charecter