/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + "//" + originAnchor.host ===
            urlAnchor.protocol + "//" + urlAnchor.host));      //
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function ($) {
  var ready = $.fn.ready;
  $.fn.ready = function (fn) {
    if (this.context === undefined) {
      // The $().ready(fn) case.
      ready(fn);
    } else if (this.selector) {
      ready($.proxy(function(){
        $(this.selector, this.context).each(fn);
      }, this));
    } else {
      ready($.proxy(function(){
        $(this).each(fn);
      }, this));
    }
  }
})(jQuery);

// I found this solution to page specific javascript here: 
// http://brandonhilkert.com/blog/page-specific-javascript-in-rails/
;
document.addEventListener("turbolinks:load", function(){

$(".channels.show").ready(function(){

console.log("channel_ajax.js");

	// some useful variables
	var channel = $('#channelID').val();
	var socket = io.connect('http://192.168.1.250:3001');
	var user = $('#userID').val();

	// the scroll chat gets called a few times so it's a good candidate to be a function
	function scrollChat(){
		var objDiv = document.getElementById("comments");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	scrollChat();

	// on loading the chat viewer emits to the server
	if(user){
		socket.emit("new_viewer", {channel: channel, viewer: user});
	}else{
		socket.emit("new_viewer", {channel: channel, viewer: 'unknown'});
	}

	// on page unload tell the sockets we're leaving!!!
	window.onbeforeunload =function(){
		if(user){
			socket.emit("leaving", {channel: channel, viewer: user});
		}else{
			socket.emit("leaving", {channel: channel, viewer: 'unknown'});
		}
	};

	// or if they click on a link that directs them somewhere else!
	$(document).on('click', 'a', function(){
		if(user){
			socket.emit("leaving", {channel: channel, viewer: user});
		}else{
			socket.emit("leaving", {channel: channel, viewer: 'unknown'});
		}
	})

	// submits a message to the chat
	$('#new_message').submit(function(){
		var comment = $('#new_comment').serialize();
		$.post(`/channels/${channel}/comment`, comment, function(data){
			socket.emit("new_post", {channel: channel, comment: comment});
			$('#new_comment').val('');
			$('#comments').append(data);
			scrollChat();
		});
	return false;
	});

	// allows channel owner to delete a comment
	$(document).on('click', '.delete', function(){
		var del = {};
		// this is the worst line of code I've ever written and it works
		var comment_id = $(this).parent().parent().parent().parent().parent().attr('id');
 		del.comment = comment_id;
		del.user = user;
		$.post(`/comments/${comment_id}/delete`, del, function(data){
			$(`#${comment_id}`).remove();
			if(data.response == "deleted"){
				socket.emit("delete_post", {channel: channel, comment_id: comment_id});
			}
		})
	})

	// allows a user to follow the channel
	$(document).on('click', '#follow', function(){
		console.log("follow button clicked");
		$('#follow').attr('class', 'btn btn-danger');
		$('#follow').html("Unfollow");
		$('#follow').attr('id', 'unfollow');
	})

	// allows a user to unfollow the channel
	$(document).on('click', '#unfollow', function(){
		console.log("unfollow button clicked");
		$('#unfollow').attr('class', 'btn btn-success');
		$('#unfollow').html("Follow");
		$('#unfollow').attr('id', 'follow');
	})

	// fetches a comment from another user
	socket.on('broadcast', function(data){
		if(data.response.channel == channel){
			$.get(`/channels/${channel}/comment`, function(data){
				$('#comments').append(data);
				scrollChat();
			})
		}
	})

	// removes a comment deleted by channel owner
	socket.on('delete', function(data){
		if(data.response.channel == channel){
			$(`#${data.response.comment_id}`).remove();
		}
	})

	// tooltips
	$('[data-toggle="tooltip"]').tooltip();

});

});
(function() {


}).call(this);
window.jwplayer=function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n=window.webpackJsonpjwplayer;window.webpackJsonpjwplayer=function(i,o){for(var a,s,l=0,u=[];l<i.length;l++)s=i[l],r[s]&&u.push.apply(u,r[s]),r[s]=0;for(a in o)e[a]=o[a];for(n&&n(i,o);u.length;)u.shift().call(null,t)};var i={},r={0:0};return t.e=function(e,n){if(0===r[e])return n.call(null,t);if(void 0!==r[e])r[e].push(n);else{r[e]=[n];var i=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.charset="utf-8",o.async=!0,o.src=t.p+""+({1:"provider.caterpillar",2:"provider.shaka",3:"provider.cast",4:"provider.html5",5:"provider.flash",6:"provider.youtube",7:"polyfills.vttrenderer",8:"polyfills.promise",9:"polyfills.base64",10:"vttparser"}[e]||e)+".js",i.appendChild(o)}},t.m=e,t.c=i,t.p="",t(0)}([function(e,t,n){e.exports=n(219)},function(e,t,n){var i,r;i=[],r=function(){var e={},t=Array.prototype,n=Object.prototype,i=Function.prototype,r=t.slice,o=t.concat,a=n.toString,s=n.hasOwnProperty,l=t.map,u=t.reduce,c=t.forEach,d=t.filter,p=t.every,h=t.some,f=t.indexOf,g=Array.isArray,m=Object.keys,w=i.bind,v=function(e){return e instanceof v?e:this instanceof v?void 0:new v(e)},y=v.each=v.forEach=function(t,n,i){if(null==t)return t;if(c&&t.forEach===c)t.forEach(n,i);else if(t.length===+t.length){for(var r=0,o=t.length;r<o;r++)if(n.call(i,t[r],r,t)===e)return}else for(var a=v.keys(t),r=0,o=a.length;r<o;r++)if(n.call(i,t[a[r]],a[r],t)===e)return;return t};v.map=v.collect=function(e,t,n){var i=[];return null==e?i:l&&e.map===l?e.map(t,n):(y(e,function(e,r,o){i.push(t.call(n,e,r,o))}),i)};var j="Reduce of empty array with no initial value";v.reduce=v.foldl=v.inject=function(e,t,n,i){var r=arguments.length>2;if(null==e&&(e=[]),u&&e.reduce===u)return i&&(t=v.bind(t,i)),r?e.reduce(t,n):e.reduce(t);if(y(e,function(e,o,a){r?n=t.call(i,n,e,o,a):(n=e,r=!0)}),!r)throw new TypeError(j);return n},v.find=v.detect=function(e,t,n){var i;return b(e,function(e,r,o){if(t.call(n,e,r,o))return i=e,!0}),i},v.filter=v.select=function(e,t,n){var i=[];return null==e?i:d&&e.filter===d?e.filter(t,n):(y(e,function(e,r,o){t.call(n,e,r,o)&&i.push(e)}),i)},v.reject=function(e,t,n){return v.filter(e,function(e,i,r){return!t.call(n,e,i,r)},n)},v.compact=function(e){return v.filter(e,v.identity)},v.every=v.all=function(t,n,i){n||(n=v.identity);var r=!0;return null==t?r:p&&t.every===p?t.every(n,i):(y(t,function(t,o,a){if(!(r=r&&n.call(i,t,o,a)))return e}),!!r)};var b=v.some=v.any=function(t,n,i){n||(n=v.identity);var r=!1;return null==t?r:h&&t.some===h?t.some(n,i):(y(t,function(t,o,a){if(r||(r=n.call(i,t,o,a)))return e}),!!r)};v.size=function(e){return null==e?0:e.length===+e.length?e.length:v.keys(e).length},v.last=function(e,t,n){if(null!=e)return null==t||n?e[e.length-1]:r.call(e,Math.max(e.length-t,0))},v.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},v.before=function(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}};var E=function(e){return null==e?v.identity:v.isFunction(e)?e:v.property(e)},k=function(e){return function(t,n,i){var r={};return n=E(n),y(t,function(o,a){var s=n.call(i,o,a,t);e(r,s,o)}),r}};v.groupBy=k(function(e,t,n){v.has(e,t)?e[t].push(n):e[t]=[n]}),v.indexBy=k(function(e,t,n){e[t]=n}),v.sortedIndex=function(e,t,n,i){n=E(n);for(var r=n.call(i,t),o=0,a=e.length;o<a;){var s=o+a>>>1;n.call(i,e[s])<r?o=s+1:a=s}return o};var b=v.some=v.any=function(t,n,i){n||(n=v.identity);var r=!1;return null==t?r:h&&t.some===h?t.some(n,i):(y(t,function(t,o,a){if(r||(r=n.call(i,t,o,a)))return e}),!!r)};v.contains=v.include=function(e,t){return null!=e&&(e.length!==+e.length&&(e=v.values(e)),v.indexOf(e,t)>=0)},v.pluck=function(e,t){return v.map(e,v.property(t))},v.where=function(e,t){return v.filter(e,v.matches(t))},v.findWhere=function(e,t){return v.find(e,v.matches(t))},v.max=function(e,t,n){if(!t&&v.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);var i=-(1/0),r=-(1/0);return y(e,function(e,o,a){var s=t?t.call(n,e,o,a):e;s>r&&(i=e,r=s)}),i},v.difference=function(e){var n=o.apply(t,r.call(arguments,1));return v.filter(e,function(e){return!v.contains(n,e)})},v.without=function(e){return v.difference(e,r.call(arguments,1))},v.indexOf=function(e,t,n){if(null==e)return-1;var i=0,r=e.length;if(n){if("number"!=typeof n)return i=v.sortedIndex(e,t),e[i]===t?i:-1;i=n<0?Math.max(0,r+n):n}if(f&&e.indexOf===f)return e.indexOf(t,n);for(;i<r;i++)if(e[i]===t)return i;return-1};var x=function(){};v.bind=function(e,t){var n,i;if(w&&e.bind===w)return w.apply(e,r.call(arguments,1));if(!v.isFunction(e))throw new TypeError;return n=r.call(arguments,2),i=function(){if(!(this instanceof i))return e.apply(t,n.concat(r.call(arguments)));x.prototype=e.prototype;var o=new x;x.prototype=null;var a=e.apply(o,n.concat(r.call(arguments)));return Object(a)===a?a:o}},v.partial=function(e){var t=r.call(arguments,1);return function(){for(var n=0,i=t.slice(),r=0,o=i.length;r<o;r++)i[r]===v&&(i[r]=arguments[n++]);for(;n<arguments.length;)i.push(arguments[n++]);return e.apply(this,i)}},v.once=v.partial(v.before,2),v.memoize=function(e,t){var n={};return t||(t=v.identity),function(){var i=t.apply(this,arguments);return v.has(n,i)?n[i]:n[i]=e.apply(this,arguments)}},v.delay=function(e,t){var n=r.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},v.defer=function(e){return v.delay.apply(v,[e,1].concat(r.call(arguments,1)))},v.throttle=function(e,t,n){var i,r,o,a=null,s=0;n||(n={});var l=function(){s=n.leading===!1?0:v.now(),a=null,o=e.apply(i,r),i=r=null};return function(){var u=v.now();s||n.leading!==!1||(s=u);var c=t-(u-s);return i=this,r=arguments,c<=0?(clearTimeout(a),a=null,s=u,o=e.apply(i,r),i=r=null):a||n.trailing===!1||(a=setTimeout(l,c)),o}},v.keys=function(e){if(!v.isObject(e))return[];if(m)return m(e);var t=[];for(var n in e)v.has(e,n)&&t.push(n);return t},v.invert=function(e){for(var t={},n=v.keys(e),i=0,r=n.length;i<r;i++)t[e[n[i]]]=n[i];return t},v.defaults=function(e){return y(r.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e},v.extend=function(e){return y(r.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e},v.pick=function(e){var n={},i=o.apply(t,r.call(arguments,1));return y(i,function(t){t in e&&(n[t]=e[t])}),n},v.omit=function(e){var n={},i=o.apply(t,r.call(arguments,1));for(var a in e)v.contains(i,a)||(n[a]=e[a]);return n},v.clone=function(e){return v.isObject(e)?v.isArray(e)?e.slice():v.extend({},e):e},v.isArray=g||function(e){return"[object Array]"==a.call(e)},v.isObject=function(e){return e===Object(e)},y(["Arguments","Function","String","Number","Date","RegExp"],function(e){v["is"+e]=function(t){return a.call(t)=="[object "+e+"]"}}),v.isArguments(arguments)||(v.isArguments=function(e){return!(!e||!v.has(e,"callee"))}),v.isFunction=function(e){return"function"==typeof e},v.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},v.isNaN=function(e){return v.isNumber(e)&&e!=+e},v.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==a.call(e)},v.isNull=function(e){return null===e},v.isUndefined=function(e){return void 0===e},v.has=function(e,t){return s.call(e,t)},v.identity=function(e){return e},v.constant=function(e){return function(){return e}},v.property=function(e){return function(t){return t[e]}},v.propertyOf=function(e){return null==e?function(){}:function(t){return e[t]}},v.matches=function(e){return function(t){if(t===e)return!0;for(var n in e)if(e[n]!==t[n])return!1;return!0}},v.now=Date.now||function(){return(new Date).getTime()},v.result=function(e,t){if(null!=e){var n=e[t];return v.isFunction(n)?n.call(e):n}};var A=0;return v.uniqueId=function(e){var t=++A+"";return e?e+t:t},v}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(8),n(1),n(26),n(45),n(28),n(46),n(18),n(44),n(47),n(81),n(190)],r=function(e,t,n,i,r,o,a,s,l,u,c){var d={};return d.log=function(){window.console&&("object"==typeof console.log?console.log(Array.prototype.slice.call(arguments,0)):console.log.apply(console,arguments))},d.between=function(e,t,n){return Math.max(Math.min(e,n),t)},d.foreach=function(e,t){var n,i;for(n in e)"function"===d.typeOf(e.hasOwnProperty)?e.hasOwnProperty(n)&&(i=e[n],t(n,i)):(i=e[n],t(n,i))},d.indexOf=t.indexOf,d.noop=function(){},d.seconds=e.seconds,d.prefix=e.prefix,d.suffix=e.suffix,t.extend(d,o,a,l,n,s,i,r,u,c),d}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){var t=[],n=t.slice,i={on:function(e,t,n){if(!o(this,"on",e,[t,n])||!t)return this;this._events||(this._events={});var i=this._events[e]||(this._events[e]=[]);return i.push({callback:t,context:n}),this},once:function(t,n,i){if(!o(this,"once",t,[n,i])||!n)return this;var r=this,a=e.once(function(){r.off(t,a),n.apply(this,arguments)});return a._callback=n,this.on(t,a,i)},off:function(t,n,i){var r,a,s,l,u,c,d,p;if(!this._events||!o(this,"off",t,[n,i]))return this;if(!t&&!n&&!i)return this._events=void 0,this;for(l=t?[t]:e.keys(this._events),u=0,c=l.length;u<c;u++)if(t=l[u],s=this._events[t]){if(this._events[t]=r=[],n||i)for(d=0,p=s.length;d<p;d++)a=s[d],(n&&n!==a.callback&&n!==a.callback._callback||i&&i!==a.context)&&r.push(a);r.length||delete this._events[t]}return this},trigger:function(e){if(!this._events)return this;var t=n.call(arguments,1);if(!o(this,"trigger",e,t))return this;var i=this._events[e],r=this._events.all;return i&&a(i,t,this),r&&a(r,arguments,this),this},triggerSafe:function(e){if(!this._events)return this;var t=n.call(arguments,1);if(!o(this,"trigger",e,t))return this;var i=this._events[e],r=this._events.all;return i&&s(i,t,this,e),r&&s(r,arguments,this,e),this}},r=/\s+/,o=function(e,t,n,i){if(!n)return!0;if("object"==typeof n){for(var o in n)e[t].apply(e,[o,n[o]].concat(i));return!1}if(r.test(n)){for(var a=n.split(r),s=0,l=a.length;s<l;s++)e[t].apply(e,[a[s]].concat(i));return!1}return!0},a=function(e,t,n){var i,r=-1,o=e.length,a=t[0],s=t[1],l=t[2];switch(t.length){case 0:for(;++r<o;)(i=e[r]).callback.call(i.context||n);return;case 1:for(;++r<o;)(i=e[r]).callback.call(i.context||n,a);return;case 2:for(;++r<o;)(i=e[r]).callback.call(i.context||n,a,s);return;case 3:for(;++r<o;)(i=e[r]).callback.call(i.context||n,a,s,l);return;default:for(;++r<o;)(i=e[r]).callback.apply(i.context||n,t);return}},s=function(e,t,n,i){for(var r,o=-1,a=e.length;++o<a;)try{(r=e[o]).callback.apply(r.context||n,t)}catch(s){console.log('Error in "'+i+'" event handler:',s)}};return i}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){var e={DRAG:"drag",DRAG_START:"dragStart",DRAG_END:"dragEnd",CLICK:"click",DOUBLE_CLICK:"doubleClick",TAP:"tap",DOUBLE_TAP:"doubleTap",OVER:"over",MOVE:"move",OUT:"out"},t={COMPLETE:"complete",ERROR:"error",JWPLAYER_AD_CLICK:"adClick",JWPLAYER_AD_COMPANIONS:"adCompanions",JWPLAYER_AD_COMPLETE:"adComplete",JWPLAYER_AD_ERROR:"adError",JWPLAYER_AD_IMPRESSION:"adImpression",JWPLAYER_AD_META:"adMeta",JWPLAYER_AD_PAUSE:"adPause",JWPLAYER_AD_PLAY:"adPlay",JWPLAYER_AD_SKIPPED:"adSkipped",JWPLAYER_AD_TIME:"adTime",JWPLAYER_CAST_AD_CHANGED:"castAdChanged",JWPLAYER_MEDIA_COMPLETE:"complete",JWPLAYER_READY:"ready",JWPLAYER_MEDIA_SEEK:"seek",JWPLAYER_MEDIA_BEFOREPLAY:"beforePlay",JWPLAYER_MEDIA_BEFORECOMPLETE:"beforeComplete",JWPLAYER_MEDIA_BUFFER_FULL:"bufferFull",JWPLAYER_DISPLAY_CLICK:"displayClick",JWPLAYER_PLAYLIST_COMPLETE:"playlistComplete",JWPLAYER_CAST_SESSION:"cast",JWPLAYER_MEDIA_ERROR:"mediaError",JWPLAYER_MEDIA_FIRST_FRAME:"firstFrame",JWPLAYER_MEDIA_PLAY_ATTEMPT:"playAttempt",JWPLAYER_MEDIA_LOADED:"loaded",JWPLAYER_MEDIA_SEEKED:"seeked",JWPLAYER_SETUP_ERROR:"setupError",JWPLAYER_ERROR:"error",JWPLAYER_PLAYER_STATE:"state",JWPLAYER_CAST_AVAILABLE:"castAvailable",JWPLAYER_MEDIA_BUFFER:"bufferChange",JWPLAYER_MEDIA_TIME:"time",JWPLAYER_MEDIA_TYPE:"mediaType",JWPLAYER_MEDIA_VOLUME:"volume",JWPLAYER_MEDIA_MUTE:"mute",JWPLAYER_MEDIA_META:"meta",JWPLAYER_MEDIA_LEVELS:"levels",JWPLAYER_MEDIA_LEVEL_CHANGED:"levelsChanged",JWPLAYER_CONTROLS:"controls",JWPLAYER_FULLSCREEN:"fullscreen",JWPLAYER_RESIZE:"resize",JWPLAYER_PLAYLIST_ITEM:"playlistItem",JWPLAYER_PLAYLIST_LOADED:"playlist",JWPLAYER_AUDIO_TRACKS:"audioTracks",JWPLAYER_AUDIO_TRACK_CHANGED:"audioTrackChanged",JWPLAYER_LOGO_CLICK:"logoClick",JWPLAYER_CAPTIONS_LIST:"captionsList",JWPLAYER_CAPTIONS_CHANGED:"captionsChanged",JWPLAYER_PROVIDER_CHANGED:"providerChanged",JWPLAYER_PROVIDER_FIRST_FRAME:"providerFirstFrame",JWPLAYER_USER_ACTION:"userAction",JWPLAYER_PROVIDER_CLICK:"providerClick",JWPLAYER_VIEW_TAB_FOCUS:"tabFocus",JWPLAYER_CONTROLBAR_DRAGGING:"scrubbing",JWPLAYER_INSTREAM_CLICK:"instreamClick"};return t.touchEvents=e,t}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){var i,r;i=[],r=function(){return{BUFFERING:"buffering",IDLE:"idle",COMPLETE:"complete",PAUSED:"paused",PLAYING:"playing",ERROR:"error",LOADING:"loading",STALLED:"stalled"}}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){var i,r;i=[n(1)],r=function(e){function t(e){return!!/[\(,]format=m3u8-/i.test(e)&&"m3u8"}var n=function(e){return e.replace(/^\s+|\s+$/g,"")},i=function(e,t,n){for(e=""+e,n=n||"0";e.length<t;)e=n+e;return e},r=function(e,t){for(var n=0;n<e.attributes.length;n++)if(e.attributes[n].name&&e.attributes[n].name.toLowerCase()===t.toLowerCase())return e.attributes[n].value.toString();return""},o=function(e){if(!e||"rtmp"===e.substr(0,4))return"";var n=t(e);return n?n:(e=e.split("?")[0].split("#")[0],e.lastIndexOf(".")>-1?e.substr(e.lastIndexOf(".")+1,e.length).toLowerCase():void 0)},a=function(e){var t=parseInt(e/3600),n=parseInt(e/60)%60,r=e%60;return i(t,2)+":"+i(n,2)+":"+i(r.toFixed(3),6)},s=function(t,n){if(e.isNumber(t))return t;t=t.replace(",",".");var i=t.split(":"),r=i.length,o=0;if("s"===t.slice(-1))o=parseFloat(t);else if("m"===t.slice(-1))o=60*parseFloat(t);else if("h"===t.slice(-1))o=3600*parseFloat(t);else if(r>1){var a=r-1;4===r&&(n&&(o=parseFloat(i[a])/n),a-=1),o+=parseFloat(i[a]),o+=60*parseFloat(i[a-1]),r>=3&&(o+=3600*parseFloat(i[a-2]))}else o=parseFloat(t);return o},l=function(t,n){return e.map(t,function(e){return n+e})},u=function(t,n){return e.map(t,function(e){return e+n})};return{trim:n,pad:i,xmlAttribute:r,extension:o,hms:a,seconds:s,suffix:u,prefix:l}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(3),n(4),n(1),n(2)],r=function(e,t,n,i){function r(e,t){return/touch/.test(e.type)?(e.originalEvent||e).changedTouches[0]["page"+t]:e["page"+t]}function o(e){var t=e||window.event;return e instanceof MouseEvent&&("which"in t?3===t.which:"button"in t&&2===t.button)}function a(e,t,n){var i;return i=t instanceof MouseEvent||!t.touches&&!t.changedTouches?t:t.touches&&t.touches.length?t.touches[0]:t.changedTouches[0],{type:e,target:t.target,currentTarget:n,pageX:i.pageX,pageY:i.pageY}}function s(e){(e instanceof MouseEvent||e instanceof window.TouchEvent)&&(e.preventManipulation&&e.preventManipulation(),e.preventDefault&&e.preventDefault())}var l=!n.isUndefined(window.PointerEvent),u=!l&&i.isMobile(),c=!l&&!u,d=i.isFF()&&i.isOSX(),p=function(e,i){function u(e){(c||l&&"touch"!==e.pointerType)&&w(t.touchEvents.OVER,e)}function p(e){(c||l&&"touch"!==e.pointerType)&&w(t.touchEvents.MOVE,e)}function h(n){(c||l&&"touch"!==n.pointerType&&!e.contains(document.elementFromPoint(n.x,n.y)))&&w(t.touchEvents.OUT,n)}function f(t){v=t.target,E=r(t,"X"),k=r(t,"Y"),o(t)||(l?t.isPrimary&&(i.preventScrolling&&(y=t.pointerId,e.setPointerCapture(y)),e.addEventListener("pointermove",g),e.addEventListener("pointercancel",m),e.addEventListener("pointerup",m)):c&&(document.addEventListener("mousemove",g),d&&"object"===t.target.nodeName.toLowerCase()?e.addEventListener("click",m):document.addEventListener("mouseup",m)),v.addEventListener("touchmove",g),v.addEventListener("touchcancel",m),v.addEventListener("touchend",m),i.preventScrolling&&s(t))}function g(e){var n=t.touchEvents,o=6;if(b)w(n.DRAG,e);else{var a=r(e,"X"),l=r(e,"Y"),u=a-E,c=l-k;u*u+c*c>o*o&&(w(n.DRAG_START,e),b=!0,w(n.DRAG,e))}i.preventScrolling&&s(e)}function m(n){var r=t.touchEvents;l?(i.preventScrolling&&e.releasePointerCapture(y),e.removeEventListener("pointermove",g),e.removeEventListener("pointercancel",m),e.removeEventListener("pointerup",m)):c&&(document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",m)),v&&(v.removeEventListener("touchmove",g),v.removeEventListener("touchcancel",m),v.removeEventListener("touchend",m)),b?w(r.DRAG_END,n):i.directSelect&&n.target!==e||n.type.indexOf("cancel")!==-1||(l&&n instanceof window.PointerEvent?"touch"===n.pointerType?w(r.TAP,n):w(r.CLICK,n):c?w(r.CLICK,n):(w(r.TAP,n),s(n))),v=null,b=!1}function w(e,r){var o;if(i.enableDoubleTap&&(e===t.touchEvents.CLICK||e===t.touchEvents.TAP))if(n.now()-x<A){var s=e===t.touchEvents.CLICK?t.touchEvents.DOUBLE_CLICK:t.touchEvents.DOUBLE_TAP;o=a(s,r,j),_.trigger(s,o),x=0}else x=n.now();o=a(e,r,j),_.trigger(e,o)}var v,y,j=e,b=!1,E=0,k=0,x=0,A=300;i=i||{},l?(e.addEventListener("pointerdown",f),i.useHover&&(e.addEventListener("pointerover",u),e.addEventListener("pointerout",h)),i.useMove&&e.addEventListener("pointermove",p)):c&&(e.addEventListener("mousedown",f),i.useHover&&(e.addEventListener("mouseover",u),e.addEventListener("mouseout",h)),i.useMove&&e.addEventListener("mousemove",p)),e.addEventListener("touchstart",f);var _=this;return this.triggerEvent=w,this.destroy=function(){e.removeEventListener("touchstart",f),e.removeEventListener("mousedown",f),v&&(v.removeEventListener("touchmove",g),v.removeEventListener("touchcancel",m),v.removeEventListener("touchend",m)),l&&(i.preventScrolling&&e.releasePointerCapture(y),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",f),e.removeEventListener("pointermove",g),e.removeEventListener("pointermove",p),e.removeEventListener("pointercancel",m),e.removeEventListener("pointerout",h),e.removeEventListener("pointerup",m)),e.removeEventListener("click",m),e.removeEventListener("mouseover",u),e.removeEventListener("mousemove",p),e.removeEventListener("mouseout",h),document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",m)},this};return n.extend(p.prototype,e),p}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){e.exports=n(147)["default"]},,function(e,t){"use strict";function n(e){return c[e]}function i(e){for(var t=1;t<arguments.length;t++)for(var n in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],n)&&(e[n]=arguments[t][n]);return e}function r(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1}function o(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}return p.test(e)?e.replace(d,n):e}function a(e){return!e&&0!==e||!(!g(e)||0!==e.length)}function s(e){var t=i({},e);return t._parent=e,t}function l(e,t){return e.path=t,e}function u(e,t){return(e?e+".":"")+t}t.__esModule=!0,t.extend=i,t.indexOf=r,t.escapeExpression=o,t.isEmpty=a,t.createFrame=s,t.blockParams=l,t.appendContextPath=u;var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},d=/[&<>"'`=]/g,p=/[&<>"'`=]/,h=Object.prototype.toString;t.toString=h;var f=function(e){return"function"==typeof e};f(/x/)&&(t.isFunction=f=function(e){return"function"==typeof e&&"[object Function]"===h.call(e)}),t.isFunction=f;var g=Array.isArray||function(e){return!(!e||"object"!=typeof e)&&"[object Array]"===h.call(e)};t.isArray=g},,,function(e,t,n){var i,r;i=[n(26)],r=function(e){return{createId:function(e,t){var n,i=e.kind||"cc";return n=e["default"]||e.defaulttrack?"default":e._id||e.file||e.name||e.label||i+t},createLabel:function(e,t){var n=e.label||e.name||e.language;return n||(n="Unknown CC",t+=1,t>1&&(n+=" ["+t+"]")),{label:n,unknownCount:t}},renderNatively:function(t){return("html5"===t||"shaka"===t||"caterpillar"===t)&&(e.isChrome()||e.isIOS()||e.isSafari()||e.isEdge())}}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(4),n(6),n(1)],r=function(e,t,n,i){var r=e.noop,o=i.constant(!1),a={supports:o,play:r,load:r,stop:r,volume:r,mute:r,seek:r,resize:r,remove:r,destroy:r,setVisibility:r,setFullscreen:o,getFullscreen:r,getContainer:r,setContainer:o,getName:r,getQualityLevels:r,getCurrentQuality:r,setCurrentQuality:r,getAudioTracks:r,getCurrentAudioTrack:r,setCurrentAudioTrack:r,checkComplete:r,setControls:r,attachMedia:r,detachMedia:r,setState:function(e){var i=this.state||n.IDLE;this.state=e,e!==i&&this.trigger(t.JWPLAYER_PLAYER_STATE,{newstate:e})},sendMediaType:function(e){var n=e[0].type,i="oga"===n||"aac"===n||"mp3"===n||"mpeg"===n||"vorbis"===n;this.trigger(t.JWPLAYER_MEDIA_TYPE,{mediaType:i?"audio":"video"})}};return a}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){var t={},n={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"};return t.utf8ArrayToStr=function(e,t){var n,i,r,o,a,s;for(n="",r=e.length,i=t||0;i<r;)if(o=e[i++],0!==o&&3!==o)switch(o>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:n+=String.fromCharCode(o);break;case 12:case 13:a=e[i++],n+=String.fromCharCode((31&o)<<6|63&a);break;case 14:a=e[i++],s=e[i++],n+=String.fromCharCode((15&o)<<12|(63&a)<<6|(63&s)<<0)}return n},t.utf16BigEndianArrayToStr=function(e,t){var n,i,r;for(n="",r=e.length-1,i=t||0;i<r;)254===e[i]&&255===e[i+1]||(n+=String.fromCharCode((e[i]<<8)+e[i+1])),i+=2;return n},t.syncSafeInt=function(e){var n=t.arrayToInt(e);return 127&n|(32512&n)>>1|(8323072&n)>>2|(2130706432&n)>>3},t.arrayToInt=function(e){for(var t="0x",n=0;n<e.length;n++)t+=e[n].toString(16);return parseInt(t)},t.parseID3=function(i){return e.reduce(i,function(i,r){if(!("value"in r)&&"data"in r&&r.data instanceof ArrayBuffer){var o=r,a=new Uint8Array(o.data),s=a.length;r={value:{key:"",data:""}};for(var l=10;l<14&&l<a.length&&0!==a[l];)r.value.key+=String.fromCharCode(a[l]),l++;var u=19,c=a[u];3!==c&&0!==c||(c=a[++u],s--);var d=0;if(1!==c&&2!==c)for(var p=u+1;p<s;p++)if(0===a[p]){d=p-u;break}if(d>0){var h=t.utf8ArrayToStr(a.subarray(u,u+=d),0);if("PRIV"===r.value.key){if("com.apple.streaming.transportStreamTimestamp"===h){var f=1&t.syncSafeInt(a.subarray(u,u+=4)),g=t.syncSafeInt(a.subarray(u,u+=4));f&&(g+=4294967296),r.value.data=g}else r.value.data=t.utf8ArrayToStr(a,u+1);r.value.info=h}else r.value.info=h,r.value.data=t.utf8ArrayToStr(a,u+1)}else{var m=a[u];1===m||2===m?r.value.data=t.utf16BigEndianArrayToStr(a,u+1):r.value.data=t.utf8ArrayToStr(a,u+1)}}if(n.hasOwnProperty(r.value.key)&&(i[n[r.value.key]]=r.value.data),r.value.info){var w=i[r.value.key];e.isObject(w)||(w={},i[r.value.key]=w),w[r.value.info]=r.value.data}else i[r.value.key]=r.value.data;return i},{})},t}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(4),n(3),n(1)],r=function(e,t,n){var i={},r={NEW:0,LOADING:1,ERROR:2,COMPLETE:3},o=function(o,a){function s(t){c=r.ERROR,u.trigger(e.ERROR,t)}function l(t){c=r.COMPLETE,u.trigger(e.COMPLETE,t)}var u=n.extend(this,t),c=r.NEW;this.addEventListener=this.on,this.removeEventListener=this.off,this.makeStyleLink=function(e){var t=document.createElement("link");return t.type="text/css",t.rel="stylesheet",t.href=e,t},this.makeScriptTag=function(e){var t=document.createElement("script");return t.src=e,t},this.makeTag=a?this.makeStyleLink:this.makeScriptTag,this.load=function(){if(c===r.NEW){var t=i[o];if(t&&(c=t.getStatus(),c<2))return t.on(e.ERROR,s),void t.on(e.COMPLETE,l);var n=document.getElementsByTagName("head")[0]||document.documentElement,u=this.makeTag(o),d=!1;u.onload=u.onreadystatechange=function(e){d||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(d=!0,l(e),u.onload=u.onreadystatechange=null,n&&u.parentNode&&!a&&n.removeChild(u))},u.onerror=s,n.insertBefore(u,n.firstChild),c=r.LOADING,i[o]=this}},this.getStatus=function(){return c}};return o.loaderstatus=r,o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){var t="free",n="premium",i="enterprise",r="platinum",o="ads",a="unlimited",s="trial",l={setup:[t,n,i,o,a,s,r],dash:[n,i,o,a,s,r],drm:[i,o,a,s],hls:[n,o,i,a,s,r],ads:[o,a,s,r,i],casting:[n,i,o,a,s,r],jwpsrv:[t,n,i,o,s,r]},u=function(t){return function(n){return e.contains(l[n],t)}};return u}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t){"use strict";function n(e,t){var r=t&&t.loc,o=void 0,a=void 0;r&&(o=r.start.line,a=r.start.column,e+=" - "+o+":"+a);for(var s=Error.prototype.constructor.call(this,e),l=0;l<i.length;l++)this[i[l]]=s[i[l]];Error.captureStackTrace&&Error.captureStackTrace(this,n),r&&(this.lineNumber=o,this.column=a)}t.__esModule=!0;var i=["description","fileName","lineNumber","message","name","number","stack"];n.prototype=new Error,t["default"]=n,e.exports=t["default"]},function(e,t,n){var i,r;i=[n(1),n(2),n(24),n(42),n(177),n(68)],r=function(e,t,i,r,o,a){function s(e,t,n,a){var s,u,c=e.responseXML?e.responseXML.firstChild:null;if(c)for("xml"===i.localName(c)&&(c=c.nextSibling);c.nodeType===c.COMMENT_NODE;)c=c.nextSibling;try{if(c&&"tt"===i.localName(c))s=o(e.responseXML),u=this.convertToVTTCues(s),delete t.xhr,n(u);else{var d=e.responseText;d.indexOf("WEBVTT")>=0?l(d,t,n,a):(s=r(d),u=this.convertToVTTCues(s),delete t.xhr,n(u))}}catch(p){delete t.xhr,a(p)}}function l(e,t,i,r){n.e(10,function(require){var o=n(69),a=new o(window),s=[];a.oncue=function(e){s.push(e)},a.onflush=function(){delete t.xhr,i(s)};try{a.parse(e).flush()}catch(l){delete t.xhr,r(l)}})}var u={};return u.loadFile=function(e,n,i){e.xhr=t.ajax(e.file,function(t){s.call(u,t,e,n,i)},i)},u.cancelXhr=function(t){e.each(t,function(e){var t=e.xhr;t&&(t.onload=null,t.onreadystatechange=null,t.onerror=null,"abort"in t&&t.abort()),delete e.xhr})},u.convertToVTTCues=function(t){var n=e.map(t,function(e){return new a(e.begin,e.end,e.text)});return n},u}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(8)],r=function(e){return{localName:function(e){return e?e.localName?e.localName:e.baseName?e.baseName:"":""},textContent:function(t){return t?t.textContent?e.trim(t.textContent):t.text?e.trim(t.text):"":""},getChildNode:function(e,t){return e.childNodes[t]},numChildren:function(e){return e.childNodes?e.childNodes.length:0}}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(181),n(182),n(74),n(32)],r=function(e,t,n,i){var r={},o={},a=function(n,i){return o[n]=new e(new t(r),i),o[n]},s=function(e,t,o,a){var s=i.getPluginName(e);r[s]||(r[s]=new n(e)),r[s].registerPlugin(e,t,o,a)};return{loadPlugins:a,registerPlugin:s}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){function t(e){return function(){return i(e)}}var n={},i=e.memoize(function(e){var t=navigator.userAgent.toLowerCase();return null!==t.match(e)}),r=n.isInt=function(e){return parseFloat(e)%1===0};n.isFlashSupported=function(){var e=n.flashVersion();return e&&e>=11.2},n.isFF=t(/firefox/i),n.isIPod=t(/iP(hone|od)/i),n.isIPad=t(/iPad/i),n.isSafari602=t(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i),n.isOSX=t(/Mac OS X/i);var o=n.isEdge=function(e){return i(e?new RegExp("\\sedge\\/"+e,"i"):/\sEdge\/\d+/i)},a=n.isIETrident=t(/trident\/.+rv:\s*11/i),s=n.isMSIE=function(e){return e?(e=parseFloat(e).toFixed(1),i(new RegExp("msie\\s*"+e,"i"))):i(/msie/i)};n.isChrome=function(){return i(/\s(?:Chrome|CriOS)\//i)&&!n.isEdge()},n.isIE=function(e){return e?(e=parseFloat(e).toFixed(1),e>=12?o(e):e>=11?a():s(e)):o()||a()||s()},n.isSafari=function(){return i(/safari/i)&&!i(/chrome/i)&&!i(/chromium/i)&&!i(/android/i)};var l=n.isIOS=function(e){return i(e?new RegExp("iP(hone|ad|od).+\\s(OS\\s"+e+"|.*\\sVersion/"+e+")","i"):/iP(hone|ad|od)/i)};n.isAndroidNative=function(e){return u(e,!0)};var u=n.isAndroid=function(e,t){return!(t&&i(/chrome\/[123456789]/i)&&!i(/chrome\/18/))&&(e?(r(e)&&!/\./.test(e)&&(e=""+e+"."),i(new RegExp("Android\\s*"+e,"i"))):i(/Android/i))};return n.isMobile=function(){return l()||u()},n.isIframe=function(){return window.frameElement&&"IFRAME"===window.frameElement.nodeName},n.flashVersion=function(){if(n.isAndroid())return 0;var e,t=navigator.plugins;if(t&&(e=t["Shockwave Flash"],e&&e.description))return parseFloat(e.description.replace(/\D+(\d+\.?\d*).*/,"$1"));if("undefined"!=typeof window.ActiveXObject){try{if(e=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return parseFloat(e.GetVariable("$version").split(" ")[1].replace(/\s*,\s*/,"."))}catch(i){return 0}return e}return 0},n}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){return{repo:"http://ssl.p.jwpcdn.com/player/v/",SkinsIncluded:["seven"],SkinsLoadable:["beelden","bekle","five","glow","roundster","six","stormtrooper","vapor"],dvrSeekLimit:-25}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(8),n(86)],r=function(e,t){function n(e){e=e.split("-");for(var t=1;t<e.length;t++)e[t]=e[t].charAt(0).toUpperCase()+e[t].slice(1);return e.join("")}function i(t,n,i){if(""===n||void 0===n||null===n)return"";var r=i?" !important":"";return"string"==typeof n&&isNaN(n)?/png|gif|jpe?g/i.test(n)&&n.indexOf("url")<0?"url("+n+")":n+r:0===n||"z-index"===t||"opacity"===t?""+n+r:/color/i.test(t)?"#"+e.pad(n.toString(16).replace(/^0x/i,""),6)+r:Math.ceil(n)+"px"+r}var r=function(e,n,i){i=i||"all-players";var r="";if("object"==typeof n){var a=document.createElement("div");o(a,n),r="{"+a.style.cssText+"}"}else"string"==typeof n&&(r=n);t.style([[e,e+r]],i)},o=function(e,t){if(void 0!==e&&null!==e){void 0===e.length&&(e=[e]);var r,o={};for(r in t)o[r]=i(r,t[r]);for(var a=0;a<e.length;a++){var s,l=e[a];if(void 0!==l&&null!==l)for(r in o)s=n(r),l.style[s]!==o[r]&&(l.style[s]=o[r])}}},a=function(e,t){o(e,{transform:t,webkitTransform:t,msTransform:t,mozTransform:t,oTransform:t})},s=function(e,t){var n="rgb";e?(e=String(e).replace("#",""),3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2])):e="000000";var i=[parseInt(e.substr(0,2),16),parseInt(e.substr(2,2),16),parseInt(e.substr(4,2),16)];return void 0!==t&&100!==t&&(n+="a",i.push(t/100)),n+"("+i.join(",")+")"};return{css:r,style:o,clearCss:t.clear,transform:a,hexToRgba:s}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){return"7.7.4+commercial_v7-7-4.127.commercial.8c45ad.jwplayer.39d271.freewheel.32fc26.googima.17c8c6.vast.10bf30.analytics.516c4b.plugin-gapro.7e936b.plugin-related.b37675.plugin-sharing.8b8aae"}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){var i,r;i=[n(2),n(53),n(173),n(1),n(3),n(189),n(4),n(6)],r=function(e,t,n,i,r,o,a,s){var l=function(){function o(e,t){var n=i.extend({},t,{type:e});switch(e){case"flashThrottle":var r="resume"!==t.state;this.set("flashThrottle",r),this.set("flashBlocked",r);break;case"flashBlocked":return void this.set("flashBlocked",!0);case"flashUnblocked":return void this.set("flashBlocked",!1);case"volume":case"mute":return void this.set(e,t[e]);case a.JWPLAYER_MEDIA_TYPE:return void(this.mediaModel.get("mediaType")!==t.mediaType&&(this.mediaModel.set("mediaType",t.mediaType),this.mediaController.trigger(e,n)));case a.JWPLAYER_PLAYER_STATE:return void this.mediaModel.set("state",t.newstate);case a.JWPLAYER_MEDIA_BUFFER:this.set("buffer",t.bufferPercent);case a.JWPLAYER_MEDIA_META:var o=t.duration;i.isNumber(o)&&!i.isNaN(o)&&(this.mediaModel.set("duration",o),this.set("duration",o));break;case a.JWPLAYER_MEDIA_BUFFER_FULL:this.mediaModel.get("playAttempt")?this.playVideo():this.mediaModel.on("change:playAttempt",function(){this.playVideo()},this);break;case a.JWPLAYER_MEDIA_TIME:this.mediaModel.set("position",t.position),this.set("position",t.position),i.isNumber(t.duration)&&(this.mediaModel.set("duration",t.duration),this.set("duration",t.duration));break;case a.JWPLAYER_PROVIDER_CHANGED:this.set("provider",c.getName());break;case a.JWPLAYER_MEDIA_LEVELS:this.setQualityLevel(t.currentQuality,t.levels),
this.mediaModel.set("levels",t.levels);break;case a.JWPLAYER_MEDIA_LEVEL_CHANGED:this.setQualityLevel(t.currentQuality,t.levels),this.persistQualityLevel(t.currentQuality,t.levels);break;case a.JWPLAYER_AUDIO_TRACKS:this.setCurrentAudioTrack(t.currentTrack,t.tracks),this.mediaModel.set("audioTracks",t.tracks);break;case a.JWPLAYER_AUDIO_TRACK_CHANGED:this.setCurrentAudioTrack(t.currentTrack,t.tracks);break;case"subtitlesTrackChanged":this.persistVideoSubtitleTrack(t.currentTrack,t.tracks);break;case"visualQuality":var s=i.extend({},t);this.mediaModel.set("visualQuality",s)}this.mediaController.trigger(e,n)}var l,c,d=this,p=e.noop;this.mediaController=i.extend({},r),this.mediaModel=new u,n.model(this),this.set("mediaModel",this.mediaModel),this.setup=function(t){return i.extend(this.attributes,t,{item:0,state:s.IDLE,flashBlocked:!1,fullscreen:!1,scrubbing:!1,duration:0,position:0,buffer:0}),e.isMobile()&&!t.mobileSdk&&this.set("autostart",!1),this.updateProviders(),this},this.getConfiguration=function(){return i.omit(this.clone(),["mediaModel"])},this.updateProviders=function(){l=new t(this.getConfiguration())},this.setQualityLevel=function(e,t){e>-1&&t.length>1&&"youtube"!==c.getName().name&&this.mediaModel.set("currentLevel",parseInt(e))},this.persistQualityLevel=function(e,t){var n=t[e]||{},i=n.label;this.set("qualityLabel",i)},this.setCurrentAudioTrack=function(e,t){e>-1&&t.length>0&&e<t.length&&this.mediaModel.set("currentAudioTrack",parseInt(e))},this.onMediaContainer=function(){var e=this.get("mediaContainer");p.setContainer(e)},this.changeVideoProvider=function(e){if(this.off("change:mediaContainer",this.onMediaContainer),c&&(c.off(null,null,this),c.getContainer()&&c.remove(),delete c.instreamMode),!e)return c=p=e,void this.set("provider",void 0);p=new e(d.get("id"),d.getConfiguration());var t=this.get("mediaContainer");t?p.setContainer(t):this.once("change:mediaContainer",this.onMediaContainer),this.set("provider",p.getName()),p.getName().name.indexOf("flash")===-1&&(this.set("flashThrottle",void 0),this.set("flashBlocked",!1)),c=p,c.volume(d.get("volume")),c.mute(d.get("mute")),c.on("all",o,this),this.get("instreamMode")===!0&&(c.instreamMode=!0)},this.destroy=function(){this.off(),c&&(c.off(null,null,this),c.destroy())},this.getVideo=function(){return c},this.setFullscreen=function(e){e=!!e,e!==d.get("fullscreen")&&d.set("fullscreen",e)},this.chooseProvider=function(e){return l.choose(e).provider},this.setItemIndex=function(e){var t=this.get("playlist");e=parseInt(e,10)||0,e=(e+t.length)%t.length,this.set("item",e),this.set("playlistItem",t[e]),this.setActiveItem(t[e])},this.setActiveItem=function(t){this.mediaModel.off(),this.mediaModel=new u,this.set("mediaModel",this.mediaModel),this.set("position",t.starttime||0),this.set("minDvrWindow",t.minDvrWindow),this.set("duration",t.duration&&e.seconds(t.duration)||0),this.setProvider(t)},this.setProvider=function(e){var t=e&&e.sources&&e.sources[0];if(void 0!==t){var n=this.chooseProvider(t);n&&p instanceof n||d.changeVideoProvider(n),p&&(p.init&&p.init(e),this.trigger("itemReady",e))}},this.getProviders=function(){return l},this.resetProvider=function(){p=null},this.setVolume=function(e){e=Math.round(e),this.set("volume",e),c&&c.volume(e);var t=0===e;t!==this.get("mute")&&this.setMute(t)},this.setMute=function(t){if(e.exists(t)||(t=!this.get("mute")),this.set("mute",t),c&&c.mute(t),!t){var n=Math.max(10,this.get("volume"));this.setVolume(n)}},this.loadVideo=function(t){if(!t){var n=this.get("item");t=this.get("playlist")[n]}this.set("position",t.starttime||0),this.set("duration",t.duration&&e.seconds(t.duration)||0),this.mediaModel.set("playAttempt",!0),this.mediaController.trigger(a.JWPLAYER_MEDIA_PLAY_ATTEMPT,{playReason:this.get("playReason")}),c.load(t)},this.stopVideo=function(){c&&c.stop()},this.playVideo=function(){c.play()},this.persistCaptionsTrack=function(){var e=this.get("captionsTrack");e?this.set("captionLabel",e.name):this.set("captionLabel","Off")},this.setVideoSubtitleTrack=function(e,t){this.set("captionsIndex",e),e&&t&&e<=t.length&&t[e-1].data&&this.set("captionsTrack",t[e-1]),c&&c.setSubtitlesTrack&&c.setSubtitlesTrack(e)},this.persistVideoSubtitleTrack=function(e,t){this.setVideoSubtitleTrack(e,t),this.persistCaptionsTrack()},this.setNextUp=function(e){this.set("nextUp",e)}},u=l.MediaModel=function(){this.set("state",s.IDLE)};return i.extend(l.prototype,o),i.extend(u.prototype,o),l}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(8)],r=function(e){var t={},n=t.pluginPathType={ABSOLUTE:0,RELATIVE:1,CDN:2};return t.getPluginPathType=function(t){if("string"==typeof t){t=t.split("?")[0];var i=t.indexOf("://");if(i>0)return n.ABSOLUTE;var r=t.indexOf("/"),o=e.extension(t);return!(i<0&&r<0)||o&&isNaN(o)?n.RELATIVE:n.CDN}},t.getPluginName=function(e){return e.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/,"$2")},t.getPluginVersion=function(e){return e.replace(/[^-]*-?([^\.]*).*$/,"$1")},t}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){var e=window.chrome,t={};return t.NS="urn:x-cast:com.longtailvideo.jwplayer",t.debug=!1,t.availability=null,t.available=function(n){n=n||t.availability;var i="available";return e&&e.cast&&e.cast.ReceiverAvailability&&(i=e.cast.ReceiverAvailability.AVAILABLE),n===i},t.log=function(){if(t.debug){var e=Array.prototype.slice.call(arguments,0);console.log.apply(console,e)}},t.error=function(){var e=Array.prototype.slice.call(arguments,0);console.error.apply(console,e)},t}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,,,,,,function(e,t,n){var i,r;i=[n(6)],r=function(e){function t(t){return t===e.COMPLETE||t===e.ERROR?e.IDLE:t}return function(e,n,i){if(n=t(n),i=t(i),n!==i){var r=n.replace(/(?:ing|d)$/,""),o={type:r,newstate:n,oldstate:i,reason:e.mediaModel.get("state")};"play"===r&&(o.playReason=e.get("playReason")),this.trigger(r,o)}}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(8)],r=function(e,t){function n(e){var t={},n=e.split("\r\n");1===n.length&&(n=e.split("\n"));var r=1;if(n[0].indexOf(" --> ")>0&&(r=0),n.length>r+1&&n[r+1]){var o=n[r],a=o.indexOf(" --> ");a>0&&(t.begin=i(o.substr(0,a)),t.end=i(o.substr(a+5)),t.text=n.slice(r+1).join("\r\n"))}return t}var i=e.seconds;return function(e){var i=[];e=t.trim(e);var r=e.split("\r\n\r\n");1===r.length&&(r=e.split("\n\n"));for(var o=0;o<r.length;o++)if("WEBVTT"!==r[o]){var a=n(r[o]);a.text&&i.push(a)}return i}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(73),n(180)],r=function(e,t,n){var i={sources:[],tracks:[],minDvrWindow:120};return function(r){r=r||{},e.isArray(r.tracks)||delete r.tracks;var o=e.extend({},i,r);e.isObject(o.sources)&&!e.isArray(o.sources)&&(o.sources=[t(o.sources)]),e.isArray(o.sources)&&0!==o.sources.length||(r.levels?o.sources=r.levels:o.sources=[t(r)]);for(var a=0;a<o.sources.length;a++){var s=o.sources[a];if(s){var l=s["default"];l?s["default"]="true"===l.toString():s["default"]=!1,o.sources[a].label||(o.sources[a].label=a.toString()),o.sources[a]=t(o.sources[a])}}return o.sources=e.compact(o.sources),e.isArray(o.tracks)||(o.tracks=[]),e.isArray(o.captions)&&(o.tracks=o.tracks.concat(o.captions),delete o.captions),o.tracks=e.compact(e.map(o.tracks,n)),o}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(46)],r=function(e,t){function n(e){e.onload=null,e.onprogress=null,e.onreadystatechange=null,e.onerror=null,"abort"in e&&e.abort()}function i(t,i){return function(r){var o=r.currentTarget||i.xhr;if(clearTimeout(i.timeoutId),i.retryWithoutCredentials&&i.xhr.withCredentials){n(o);var a=e.extend({},i,{xhr:null,withCredentials:!1,retryWithoutCredentials:!1});return void d(a)}i.onerror(t,i.url,o)}}function r(e){return function(t){var n=t.currentTarget||e.xhr;if(4===n.readyState){if(clearTimeout(e.timeoutId),n.status>=400){var i;return i=404===n.status?"File not found":""+n.status+"("+n.statusText+")",e.onerror(i,e.url,n)}if(200===n.status)return o(e)(t)}}}function o(e){return function(n){var i=n.currentTarget||e.xhr;if(clearTimeout(e.timeoutId),e.responseType){if("json"===e.responseType)return a(i,e)}else{var r,o=i.responseXML;if(o)try{r=o.firstChild}catch(l){}if(o&&r)return s(i,o,e);if(u&&i.responseText&&!o&&(o=t.parseXML(i.responseText),o&&o.firstChild))return s(i,o,e);if(e.requireValidXML)return void e.onerror("Invalid XML",e.url,i)}e.oncomplete(i)}}function a(t,n){if(!t.response||e.isString(t.response)&&'"'!==t.responseText.substr(1))try{t=e.extend({},t,{response:JSON.parse(t.responseText)})}catch(i){return void n.onerror("Invalid JSON",n.url,t)}return n.oncomplete(t)}function s(t,n,i){var r=n.documentElement;return i.requireValidXML&&("parsererror"===r.nodeName||r.getElementsByTagName("parsererror").length)?void i.onerror("Invalid XML",i.url,t):(t.responseXML||(t=e.extend({},t,{responseXML:n})),i.oncomplete(t))}var l=function(){},u=!1,c=function(e){var t=document.createElement("a"),n=document.createElement("a");t.href=location.href;try{return n.href=e,n.href=n.href,t.protocol+"//"+t.host!=n.protocol+"//"+n.host}catch(i){}return!0},d=function(t,a,s,d){e.isObject(t)&&(d=t,t=d.url);var p,h=e.extend({xhr:null,url:t,withCredentials:!1,retryWithoutCredentials:!1,timeout:6e4,timeoutId:-1,oncomplete:a||l,onerror:s||l,mimeType:d&&!d.responseType?"text/xml":"",requireValidXML:!1,responseType:d&&d.plainText?"text":""},d);if("XDomainRequest"in window&&c(t))p=h.xhr=new window.XDomainRequest,p.onload=o(h),p.ontimeout=p.onprogress=l,u=!0;else{if(!("XMLHttpRequest"in window))return void h.onerror("",t);p=h.xhr=new window.XMLHttpRequest,p.onreadystatechange=r(h)}var f=i("Error loading file",h);p.onerror=f,"overrideMimeType"in p?h.mimeType&&p.overrideMimeType(h.mimeType):u=!0;try{t=t.replace(/#.*$/,""),p.open("GET",t,!0)}catch(g){return f(g),p}if(h.responseType)try{p.responseType=h.responseType}catch(g){}h.timeout&&(h.timeoutId=setTimeout(function(){n(p),h.onerror("Timeout",t,p)},h.timeout),p.onabort=function(){clearTimeout(h.timeoutId)});try{h.withCredentials&&"withCredentials"in p&&(p.withCredentials=!0),p.send()}catch(g){f(g)}return p};return{ajax:d,crossdomain:c}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(8),n(1),n(188)],r=function(e,t,n){var i={};i.createElement=function(e){var t=document.createElement("div");return t.innerHTML=e,t.firstChild},i.styleDimension=function(e){return e+(e.toString().indexOf("%")>0?"":"px")};var r=function(e){return t.isString(e.className)?e.className.split(" "):[]},o=function(t,n){n=e.trim(n),t.className!==n&&(t.className=n)};return i.classList=function(e){return e.classList?e.classList:r(e)},i.hasClass=n.hasClass,i.addClass=function(e,n){var i=r(e),a=t.isArray(n)?n:n.split(" ");t.each(a,function(e){t.contains(i,e)||i.push(e)}),o(e,i.join(" "))},i.removeClass=function(e,n){var i=r(e),a=t.isArray(n)?n:n.split(" ");o(e,t.difference(i,a).join(" "))},i.replaceClass=function(e,t,n){var i=e.className||"";t.test(i)?i=i.replace(t,n):n&&(i+=" "+n),o(e,i)},i.toggleClass=function(e,n,r){var o=i.hasClass(e,n);r=t.isBoolean(r)?r:!o,r!==o&&(r?i.addClass(e,n):i.removeClass(e,n))},i.emptyElement=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},i.addStyleSheet=function(e){var t=document.createElement("link");t.rel="stylesheet",t.href=e,document.getElementsByTagName("head")[0].appendChild(t)},i.empty=function(e){if(e)for(;e.childElementCount>0;)e.removeChild(e.children[0])},i.bounds=function(e){var t={left:0,right:0,width:0,height:0,top:0,bottom:0};if(!e||!document.body.contains(e))return t;var n=e.getBoundingClientRect(),i=window.pageYOffset,r=window.pageXOffset;return n.width||n.height||n.left||n.top?(t.left=n.left+r,t.right=n.right+r,t.top=n.top+i,t.bottom=n.bottom+i,t.width=n.right-n.left,t.height=n.bottom-n.top,t):t},i}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(47)],r=function(e,t){function n(e){return/^(?:(?:https?|file)\:)?\/\//.test(e)}function i(t){return e.some(t,function(e){return"parsererror"===e.nodeName})}var r={};return r.getAbsolutePath=function(e,i){if(t.exists(i)||(i=document.location.href),t.exists(e)){if(n(e))return e;var r,o=i.substring(0,i.indexOf("://")+3),a=i.substring(o.length,i.indexOf("/",o.length+1));if(0===e.indexOf("/"))r=e.split("/");else{var s=i.split("?")[0];s=s.substring(o.length+a.length+1,s.lastIndexOf("/")),r=s.split("/").concat(e.split("/"))}for(var l=[],u=0;u<r.length;u++)r[u]&&t.exists(r[u])&&"."!==r[u]&&(".."===r[u]?l.pop():l.push(r[u]));return o+a+"/"+l.join("/")}},r.getScriptPath=e.memoize(function(e){for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var i=t[n].src;if(i&&i.indexOf(e)>=0)return i.substr(0,i.indexOf(e))}return""}),r.parseXML=function(e){var t=null;try{"DOMParser"in window?(t=(new window.DOMParser).parseFromString(e,"text/xml"),(i(t.childNodes)||t.childNodes&&i(t.childNodes[0].childNodes))&&(t=null)):(t=new window.ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e))}catch(n){}return t},r.serialize=function(e){if(void 0===e)return null;if("string"==typeof e&&e.length<6){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;if(!isNaN(Number(e))&&!isNaN(parseFloat(e)))return Number(e)}return e},r.parseDimension=function(e){return"string"==typeof e?""===e?0:e.lastIndexOf("%")>-1?e:parseInt(e.replace("px",""),10):e},r.timeFormat=function(t,n){if(t<=0&&!n||e.isNaN(parseInt(t)))return"00:00";var i=t<0?"-":"";t=Math.abs(t);var r=Math.floor(t/3600),o=Math.floor((t-3600*r)/60),a=Math.floor(t%60);return i+(r?r+":":"")+(o<10?"0":"")+o+":"+(a<10?"0":"")+a},r.streamType=function(t,n){var i=e.isUndefined(n)?120:n,r="VOD";return t===1/0?r="LIVE":t<0&&(r=Math.abs(t)>=Math.max(i,0)?"DVR":"LIVE"),r},r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){var t={};return t.exists=function(e){switch(typeof e){case"string":return e.length>0;case"object":return null!==e;case"undefined":return!1}return!0},t.isHTTPS=function(){return 0===window.location.href.indexOf("https")},t.isRtmp=function(e,t){return 0===e.indexOf("rtmp")||"rtmp"===t},t.isYouTube=function(e,t){return"youtube"===t||/^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(e)},t.youTubeID=function(e){var t=/v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(e);return t?t.slice(1).join("").replace("?",""):""},t.typeOf=function(t){if(null===t)return"null";var n=typeof t;return"object"===n&&e.isArray(t)?"array":n},t}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(80),n(9),n(145),n(2)],r=function(e,t,n,i){var r=e.extend({constructor:function(e,t){this.className=e+" jw-background-color jw-reset",this.orientation=t,this.dragStartListener=this.dragStart.bind(this),this.dragMoveListener=this.dragMove.bind(this),this.dragEndListener=this.dragEnd.bind(this),this.tapListener=this.tap.bind(this),this.setup()},setup:function(){var e={"default":this["default"],className:this.className,orientation:"jw-slider-"+this.orientation};this.el=i.createElement(n(e)),this.elementRail=this.el.getElementsByClassName("jw-slider-container")[0],this.elementBuffer=this.el.getElementsByClassName("jw-buffer")[0],this.elementProgress=this.el.getElementsByClassName("jw-progress")[0],this.elementThumb=this.el.getElementsByClassName("jw-knob")[0],this.userInteract=new t(this.element(),{preventScrolling:!0}),this.userInteract.on("dragStart",this.dragStartListener),this.userInteract.on("drag",this.dragMoveListener),this.userInteract.on("dragEnd",this.dragEndListener),this.userInteract.on("tap click",this.tapListener)},dragStart:function(){this.trigger("dragStart"),this.railBounds=i.bounds(this.elementRail)},dragEnd:function(e){this.dragMove(e),this.trigger("dragEnd")},dragMove:function(e){var t,n,r=this.railBounds=this.railBounds?this.railBounds:i.bounds(this.elementRail);"horizontal"===this.orientation?(t=e.pageX,n=t<r.left?0:t>r.right?100:100*i.between((t-r.left)/r.width,0,1)):(t=e.pageY,n=t>=r.bottom?0:t<=r.top?100:100*i.between((r.height-(t-r.top))/r.height,0,1));var o=this.limit(n);return this.render(o),this.update(o),!1},tap:function(e){this.railBounds=i.bounds(this.elementRail),this.dragMove(e)},limit:function(e){return e},update:function(e){this.trigger("update",{percentage:e})},render:function(e){e=Math.max(0,Math.min(e,100)),"horizontal"===this.orientation?(this.elementThumb.style.left=e+"%",this.elementProgress.style.width=e+"%"):(this.elementThumb.style.bottom=e+"%",this.elementProgress.style.height=e+"%")},updateBuffer:function(e){this.elementBuffer.style.width=e+"%"},element:function(){return this.el}});return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(80),n(2)],r=function(e,t){var n=e.extend({constructor:function(e,t,n){this.el=document.createElement("div"),this.el.className="jw-icon jw-icon-tooltip "+e+" jw-button-color jw-reset jw-hidden",t&&(this.el.setAttribute("tabindex","0"),this.el.setAttribute("role","button"),this.el.setAttribute("aria-label",t)),n===!0?this.el.setAttribute("aria-hidden","false"):this.el.setAttribute("aria-hidden","true"),this.container=document.createElement("div"),this.container.className="jw-overlay jw-reset",this.openClass="jw-open",this.componentType="tooltip",this.el.appendChild(this.container)},addContent:function(e){this.content&&this.removeContent(),this.content=e,this.container.appendChild(e)},removeContent:function(){this.content&&(this.container.removeChild(this.content),this.content=null)},hasContent:function(){return!!this.content},element:function(){return this.el},openTooltip:function(e){this.trigger("open-"+this.componentType,e,{isOpen:!0}),this.isOpen=!0,t.toggleClass(this.el,this.openClass,this.isOpen)},closeTooltip:function(e){this.trigger("close-"+this.componentType,e,{isOpen:!1}),this.isOpen=!1,t.toggleClass(this.el,this.openClass,this.isOpen)},toggleOpenState:function(e){this.isOpen?this.closeTooltip(e):this.openTooltip(e)}});return n}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){var i,r;i=[n(1),n(20)],r=function(e,t){var n,i=[{configName:"clearkey",keyName:"org.w3.clearkey"},{configName:"widevine",keyName:"com.widevine.alpha"},{configName:"playready",keyName:"com.microsoft.playready"}],r=[],o={},a=function(t){var n=t.get("playlist");return!!t.get("drm")||e.some(n,function(t){return!!t.drm||e.some(t.sources,function(e){return!!e.drm})})},s=function(e){return new Promise(function(t,n){var i;try{i=new window.MSMediaKeys(e)}catch(r){}i?t():n()})},l=function(t){var a=s;return navigator.requestMediaKeySystemAccess&&(a=navigator.requestMediaKeySystemAccess.bind(navigator)),n?n.then(t):(e.forEach(i,function(e){var t=a(e.keyName,[{}]).then(function(){o[e.configName]=!0},function(){o[e.configName]=!1});r.push(t)}),n=Promise.all(r).then(t))},u=function(){return!!navigator.requestMediaKeySystemAccess&&!!MediaKeySystemAccess.prototype.getConfiguration||!!window.MSMediaKeys},c=function(e){return o[e]},d=function(t){n||console.error('DRM only supported with "drm" block in initial setup.',t);var i=e.keys(t);return e.some(i,function(e){return c(e)})};return{containsDrm:a,probe:function(e,n){u()&&t(n)("drm")?l(e):e()},anySupported:d,isSupported:c}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(26),n(20),n(1),n(185),n(51)],r=function(e,t,n,i,r){function o(){return!!window.MediaSource&&!!window.MediaSource.isTypeSupported&&window.MediaSource.isTypeSupported('video/mp4;codecs="avc1.4d400d,mp4a.40.2"')}function a(i,o){if(e.isSafari())return!1;var a=t(o);if(!a("dash"))return!1;if(i.drm&&!r.anySupported(i.drm))return!1;var s=window.MediaSource;if(!window.HTMLVideoElement||!s)return!1;var l=!0;return i.mediaTypes&&(l=n.all(i.mediaTypes,function(e){return s.isTypeSupported(e)})),l&&("dash"===i.type||"mpd"===i.type||(i.file||"").indexOf("mpd-time-csf")>-1)}var s=n.find(i,n.matches({name:"flash"})),l=s.supports;s.supports=function(n,i){if(!e.isFlashSupported()||n.drm)return!1;var r=n&&n.type;if("hls"===r||"m3u8"===r){var o=t(i);return o("hls")}return l.apply(this,arguments)};var u=n.find(i,n.matches({name:"html5"})),c=u.supports;return u.supports=function(e,n){var i=c.apply(this,arguments);if(i&&e.drm&&"hls"===e.type){var r=t(n),o=r("drm");if(o&&e.drm.fairplay){var a=window.WebKitMediaKeys;return a&&a.isTypeSupported&&a.isTypeSupported("com.apple.fps.1_0","video/mp4")}return o}return i},i.push({name:"shaka",supports:a}),i.push({name:"caterpillar",supports:function(n,i){if((e.isChrome()||e.isFF())&&o()&&!e.isMobile()&&!n.drm){var r=n&&n.type,a=n&&n.file;if(a.indexOf(".m3u8")>-1||"hls"===r||"m3u8"===r){var s=t(i);return s("hls")}}}}),i}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(186),n(1),n(52)],r=function(e,t){var i,r=e.registerProvider,o=e.prototype.reorderProviders;return t.extend(e.loaders,{caterpillar:function(e){n.e(1,function(require){var t=n(90);t.setEdition&&t.setEdition(i),r(t),e(t)})},shaka:function(e){n.e(2,function(require){var t=n(92);r(t),e(t)})}}),t.extend(e.prototype,{reorderProviders:function(e){var n=o.call(this,e);if("flash"!==e&&this.config.hlshtml===!0){var i=t.indexOf(n,t.findWhere(n,{name:"caterpillar"})),r=n.splice(i,1)[0],a=t.indexOf(n,t.findWhere(n,{name:"flash"}));n.splice(a,0,r)}return n},providerSupports:function(e,t){return i=this.config.edition,e.supports(t,i)}}),e}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,,,,,,,,,,,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n){this.helpers=e||{},this.partials=t||{},this.decorators=n||{},l.registerDefaultHelpers(this),u.registerDefaultDecorators(this)}t.__esModule=!0,t.HandlebarsEnvironment=r;var o=n(13),a=n(22),s=i(a),l=n(150),u=n(148),c=n(158),d=i(c),p="4.0.5";t.VERSION=p;var h=7;t.COMPILER_REVISION=h;var f={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};t.REVISION_CHANGES=f;var g="[object Object]";r.prototype={constructor:r,logger:d["default"],log:d["default"].log,registerHelper:function(e,t){if(o.toString.call(e)===g){if(t)throw new s["default"]("Arg not supported with multiple helpers");o.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(o.toString.call(e)===g)o.extend(this.partials,e);else{if("undefined"==typeof t)throw new s["default"]('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if(o.toString.call(e)===g){if(t)throw new s["default"]("Arg not supported with multiple decorators");o.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]}};var m=d["default"].log;t.log=m,t.createFrame=o.createFrame,t.logger=d["default"]},function(e,t,n){var i,r;i=[n(2),n(1)],r=function(e,t){function i(n){t.each(n,function(t,i){n[i]=e.serialize(t)})}function r(e){return e.slice&&"px"===e.slice(-2)&&(e=e.slice(0,-2)),e}function o(t,n){if(n.toString().indexOf("%")===-1)return 0;if("string"!=typeof t||!e.exists(t))return 0;if(/^\d*\.?\d+%$/.test(t))return t;var i=t.indexOf(":");if(i===-1)return 0;var r=parseFloat(t.substr(0,i)),o=parseFloat(t.substr(i+1));return r<=0||o<=0?0:o/r*100+"%"}var a={autostart:!1,controls:!0,displaytitle:!0,displaydescription:!0,mobilecontrols:!1,repeat:!1,castAvailable:!1,skin:"seven",stretching:"uniform",mute:!1,volume:90,width:480,height:270,localization:{play:"Play",playback:"Start playback",pause:"Pause",volume:"Volume",prev:"Previous",next:"Next",cast:"Chromecast",fullscreen:"Fullscreen",playlist:"Playlist",hd:"Quality",cc:"Closed captions",audioTracks:"Audio tracks",replay:"Replay",buffer:"Loading",more:"More",liveBroadcast:"Live broadcast",loadingAd:"Loading ad",rewind:"Rewind 10s",nextUp:"Next Up",related:"Related"}},s=function(s,l){var u=l&&l.getAllItems(),c=t.extend({},(window.jwplayer||{}).defaults,u,s);i(c),c.localization=t.extend({},a.localization,c.localization);var d=t.extend({},a,c);if("."===d.base&&(d.base=e.getScriptPath("jwplayer.js")),d.base=(d.base||e.loadFrom()).replace(/\/?$/,"/"),n.p=d.base,d.width=r(d.width),d.height=r(d.height),d.flashplayer=d.flashplayer||(e.getScriptPath("jwplayer.js")||d.base)+"jwplayer.flash.swf","http:"===window.location.protocol&&(d.flashplayer=d.flashplayer.replace("https","http")),d.aspectratio=o(d.aspectratio,d.width),t.isObject(d.skin)&&(d.skinUrl=d.skin.url,d.skinColorInactive=d.skin.inactive,d.skinColorActive=d.skin.active,d.skinColorBackground=d.skin.background,d.skin=t.isString(d.skin.name)?d.skin.name:a.skin),t.isString(d.skin)&&d.skin.indexOf(".xml")>0&&(console.log("JW Player does not support XML skins, please update your config"),d.skin=d.skin.replace(".xml","")),d.aspectratio||delete d.aspectratio,!d.playlist){var p=t.pick(d,["title","description","type","mediaid","image","file","sources","tracks","preload"]);d.playlist=[p]}return d};return s}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i;i=function(){function e(e){if("string"!=typeof e)return!1;var t=o[e.toLowerCase()];return!!t&&e.toLowerCase()}function t(e){if("string"!=typeof e)return!1;var t=a[e.toLowerCase()];return!!t&&e.toLowerCase()}function n(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)e[i]=n[i]}return e}function i(i,o,a){var s=this,l=/MSIE\s8\.0/.test(navigator.userAgent),u={};l?s=document.createElement("custom"):u.enumerable=!0,s.hasBeenReset=!1;var c="",d=!1,p=i,h=o,f=a,g=null,m="",w=!0,v="auto",y="start",j=50,b="middle",E=50,k="middle";if(Object.defineProperty(s,"id",n({},u,{get:function(){return c},set:function(e){c=""+e}})),Object.defineProperty(s,"pauseOnExit",n({},u,{get:function(){return d},set:function(e){d=!!e}})),Object.defineProperty(s,"startTime",n({},u,{get:function(){return p},set:function(e){if("number"!=typeof e)throw new TypeError("Start time must be set to a number.");p=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"endTime",n({},u,{get:function(){return h},set:function(e){if("number"!=typeof e)throw new TypeError("End time must be set to a number.");h=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"text",n({},u,{get:function(){return f},set:function(e){f=""+e,this.hasBeenReset=!0}})),Object.defineProperty(s,"region",n({},u,{get:function(){return g},set:function(e){g=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"vertical",n({},u,{get:function(){return m},set:function(t){var n=e(t);if(n===!1)throw new SyntaxError("An invalid or illegal string was specified.");m=n,this.hasBeenReset=!0}})),Object.defineProperty(s,"snapToLines",n({},u,{get:function(){return w},set:function(e){w=!!e,this.hasBeenReset=!0}})),Object.defineProperty(s,"line",n({},u,{get:function(){return v},set:function(e){if("number"!=typeof e&&e!==r)throw new SyntaxError("An invalid number or illegal string was specified.");v=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"lineAlign",n({},u,{get:function(){return y},set:function(e){var n=t(e);if(!n)throw new SyntaxError("An invalid or illegal string was specified.");y=n,this.hasBeenReset=!0}})),Object.defineProperty(s,"position",n({},u,{get:function(){return j},set:function(e){if(e<0||e>100)throw new Error("Position must be between 0 and 100.");j=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"positionAlign",n({},u,{get:function(){return b},set:function(e){var n=t(e);if(!n)throw new SyntaxError("An invalid or illegal string was specified.");b=n,this.hasBeenReset=!0}})),Object.defineProperty(s,"size",n({},u,{get:function(){return E},set:function(e){if(e<0||e>100)throw new Error("Size must be between 0 and 100.");E=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"align",n({},u,{get:function(){return k},set:function(e){var n=t(e);if(!n)throw new SyntaxError("An invalid or illegal string was specified.");k=n,this.hasBeenReset=!0}})),s.displayState=void 0,l)return s}if(window.VTTCue)return window.VTTCue;var r="auto",o={"":!0,lr:!0,rl:!0},a={start:!0,middle:!0,end:!0,left:!0,right:!0};return i.prototype.getCueAsHTML=function(){var e=window.WebVTT;return e.convertCueToDOMTree(window,this.text)},i}.call(t,n,t,e),!(void 0!==i&&(e.exports=i))},,function(e,t,n){var i,r;i=[n(8),n(24),n(178),n(179),n(43)],r=function(e,t,n,i,r){function o(t){for(var o={},s=0;s<t.childNodes.length;s++){var l=t.childNodes[s],c=u(l);if(c)switch(c.toLowerCase()){case"enclosure":o.file=e.xmlAttribute(l,"url");break;case"title":o.title=a(l);break;case"guid":o.mediaid=a(l);break;case"pubdate":o.date=a(l);break;case"description":o.description=a(l);break;case"link":o.link=a(l);break;case"category":o.tags?o.tags+=a(l):o.tags=a(l)}}return o=i(t,o),o=n(t,o),new r(o)}var a=t.textContent,s=t.getChildNode,l=t.numChildren,u=t.localName,c={};return c.parse=function(e){for(var t=[],n=0;n<l(e);n++){var i=s(e,n),r=u(i).toLowerCase();if("channel"===r)for(var a=0;a<l(i);a++){var c=s(i,a);"item"===u(c).toLowerCase()&&t.push(o(c))}}return t},c}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(24),n(70),n(2),n(4),n(3),n(1)],r=function(e,t,n,i,r,o){var a=function(){function a(r){var a=n.tryCatch(function(){var n,a=r.responseXML?r.responseXML.childNodes:null,s="";if(a){for(var c=0;c<a.length&&(s=a[c],8===s.nodeType);c++);"xml"===e.localName(s)&&(s=s.nextSibling),"rss"===e.localName(s)&&(n={playlist:t.parse(s)})}if(!n)try{var d=JSON.parse(r.responseText);if(o.isArray(d))n={playlist:d};else{if(!o.isArray(d.playlist))throw null;n=d}}catch(p){return void l("Not a valid RSS/JSON feed")}u.trigger(i.JWPLAYER_PLAYLIST_LOADED,n)});a instanceof n.Error&&l()}function s(e){l("Playlist load error: "+e)}function l(e){u.trigger(i.JWPLAYER_ERROR,{message:e?e:"Error loading file"})}var u=o.extend(this,r);this.load=function(e){n.ajax(e,a,s)},this.destroy=function(){this.off()}};return a}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(43),n(73),n(1),n(53)],r=function(e,t,n,i){function r(e,t){for(var n=0;n<e.length;n++){var i=e[n],r=t.choose(i);if(r)return{type:i.type,provider:r.providerToCheck}}return null}function o(e,t){return n.isUndefined(e)?t:e}var a=function(t){return t=n.isArray(t)?t:[t],n.compact(n.map(t,e))};a.filterPlaylist=function(e,t,i,r,a,u,c){var d=[];return n.each(e,function(e){e=n.extend({},e),e.allSources=s(e.sources,i,e.drm||r,e.preload||a,o(e.withCredentials,c)),e.sources=l(e.allSources,t),e.sources.length&&(e.file=e.sources[0].file,(e.preload||a)&&(e.preload=e.preload||a),(e.feedid||u)&&(e.feedid=e.feedid||u),d.push(e))}),d};var s=function(e,i,r,a,s){return n.compact(n.map(e,function(e){if(n.isObject(e)){void 0!==i&&null!==i&&(e.androidhls=i),(e.drm||r)&&(e.drm=e.drm||r),(e.preload||a)&&(e.preload=e.preload||a);var l=o(e.withCredentials,s);return n.isUndefined(l)||(e.withCredentials=l),t(e)}}))},l=function(e,t){t&&t.choose||(t=new i({primary:t?"flash":null}));var o=r(e,t);if(!o)return[];var a=o.provider,s=o.type;return n.filter(e,function(e){return e.type===s&&t.providerSupports(a,e)})};return a}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(8),n(1)],r=function(e,t,n){var i={"default":!1},r=function(r){if(r&&r.file){var o=n.extend({},i,r);o.file=t.trim(""+o.file);var a=/^[^\/]+\/(?:x-)?([^\/]+)$/;if(a.test(o.type)&&(o.mimeType=o.type,o.type=o.type.replace(a,"$1")),e.isYouTube(o.file)?o.type="youtube":e.isRtmp(o.file)?o.type="rtmp":o.type||(o.type=t.extension(o.file)),o.type){switch(o.type){case"m3u8":case"vnd.apple.mpegurl":o.type="hls";break;case"dash+xml":o.type="dash";break;case"smil":o.type="rtmp";break;case"m4a":o.type="aac"}return n.each(o,function(e,t){""===e&&delete o[t]}),o}}};return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(32),n(4),n(3),n(19),n(1)],r=function(e,t,n,i,r,o){var a={FLASH:0,JAVASCRIPT:1,HYBRID:2},s=function(s){function l(){switch(t.getPluginPathType(s)){case t.pluginPathType.ABSOLUTE:return s;case t.pluginPathType.RELATIVE:return e.getAbsolutePath(s,window.location.href)}}function u(){o.defer(function(){m=r.loaderstatus.COMPLETE,g.trigger(n.COMPLETE)})}function c(){
m=r.loaderstatus.ERROR,g.trigger(n.ERROR,{url:s})}var d,p,h,f,g=o.extend(this,i),m=r.loaderstatus.NEW;this.load=function(){if(m===r.loaderstatus.NEW){if(s.lastIndexOf(".swf")>0)return d=s,m=r.loaderstatus.COMPLETE,void g.trigger(n.COMPLETE);if(t.getPluginPathType(s)===t.pluginPathType.CDN)return m=r.loaderstatus.COMPLETE,void g.trigger(n.COMPLETE);m=r.loaderstatus.LOADING;var e=new r(l());e.on(n.COMPLETE,u),e.on(n.ERROR,c),e.load()}},this.registerPlugin=function(e,t,i,o){f&&(clearTimeout(f),f=void 0),h=t,i&&o?(d=o,p=i):"string"==typeof i?d=i:"function"==typeof i?p=i:i||o||(d=e),m=r.loaderstatus.COMPLETE,g.trigger(n.COMPLETE)},this.getStatus=function(){return m},this.getPluginName=function(){return t.getPluginName(s)},this.getFlashPath=function(){if(d)switch(t.getPluginPathType(d)){case t.pluginPathType.ABSOLUTE:return d;case t.pluginPathType.RELATIVE:return s.lastIndexOf(".swf")>0?e.getAbsolutePath(d,window.location.href):e.getAbsolutePath(d,l())}return null},this.getJS=function(){return p},this.getTarget=function(){return h},this.getPluginmode=function(){return void 0!==typeof d&&void 0!==typeof p?a.HYBRID:void 0!==typeof d?a.FLASH:void 0!==typeof p?a.JAVASCRIPT:void 0},this.getNewInstance=function(e,t,n){return new p(e,t,n)},this.getURL=function(){return s}};return s}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,,,,function(e,t,n){var i,r;i=[n(3),n(1)],r=function(e,t){function n(){}var i=function(e,n){var i,r=this;i=e&&t.has(e,"constructor")?e.constructor:function(){return r.apply(this,arguments)},t.extend(i,r,n);var o=function(){this.constructor=i};return o.prototype=r.prototype,i.prototype=new o,e&&t.extend(i.prototype,e),i.__super__=r.prototype,i};return n.extend=i,t.extend(n.prototype,e),n}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(27),n(1),n(47),n(46),n(29)],r=function(e,t,n,i,r){var o={};return o.repo=t.memoize(function(){var t=r.split("+")[0],i=e.repo+t+"/";return n.isHTTPS()?i.replace(/^http:/,"https:"):i}),o.versionCheck=function(e){var t=("0"+e).split(/\W/),n=r.split(/\W/),i=parseFloat(t[0]),o=parseFloat(n[0]);return!(i>o)&&!(i===o&&parseFloat("0"+t[1])>parseFloat(n[1]))},o.loadFrom=function(){return o.repo()},o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){var t=function(){var t={},n={},i={},r={};return{start:function(n){t[n]=e.now(),i[n]=i[n]+1||1},end:function(i){if(t[i]){var r=e.now()-t[i];n[i]=n[i]+r||r}},dump:function(){return{counts:i,sums:n,events:r}},tick:function(t,n){r[t]=n||e.now()},between:function(e,t){return r[t]&&r[e]?r[t]-r[e]:-1}}};return t}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){return document.createElement("video")}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,function(e,t,n){var i;i=function(require,e,t){function n(e,t){r(t,o(e))}function i(e){var t=c[e];if(t){for(var n=Object.keys(t),i=0;i<n.length;i+=1)for(var r=t[n[i]],o=0;o<r.parts.length;o+=1)r.parts[o]();delete c[e]}}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n],r=(c[e]||{})[i.id];if(r){for(var o=0;o<r.parts.length;o++)r.parts[o](i.parts[o]);for(;o<i.parts.length;o++)r.parts.push(l(e,i.parts[o]))}else{for(var a=[],o=0;o<i.parts.length;o++)a.push(l(e,i.parts[o]));c[e]=c[e]||{},c[e][i.id]={id:i.id,parts:a}}}}function o(e){for(var t=[],n={},i=0;i<e.length;i++){var r=e[i],o=r[0],a=r[1],s=r[2],l={css:a,media:s};n[o]?n[o].parts.push(l):t.push(n[o]={id:o,parts:[l]})}return t}function a(e){h().appendChild(e)}function s(e){var t=document.createElement("style");return t.type="text/css",t.setAttribute("data-jwplayer-id",e),a(t),t}function l(e,t){var n,i,r,o=d[e];o||(o=d[e]={element:s(e),counter:0});var a=o.counter++;return n=o.element,i=u.bind(null,n,a,!1),r=u.bind(null,n,a,!0),i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media)return;i(t=e)}else r()}}function u(e,t,n,i){var r=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=f(t,r);else{var o=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}var c={},d={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=p(function(){return document.head||document.getElementsByTagName("head")[0]});t.exports={style:n,clear:i};var f=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()}.call(t,n,t,e),!(void 0!==i&&(e.exports=i))},,function(e,t,n){var i,r;i=[n(166),n(25),n(1)],r=function(e,t,n){var i=e.selectPlayer,r=function(){var e=i.apply(this,arguments);return e?e:{registerPlugin:function(e,n,i){"jwpsrv"!==e&&t.registerPlugin(e,n,i)}}};return n.extend(e,{selectPlayer:r})}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,,,function(e,t,n){var i,r;i=[n(2),n(94),n(20)],r=function(e,t,n){var i="invalid",r="RnXcsftYjWRDA^Uy",o=function(o){function a(o){e.exists(o)||(o="");try{o=t.decrypt(o,r);var a=o.split("/");s=a[0],"pro"===s&&(s="premium");var c=n(s);if(a.length>2&&c("setup")){l=a[1];var d=parseInt(a[2]);d>0&&(u=new Date,u.setTime(d))}else s=i}catch(p){s=i}}var s,l,u;this.edition=function(){return u&&u.getTime()<(new Date).getTime()?i:s},this.token=function(){return l},this.expiration=function(){return u},a(o)};return o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){var e=function(e){return window.atob(e)},t=function(e){return unescape(encodeURIComponent(e))},n=function(e){try{return decodeURIComponent(escape(e))}catch(t){return e}},i=function(e){for(var t=new Array(Math.ceil(e.length/4)),n=0;n<t.length;n++)t[n]=e.charCodeAt(4*n)+(e.charCodeAt(4*n+1)<<8)+(e.charCodeAt(4*n+2)<<16)+(e.charCodeAt(4*n+3)<<24);return t},r=function(e){for(var t=new Array(e.length),n=0;n<e.length;n++)t[n]=String.fromCharCode(255&e[n],e[n]>>>8&255,e[n]>>>16&255,e[n]>>>24&255);return t.join("")};return{decrypt:function(o,a){if(o=String(o),a=String(a),0==o.length)return"";for(var s,l,u=i(e(o)),c=i(t(a).slice(0,16)),d=u.length,p=u[d-1],h=u[0],f=2654435769,g=Math.floor(6+52/d),m=g*f;0!=m;){l=m>>>2&3;for(var w=d-1;w>=0;w--)p=u[w>0?w-1:d-1],s=(p>>>5^h<<2)+(h>>>3^p<<4)^(m^h)+(c[3&w^l]^p),h=u[w]-=s;m-=f}var v=r(u);return v=v.replace(/\0+$/,""),n(v)}}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(208),n(4),n(221)],r=function(e,t,n){var i=function(i,r){var o=new e(i,r),a=o.setup;return o.setup=function(){a.call(this),r.on("change:skipButton",this.onSkipButton,this),r.on("change:castActive change:playlistItem",this.showDisplayIconImage,this)},o.showDisplayIconImage=function(e){var t=e.get("castActive"),n=e.get("playlistItem"),i=o.controlsContainer().getElementsByClassName("jw-display-icon-container")[0];t&&n&&n.image?(i.style.backgroundImage='url("'+n.image+'")',i.style.backgroundSize="contain"):(i.style.backgroundImage="",i.style.backgroundSize="")},o.onSkipButton=function(e,t){t?this.addSkipButton():this._skipButton&&(this._skipButton.destroy(),this._skipButton=null)},o.addSkipButton=function(){this._skipButton=new n(this.instreamModel),this._skipButton.on(t.JWPLAYER_AD_SKIPPED,function(){this.api.skipAd()},this),this.controlsContainer().appendChild(this._skipButton.element())},o};return i}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){t=e.exports=n(133)(),t.push([e.id,".jw-reset{color:inherit;background-color:transparent;padding:0;margin:0;float:none;font-family:Arial,Helvetica,sans-serif;font-size:1em;line-height:1em;list-style:none;text-align:left;text-transform:none;vertical-align:baseline;border:0;direction:ltr;font-variant:inherit;font-stretch:inherit;-webkit-tap-highlight-color:rgba(255,255,255,0)}@font-face{font-family:jw-icons;src:url("+n(135)+") format('woff'),url("+n(134)+') format(\'truetype\');font-weight:400;font-style:normal}.jw-controlbar .jw-menu .jw-option:before,.jw-icon-display,.jw-icon-inline,.jw-icon-tooltip{font-family:jw-icons;-webkit-font-smoothing:antialiased;font-style:normal;font-weight:400;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-icon-audio-tracks:before{content:"\\E600"}.jw-icon-buffer:before{content:"\\E601"}.jw-icon-cast:before{content:"\\E603"}.jw-icon-cast.jw-off:before{content:"\\E602"}.jw-icon-cc:before{content:"\\E605"}.jw-icon-cue:before,.jw-icon-menu-bullet:before{content:"\\E606"}.jw-icon-error:before{content:"\\E607"}.jw-icon-fullscreen:before{content:"\\E608"}.jw-icon-fullscreen.jw-off:before{content:"\\E613"}.jw-icon-hd:before{content:"\\E60A"}.jw-rightclick-logo:before{content:"\\E60B"}.jw-icon-next:before{content:"\\E60C"}.jw-icon-pause:before{content:"\\E60D"}.jw-icon-play:before{content:"\\E60E"}.jw-icon-replay:before{content:"\\E610"}.jw-icon-volume:before{content:"\\E612"}.jw-icon-volume.jw-off:before{content:"\\E611"}.jw-icon-more:before{content:"\\E614"}.jw-icon-close:before{content:"\\E615"}.jw-icon-rewind:before{content:"\\E900"}.jwplayer{width:100%;font-size:16px;position:relative;display:block;min-height:0;overflow:hidden;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;background-color:#000;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jwplayer *{box-sizing:inherit}.jwplayer.jw-flag-aspect-mode{height:auto!important}.jwplayer.jw-flag-aspect-mode .jw-aspect{display:block}.jwplayer .jw-aspect{display:none}.jwplayer.jw-no-focus:focus,.jwplayer .jw-swf{outline:none}.jwplayer.jw-ie:focus{outline:1px dotted #585858}.jwplayer:hover .jw-display-icon-container{background-color:#212121}.jw-controls,.jw-media,.jw-overlays,.jw-preview{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jw-media{overflow:hidden;cursor:pointer}.jw-overlays{cursor:auto}.jw-media.jw-media-show{visibility:visible;opacity:1}.jw-controls.jw-controls-disabled{display:none}.jw-controls .jw-controls-right{position:absolute;top:0;right:0;left:0;bottom:2.5em}.jw-text{height:1em;font-family:Arial,Helvetica,sans-serif;font-size:.75em;font-style:normal;font-weight:400;color:#fff;text-align:center;font-variant:normal;font-stretch:normal}.jw-plugin{position:absolute;bottom:2.5em}.jw-plugin .jw-banner{max-width:100%;opacity:0;cursor:pointer;position:absolute;margin:auto auto 0;left:0;right:0;bottom:0;display:block}.jw-cast-screen{width:100%;height:100%}.jw-instream{position:absolute;top:0;right:0;bottom:0;left:0;display:none}.jw-icon-playback:before{content:"\\E60E"}.jw-captions,.jw-controls,.jw-overlays,.jw-preview,.jw-title{pointer-events:none}.jw-controlbar,.jw-display-icon-container,.jw-dock .jw-dock-button,.jw-logo,.jw-media,.jw-nextup-container,.jw-overlays .jw-plugin,.jw-skip{pointer-events:all}.jwplayer video{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;margin:auto;background:transparent}.jwplayer video::-webkit-media-controls-start-playback-button{display:none}.jwplayer.jw-stretch-uniform video{-o-object-fit:contain;object-fit:contain}.jwplayer.jw-stretch-none video{-o-object-fit:none;object-fit:none}.jwplayer.jw-stretch-fill video{-o-object-fit:cover;object-fit:cover}.jwplayer.jw-stretch-exactfit video{-o-object-fit:fill;object-fit:fill}.jw-click,.jw-preview{position:absolute;width:100%;height:100%}.jw-preview{display:none;opacity:1;visibility:visible;background:#000 no-repeat 50% 50%}.jw-error .jw-preview,.jw-stretch-uniform .jw-preview,.jwplayer .jw-preview{background-size:contain}.jw-stretch-none .jw-preview{background-size:auto auto}.jw-stretch-fill .jw-preview{background-size:cover}.jw-stretch-exactfit .jw-preview{background-size:100% 100%}.jw-display-icon-container{position:relative;top:50%;display:table;height:3.75em;width:3.75em;margin:-1.875em auto 0;cursor:pointer}.jw-display-icon-container .jw-icon-display{position:relative;display:table-cell;text-align:center;vertical-align:middle!important;background-position:50% 50%;background-repeat:no-repeat;font-size:2.5em}.jw-breakpoint-0 .jw-display-icon-container{height:44px;width:44px;margin:-22px auto 0}.jw-breakpoint-0 .jw-display-icon-container .jw-icon{font-size:22px}.jw-breakpoint-1 .jw-display-icon-container{height:55px;width:55px;margin:-27.5px auto 0}.jw-breakpoint-1 .jw-display-icon-container .jw-icon{font-size:35.2px}.jw-flag-audio-player .jw-display-icon-container,.jw-flag-dragging .jw-display-icon-container{display:none}.jw-icon{font-family:jw-icons;-webkit-font-smoothing:antialiased;font-style:normal;font-weight:400;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-controlbar{display:table;position:absolute;bottom:0;height:2.5em;width:100%;padding:0 .5em}.jw-controlbar .jw-hidden{display:none}.jw-background-color{background-color:rgba(33,33,33,.8)}.jw-slider-horizontal{background-color:transparent}.jw-group{display:table-cell}.jw-controlbar-center-group{width:100%;padding:0 .5em}.jw-controlbar-center-group .jw-slider-time,.jw-controlbar-center-group .jw-text-alt{padding:0}.jw-controlbar-center-group .jw-text-alt{display:none}.jw-controlbar-left-group,.jw-controlbar-right-group{white-space:nowrap}.jw-icon-display:hover,.jw-icon-inline:hover,.jw-icon-tooltip:hover,.jw-knob:hover,.jw-option:before:hover{color:#fff}.jw-icon-inline,.jw-icon-tooltip,.jw-slider-horizontal,.jw-text-duration,.jw-text-elapsed{display:inline-block;height:2.5em;position:relative;line-height:2.5em;vertical-align:middle;cursor:pointer;padding:0 .5em}.jw-icon-inline,.jw-icon-tooltip{min-width:1.5625em;text-align:center}.jw-icon-playback{min-width:2.25em}.jw-icon-volume{min-width:1.75em;text-align:left}.jw-time-tip{line-height:1em;pointer-events:none}.jw-icon-cast,.jw-icon-inline.jw-icon-volume,.jw-slider-volume.jw-slider-horizontal{display:none}.jw-button-color{color:hsla(0,0%,100%,.6)}.jw-button-color:hover{color:#fff}.jw-button-color:focus{outline:none;color:#fff}.jw-toggle{color:#fff}.jw-toggle.jw-off{color:hsla(0,0%,100%,.6)}.jw-toggle:focus{outline:none;color:#fff}.jw-dock{clear:right;margin:.75em;display:block;opacity:1}.jw-breakpoint-0 .jw-dock{margin:.225em .1125em}.jw-breakpoint-1 .jw-dock{margin:.45em .225em}.jw-dock:after{content:\'\';clear:both;display:block}.jw-dock-button{cursor:pointer;float:right;height:2.5em;margin:.5em;position:relative;width:2.5em}.jw-breakpoint-0 .jw-dock-button{margin:0 .1125em;height:44px;width:44px}.jw-breakpoint-1 .jw-dock-button{margin:0 .225em;height:44px;width:44px}.jw-dock-button .jw-arrow{display:none;position:absolute;bottom:-.2em;width:.5em;height:.2em;left:50%;margin-left:-.25em}.jw-dock-button .jw-overlay{display:none;position:absolute;top:2.5em;right:0;margin-top:.25em;padding:.5em;white-space:nowrap}.jw-dock-button:hover .jw-arrow,.jw-dock-button:hover .jw-overlay{display:block}.jw-dock-image{width:100%;height:100%;background-position:50% 50%;background-repeat:no-repeat;opacity:.75}.jw-title{display:none;position:absolute;top:0;width:100%;font-size:.875em;height:8em;background:-webkit-linear-gradient(top,#000,#000 18%,transparent);background:linear-gradient(180deg,#000 0,#000 18%,transparent)}.jw-title-primary,.jw-title-secondary{padding:.75em 1.5em;min-height:2.5em;width:100%;color:#fff;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.jw-title-primary{font-weight:700}.jw-title-secondary{margin-top:-.5em}.jw-slider-container{height:1em;width:100%;position:relative;touch-action:none}.jw-buffer,.jw-progress,.jw-rail{position:absolute;cursor:pointer}.jw-progress{background-color:#fff}.jw-rail{background-color:hsla(0,0%,100%,.2)}.jw-buffer{background-color:hsla(0,0%,100%,.3)}.jw-cue,.jw-knob{position:absolute;cursor:pointer}.jw-cue{height:.25em;background-color:rgba(33,33,33,.9);border-radius:25%;width:.5em}.jw-knob{background-color:#fff;width:.5em;height:.5em;border-radius:.25em}.jw-slider-horizontal{height:.25em}.jw-slider-horizontal.jw-slider-volume{width:4em}.jw-slider-horizontal .jw-rail{width:100%}.jw-slider-horizontal .jw-knob{top:-.125em;margin-left:-.25em}.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-rail{height:.25em}.jw-slider-vertical{padding:1em 1em 0;position:absolute}.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-rail{bottom:0;height:100%;left:0;right:0;margin:0 auto}.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-slider-container{width:.25em}.jw-slider-vertical .jw-slider-container{height:4em}.jw-slider-vertical .jw-knob{right:0;left:-.125em}.jw-slider-time{width:100%}.jw-tooltip-time{position:absolute}.jw-slider-volume .jw-buffer{display:none}.jw-captions{position:absolute;width:100%;height:inherit;text-align:center;display:none;max-height:81.375%;line-height:1.3em;letter-spacing:normal;word-spacing:normal;text-transform:none;text-indent:0;text-decoration:none;pointer-events:none;overflow:hidden;top:0}.jw-captions.jw-captions-enabled{display:block}.jw-captions-window{display:none;padding:.25em;border-radius:.25em}.jw-captions-text,.jw-captions-window.jw-captions-window-active{display:inline-block}.jw-captions-text{color:#fff;background-color:#000;word-wrap:normal;word-break:normal;white-space:pre-line;font-style:normal;font-weight:400;text-align:center;text-decoration:none;line-height:1.3em;padding:.1em .8em}.jw-text-track-display{font-size:inherit;line-height:1.3em}.jwplayer video::-webkit-media-controls{-webkit-box-pack:start;justify-content:flex-start}.jwplayer video::-webkit-media-text-track-container{max-height:81.375%;line-height:1.3em}.jwplayer .jw-rightclick{display:none;position:absolute;white-space:nowrap}.jwplayer .jw-rightclick.jw-open{display:block}.jwplayer .jw-rightclick ul{list-style:none;font-weight:700;border-radius:.15em;margin:0;border:1px solid #444;padding:0}.jwplayer .jw-rightclick ul li{background-color:#000;border-bottom:1px solid #444;margin:0}.jwplayer .jw-rightclick ul li .jw-rightclick-logo{font-size:2em;color:#ff0147;vertical-align:middle;padding-right:.3em;margin-right:.3em;border-right:1px solid #444}.jwplayer .jw-rightclick ul li a{color:#fff;text-decoration:none;padding:1em;display:block;font-size:.6875em;line-height:1em}.jwplayer .jw-rightclick ul li:last-child{border-bottom:none}.jwplayer .jw-rightclick ul li:hover{background-color:#1a1a1a;cursor:pointer}.jwplayer .jw-rightclick ul .jw-featured{background-color:#252525;vertical-align:middle}.jwplayer .jw-rightclick ul .jw-featured a{color:#777}.jw-logo{position:absolute;margin:.75em;cursor:pointer;pointer-events:all;background-repeat:no-repeat;background-size:contain;top:auto;right:auto;left:auto;bottom:auto}.jw-logo .jw-flag-audio-player{display:none}.jw-logo-top-right{top:0;right:0}.jw-logo-top-left{top:0;left:0}.jw-logo-bottom-left{bottom:0;left:0}.jw-logo-bottom-right{bottom:0;right:0}.jw-icon-tooltip.jw-open .jw-overlay{opacity:1;visibility:visible}.jw-icon-tooltip.jw-hidden{display:none}.jw-overlay:before{position:absolute;top:0;bottom:0;left:-50%;width:100%;background-color:transparent;content:" "}.jw-slider-time .jw-overlay:before{height:1em;top:auto}.jw-menu,.jw-time-tip,.jw-volume-tip{position:relative;left:-50%;margin:0}.jw-volume-tip{width:100%;height:100%;display:block}.jw-time-tip{text-align:center;font-family:inherit;bottom:1.25em;padding:.5em;border-radius:.25em}.jw-time-tip .jw-text{color:#fff;line-height:1em}.jw-controlbar .jw-overlay{margin:0;position:absolute;bottom:2.5em;left:50%;opacity:0;visibility:hidden}.jw-controlbar .jw-overlay .jw-contents{position:relative}.jw-controlbar .jw-option{position:relative;white-space:nowrap;cursor:pointer;list-style:none;height:1.5em;font-family:inherit;line-height:1.5em;color:hsla(0,0%,100%,.6);padding:0 .5em;font-size:.8em}.jw-controlbar .jw-option:before:hover,.jw-controlbar .jw-option:hover{color:#fff}.jw-controlbar .jw-option:before{padding-right:.125em}.jw-controlbar .jw-option.jw-active-option{color:#fff}.jw-skip{cursor:default;position:absolute;float:right;display:inline-block;right:.75em;bottom:3em;padding:.5em}.jw-skip.jw-skippable{cursor:pointer}.jw-skip.jw-hidden{visibility:hidden}.jw-skip .jw-skip-icon{display:none;margin-left:-.75em}.jw-skip .jw-skip-icon:before{content:"\\E60C"}.jw-skip .jw-skip-icon,.jw-skip .jw-text{color:hsla(0,0%,100%,.6);vertical-align:middle;line-height:1.5em;font-size:.7em}.jw-skip.jw-skippable:hover{cursor:pointer}.jw-skip.jw-skippable:hover .jw-skip-icon,.jw-skip.jw-skippable:hover .jw-text{color:#fff}.jw-skip.jw-skippable .jw-skip-icon{display:inline;margin:0}.jwplayer.jw-state-paused.jw-flag-casting .jw-display-icon-container,.jwplayer.jw-state-playing.jw-flag-casting .jw-display-icon-container{display:table}.jwplayer.jw-flag-casting .jw-display-icon-container{border-radius:0;border:1px solid #fff;position:absolute;top:auto;left:.5em;right:.5em;bottom:50%;margin-bottom:-12.5%;height:50%;width:50%;padding:0;background-repeat:no-repeat;background-position:50%}.jwplayer.jw-flag-casting .jw-display-icon-container .jw-icon{font-size:3em}.jwplayer.jw-flag-casting.jw-state-complete .jw-preview{display:none}.jw-cast{position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:auto;background-position:50% 50%}.jw-cast-label{position:absolute;left:.5em;right:.5em;bottom:75%;margin-bottom:1.5em;text-align:center}.jw-cast-name{color:#ccc}.jw-nextup-container{-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;background-color:transparent;bottom:3em;cursor:pointer;max-width:300px;min-width:200px;opacity:0;position:absolute;right:.5em;-webkit-transform:translateY(5px);transform:translateY(5px);-webkit-transition:all .15s ease;transition:all .15s ease;visibility:hidden;width:40%}.jw-nextup-container-visible{opacity:1;-webkit-transform:translateY(0);transform:translateY(0);visibility:visible}.jw-nextup{border-radius:0;overflow:hidden;position:relative}.jw-nextup-header{background:rgba(33,33,33,.8);box-sizing:border-box;color:#fff;font-size:12px;font-weight:700;line-height:normal;padding:8px}.jw-nextup-body{background:rgba(0,0,0,.8);color:#fff;overflow:hidden}.jw-nextup-thumbnail{background-position:50%;background-size:cover;display:none;float:left;height:60px;width:45%}.jw-nextup-thumbnail-visible{display:block}.jw-nextup-title{box-sizing:border-box;float:left;font-size:12px;font-weight:700;line-height:1.3;overflow:hidden;padding:5px 6px;position:relative;text-overflow:ellipsis;white-space:nowrap;width:100%}.jw-nextup-thumbnail-visible+.jw-nextup-title{height:60px;white-space:normal;width:55%}.jw-nextup-thumbnail-visible+.jw-nextup-title:after{background:-webkit-linear-gradient(top,transparent,#000);background:linear-gradient(-180deg,transparent,#000);bottom:0;content:\'\';height:30px;left:0;position:absolute;width:100%}.jw-nextup-close{font-family:jw-icons;-webkit-font-smoothing:antialiased;font-style:normal;font-weight:400;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale;border:none;color:hsla(0,0%,100%,.6);font-size:13px;opacity:0;position:absolute;right:5px;top:6px;-webkit-transition:color .15s ease,opacity .15s ease,visibility .15s ease;transition:color .15s ease,opacity .15s ease,visibility .15s ease;visibility:hidden}.jw-nextup-close:before{content:"\\E615"}.jw-nextup-close:active,.jw-nextup-close:hover{color:#fff}.jw-nextup-sticky .jw-nextup-close{opacity:1;visibility:visible}.jw-state-idle .jw-preview{display:block}.jw-state-idle .jw-icon-display:before{content:"\\E60E"}.jw-state-idle .jw-captions,.jw-state-idle .jw-controlbar{display:none}.jw-state-idle .jw-title{display:block}.jwplayer.jw-state-playing .jw-display-icon-container{display:none}.jwplayer.jw-state-playing .jw-display-icon-container .jw-icon-display:before,.jwplayer.jw-state-playing .jw-icon-playback:before{content:"\\E60D"}.jwplayer.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-state-paused .jw-display-icon-container .jw-icon-display:before,.jwplayer.jw-state-paused .jw-icon-playback:before{content:"\\E60E"}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display:before{content:"\\E601"}@-webkit-keyframes spin{to{-webkit-transform:rotate(1turn)}}@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-buffering .jw-icon-playback:before{content:"\\E60D"}.jwplayer.jw-state-complete .jw-preview{display:block}.jwplayer.jw-state-complete .jw-display-icon-container .jw-icon-display:before{content:"\\E610"}.jwplayer.jw-state-complete .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-complete .jw-icon-playback:before{content:"\\E60E"}.jwplayer.jw-state-complete .jw-captions{display:none}.jwplayer.jw-state-error .jw-title,body .jw-error .jw-title{display:block}.jwplayer.jw-state-error .jw-title .jw-title-primary,body .jw-error .jw-title .jw-title-primary{white-space:normal}.jwplayer.jw-state-error .jw-preview,body .jw-error .jw-preview{display:block}.jwplayer.jw-state-error .jw-captions,.jwplayer.jw-state-error .jw-controlbar,body .jw-error .jw-captions,body .jw-error .jw-controlbar{display:none}.jwplayer.jw-state-error:hover .jw-display-icon-container,body .jw-error:hover .jw-display-icon-container{cursor:default;color:#fff;background:#000}.jwplayer.jw-state-error .jw-icon-display,body .jw-error .jw-icon-display{cursor:default;font-family:jw-icons;-webkit-font-smoothing:antialiased;font-style:normal;font-weight:400;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jwplayer.jw-state-error .jw-icon-display:before,body .jw-error .jw-icon-display:before{content:"\\E607"}.jwplayer.jw-state-error .jw-icon-display:hover,body .jw-error .jw-icon-display:hover{color:#fff}body .jw-error{font-size:16px;background-color:#000;color:#fff;width:100%;height:100%;display:table;opacity:1;position:relative}body .jw-error .jw-icon-container{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jwplayer.jw-flag-cast-available .jw-controlbar{display:table}.jwplayer.jw-flag-cast-available .jw-icon-cast{display:inline-block}.jwplayer.jw-flag-skin-loading .jw-captions,.jwplayer.jw-flag-skin-loading .jw-controls,.jwplayer.jw-flag-skin-loading .jw-title{display:none}.jwplayer.jw-flag-fullscreen{width:100%!important;height:100%!important;top:0;right:0;bottom:0;left:0;z-index:1000;margin:0;position:fixed}.jwplayer.jw-flag-live .jw-controlbar .jw-slider-time,.jwplayer.jw-flag-live .jw-controlbar .jw-text-duration,.jwplayer.jw-flag-live .jw-controlbar .jw-text-elapsed{display:none}.jwplayer.jw-flag-live .jw-controlbar .jw-text-alt{display:inline-block;margin:0 -.5em;overflow:hidden;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.jwplayer.jw-flag-live.jw-breakpoint-0 .jw-text-alt{max-width:80px}.jwplayer.jw-flag-live.jw-breakpoint-1 .jw-text-alt{max-width:150px}.jwplayer.jw-flag-live.jw-breakpoint-2 .jw-text-alt{max-width:250px}.jwplayer.jw-flag-live.jw-breakpoint-3 .jw-text-alt{max-width:370px}.jwplayer.jw-flag-live.jw-breakpoint-4 .jw-text-alt{max-width:470px}.jwplayer.jw-flag-live.jw-breakpoint-5 .jw-text-alt{max-width:630px}.jwplayer.jw-flag-live.jw-breakpoint-6 .jw-text-alt{max-width:790px}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-controlbar,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-dock,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-logo.jw-hide{display:none}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-nextup-container,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-plugin{bottom:.5em}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-media{cursor:none;-webkit-cursor-visibility:auto-hide}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-captions{max-height:none}.jwplayer.jw-flag-user-inactive.jw-state-playing video::-webkit-media-text-track-container{max-height:none}.jwplayer.jw-flag-user-inactive.jw-state-buffering .jw-controlbar{display:none}.jwplayer.jw-flag-user-inactive.jw-state-buffering .jw-nextup-container{bottom:.5em}.jwplayer.jw-flag-media-audio .jw-controlbar,.jwplayer.jw-flag-media-audio.jw-flag-user-inactive .jw-controlbar{display:table}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive .jw-nextup-container,.jwplayer.jw-flag-media-audio.jw-flag-user-inactive.jw-state-playing .jw-plugin{bottom:3em}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive.jw-state-playing .jw-captions{max-height:81.375%}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive.jw-state-playing video::-webkit-media-text-track-container{max-height:81.375%}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive.jw-state-playing.jw-flag-touch video::-webkit-media-text-track-container{max-height:70%}.jw-flag-media-audio .jw-preview{display:block}.jwplayer.jw-flag-ads .jw-captions.jw-captions-enabled,.jwplayer.jw-flag-ads .jw-dock,.jwplayer.jw-flag-ads .jw-logo,.jwplayer.jw-flag-ads .jw-nextup-container,.jwplayer.jw-flag-ads .jw-preview{display:none}.jwplayer.jw-flag-ads video::-webkit-media-text-track-container{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-horizontal,.jwplayer.jw-flag-ads .jw-controlbar .jw-text{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-fullscreen,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-playback,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-text-alt{display:inline-block;margin:0 -.5em;overflow:hidden;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline.jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume.jw-slider-horizontal{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-ads.jw-breakpoint-0 .jw-text-alt{max-width:80px}.jwplayer.jw-flag-ads.jw-breakpoint-1 .jw-text-alt{max-width:150px}.jwplayer.jw-flag-ads.jw-breakpoint-2 .jw-text-alt{max-width:250px}.jwplayer.jw-flag-ads.jw-breakpoint-3 .jw-text-alt{max-width:370px}.jwplayer.jw-flag-ads.jw-breakpoint-4 .jw-text-alt{max-width:470px}.jwplayer.jw-flag-ads.jw-breakpoint-5 .jw-text-alt{max-width:630px}.jwplayer.jw-flag-ads.jw-breakpoint-6 .jw-text-alt{max-width:790px}.jwplayer.jw-flag-ads-freewheel.jw-freewheel-before-impression .jw-media video{pointer-events:none}.jwplayer.jw-flag-ads-freewheel.jw-flag-user-inactive.jw-state-playing .jw-freewheel-nonlinear-container{bottom:.5em}.jwplayer.jw-flag-ads-freewheel .jw-freewheel-nonlinear-container{bottom:2.5em;pointer-events:none}.jwplayer.jw-flag-ads-freewheel .jw-freewheel-nonlinear-container iframe{pointer-events:all}.jwplayer.jw-flag-ads-googleima .jw-controlbar{display:table;bottom:0}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-controlbar{font-size:1em}.jwplayer.jw-flag-ads-googleima.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-flag-ads-googleima.jw-skin-seven .jw-controlbar{font-size:.9em}.jwplayer.jw-flag-ads.jw-flag-touch .jw-controlbar{display:table}.jwplayer.jw-flag-ads-vpaid .jw-controlbar,.jwplayer.jw-flag-ads-vpaid .jw-skip,.jwplayer.jw-flag-touch.jw-flag-ads-vpaid .jw-controlbar,.jwplayer.jw-flag-touch.jw-flag-ads-vpaid .jw-skip{display:none}.jwplayer.jw-flag-ads-hide-controls .jw-controls{display:none!important}.jwplayer.jw-flag-overlay-open-related .jw-controls,.jwplayer.jw-flag-overlay-open-related .jw-title,.jwplayer.jw-flag-overlay-open-sharing .jw-controls,.jwplayer.jw-flag-overlay-open-sharing .jw-title,.jwplayer.jw-flag-overlay-open .jw-controls-right .jw-logo,.jwplayer.jw-flag-overlay-open .jw-title{display:none}.jwplayer.jw-flag-rightclick-open{overflow:visible}.jwplayer.jw-flag-rightclick-open .jw-rightclick{z-index:16777215}.jw-flag-controls-disabled .jw-controls{visibility:hidden}.jw-flag-controls-disabled .jw-logo{visibility:visible}.jw-flag-controls-disabled .jw-media{cursor:auto}.jw-flag-controls-disabled.jwplayer .jw-captions{max-height:none}.jw-flag-controls-disabled.jwplayer video::-webkit-media-text-track-container{max-height:none}body .jwplayer.jw-flag-flash-blocked .jw-title{display:block}body .jwplayer.jw-flag-flash-blocked .jw-controls,body .jwplayer.jw-flag-flash-blocked .jw-overlays,body .jwplayer.jw-flag-flash-blocked .jw-preview{display:none}.jw-flag-touch.jw-breakpoint-4 .jw-controlbar,.jw-flag-touch.jw-breakpoint-4 .jw-plugin,.jw-flag-touch.jw-breakpoint-4 .jw-skip,.jw-flag-touch.jw-breakpoint-5 .jw-controlbar,.jw-flag-touch.jw-breakpoint-5 .jw-plugin,.jw-flag-touch.jw-breakpoint-5 .jw-skip,.jw-flag-touch.jw-breakpoint-6 .jw-controlbar,.jw-flag-touch.jw-breakpoint-6 .jw-plugin,.jw-flag-touch.jw-breakpoint-6 .jw-skip,.jw-flag-touch.jw-breakpoint-7 .jw-controlbar,.jw-flag-touch.jw-breakpoint-7 .jw-plugin,.jw-flag-touch.jw-breakpoint-7 .jw-skip{font-size:1.5em}.jw-flag-touch.jw-breakpoint-4 .jw-captions,.jw-flag-touch.jw-breakpoint-5 .jw-captions,.jw-flag-touch.jw-breakpoint-6 .jw-captions,.jw-flag-touch.jw-breakpoint-7 .jw-captions{bottom:4.25em}.jw-flag-touch.jw-breakpoint-4 video::-webkit-media-text-track-container,.jw-flag-touch.jw-breakpoint-5 video::-webkit-media-text-track-container,.jw-flag-touch.jw-breakpoint-6 video::-webkit-media-text-track-container,.jw-flag-touch.jw-breakpoint-7 video::-webkit-media-text-track-container{max-height:70%}.jw-flag-touch.jw-breakpoint-4 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-5 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-6 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-7 .jw-nextup-container{bottom:4.25em}.jw-flag-touch .jw-display-icon-container{pointer-events:none}.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:table}.jw-flag-compact-player .jw-text-duration,.jw-flag-compact-player .jw-text-elapsed,.jw-flag-touch.jw-state-paused.jw-flag-dragging .jw-display-icon-container{display:none}.jwplayer.jw-flag-audio-player{background-color:transparent}.jwplayer.jw-flag-audio-player .jw-media{visibility:hidden}.jwplayer.jw-flag-audio-player .jw-media object{width:1px;height:1px}.jwplayer.jw-flag-audio-player .jw-display-icon-container,.jwplayer.jw-flag-audio-player .jw-dock,.jwplayer.jw-flag-audio-player .jw-nextup-container,.jwplayer.jw-flag-audio-player .jw-preview,.jwplayer.jw-flag-audio-player .jw-title{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar{vertical-align:middle;display:table;height:100%;left:0;bottom:0;margin:0;width:100%;min-width:100%}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-fullscreen,.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-inline.jw-icon-volume,.jwplayer.jw-flag-audio-player .jw-controlbar .jw-slider-volume.jw-slider-horizontal{display:inline-block}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-audio-player.jw-flag-user-inactive .jw-controlbar{display:table}.jwplayer.jw-flag-audio-player .jw-icon-inline{height:auto;line-height:normal}.jwplayer.jw-flag-audio-player .jw-group{vertical-align:middle}.jwplayer.jw-flag-audio-player .jw-controlbar-center-group{padding-bottom:2px}.jw-breakpoint-0 .jw-nextup-container,.jw-breakpoint-0 .jw-text-duration,.jw-breakpoint-0 .jw-text-elapsed,.jw-breakpoint-1 .jw-nextup-container,.jw-breakpoint-1 .jw-text-duration,.jw-breakpoint-1 .jw-text-elapsed{display:none}.jw-skin-seven .jw-color-active,.jw-skin-seven .jw-color-active-hover:hover{color:#fff;stroke:#fff;border-color:#fff}.jw-skin-seven .jw-color-inactive,.jw-skin-seven .jw-color-inactive-hover:hover{color:#cecece;stroke:#cecece;border-color:#cecece}.jw-skin-seven .jw-active-option{background-color:hsla(0,0%,100%,.1)}.jw-skin-seven .jw-display-icon-container{display:table;font-size:20px;border-radius:3.5em}.jw-skin-seven .jw-display-icon-container:hover .jw-icon{color:#fff}.jw-skin-seven .jw-display-icon-container>.jw-icon{color:hsla(0,0%,100%,.9);font-size:1.7em}.jw-skin-seven.jw-state-idle .jw-display-icon-container>.jw-icon{padding-left:4px}.jw-skin-seven .jw-dock-button{border-radius:2.5em}.jw-skin-seven .jw-menu{padding:0}.jw-skin-seven .jw-dock .jw-overlay,.jw-skin-seven .jw-skip{border-radius:.5em}.jw-skin-seven .jw-text{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.jw-skin-seven.jw-breakpoint-0 .jw-display-icon-container .jw-icon{font-size:22px}.jw-skin-seven.jw-breakpoint-1 .jw-display-icon-container .jw-icon{font-size:35.2px}',""]);
},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){e.exports=n.p+"jw-icons.ttf"},function(e,t,n){e.exports=n.p+"jw-icons.woff"},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){return'<div class="jw-skip jw-background-color jw-hidden jw-reset">\n    <span class="jw-text jw-skiptext jw-reset"></span>\n    <span class="jw-icon-inline jw-skip-icon jw-reset"></span>\n</div>'},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o;return'<div class="jw-display-icon-container jw-background-color jw-reset">\n    <div class="jw-icon jw-icon-display jw-button-color jw-reset" role="button" tabindex="0" aria-label="'+e.escapeExpression((o=null!=(o=n.ariaLabel||(null!=t?t.ariaLabel:t))?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:{},{name:"ariaLabel",hash:{},data:r}):o))+'"></div>\n</div>\n'},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({1:function(e,t,n,i,r){var o,a,s=null!=t?t:{};return'    <div class="jw-dock-button jw-background-color jw-reset'+(null!=(o=n["if"].call(s,null!=t?t.btnClass:t,{name:"if",hash:{},fn:e.program(2,r,0),inverse:e.noop,data:r}))?o:"")+'" button="'+e.escapeExpression((a=null!=(a=n.id||(null!=t?t.id:t))?a:n.helperMissing,"function"==typeof a?a.call(s,{name:"id",hash:{},data:r}):a))+'">\n        <div class="jw-icon jw-dock-image jw-reset" '+(null!=(o=n["if"].call(s,null!=t?t.img:t,{name:"if",hash:{},fn:e.program(4,r,0),inverse:e.noop,data:r}))?o:"")+'></div>\n        <div class="jw-arrow jw-reset"></div>\n'+(null!=(o=n["if"].call(s,null!=t?t.tooltip:t,{name:"if",hash:{},fn:e.program(6,r,0),inverse:e.noop,data:r}))?o:"")+"    </div>\n"},2:function(e,t,n,i,r){var o;return" "+e.escapeExpression((o=null!=(o=n.btnClass||(null!=t?t.btnClass:t))?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:{},{name:"btnClass",hash:{},data:r}):o))},4:function(e,t,n,i,r){var o;return"style='background-image: url(\""+e.escapeExpression((o=null!=(o=n.img||(null!=t?t.img:t))?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:{},{name:"img",hash:{},data:r}):o))+"\")'"},6:function(e,t,n,i,r){var o;return'        <div class="jw-overlay jw-background-color jw-reset">\n            <span class="jw-text jw-dock-text jw-reset">'+e.escapeExpression((o=null!=(o=n.tooltip||(null!=t?t.tooltip:t))?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:{},{name:"tooltip",hash:{},data:r}):o))+"</span>\n        </div>\n"},compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o;return'<div class="jw-dock jw-reset">\n'+(null!=(o=n.each.call(null!=t?t:{},t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r}))?o:"")+"</div>"},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o,a=null!=t?t:{},s=n.helperMissing,l="function",u=e.escapeExpression;return'<div id="'+u((o=null!=(o=n.id||(null!=t?t.id:t))?o:s,typeof o===l?o.call(a,{name:"id",hash:{},data:r}):o))+'"class="jw-skin-'+u((o=null!=(o=n.skin||(null!=t?t.skin:t))?o:s,typeof o===l?o.call(a,{name:"skin",hash:{},data:r}):o))+' jw-error jw-reset">\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset">'+u((o=null!=(o=n.title||(null!=t?t.title:t))?o:s,typeof o===l?o.call(a,{name:"title",hash:{},data:r}):o))+'</div>\n        <div class="jw-title-secondary jw-reset">'+u((o=null!=(o=n.body||(null!=t?t.body:t))?o:s,typeof o===l?o.call(a,{name:"body",hash:{},data:r}):o))+'</div>\n    </div>\n\n    <div class="jw-icon-container jw-reset">\n        <div class="jw-display-icon-container jw-background-color jw-reset">\n            <div class="jw-icon jw-icon-display jw-reset" aria-hidden="true"></div>\n        </div>\n    </div>\n</div>\n'},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){return'<div class="jw-logo jw-reset"></div>'},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({1:function(e,t,n,i,r){var o,a=e.escapeExpression;return"        <li class='jw-text jw-option jw-item-"+a((o=null!=(o=n.index||r&&r.index)?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:{},{name:"index",hash:{},data:r}):o))+" jw-reset'>"+a(e.lambda(null!=t?t.label:t,t))+"</li>\n"},compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o;return'<ul class="jw-menu jw-background-color jw-reset">\n'+(null!=(o=n.each.call(null!=t?t:{},t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r}))?o:"")+"</ul>"},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o=e.lambda,a=e.escapeExpression;return'<div class="jw-nextup jw-reset">\n    <div class="jw-nextup-tooltip jw-reset">\n        <div class="jw-nextup-header jw-reset">\n            '+a(o(null!=t?t.nextUpText:t,t))+'\n        </div>\n        <div class="jw-nextup-body jw-background-color jw-reset">\n            <div class="jw-nextup-thumbnail jw-reset"></div>\n            <div class="jw-nextup-title jw-reset">'+a(o(null!=t?t.title:t,t))+'</div>\n        </div>\n    </div>\n    <button class="jw-nextup-close"></button>\n</div>\n'},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o;return'<div id="'+e.escapeExpression((o=null!=(o=n.id||(null!=t?t.id:t))?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:{},{name:"id",hash:{},data:r}):o))+'" class="jwplayer jw-reset jw-state-idle" tabindex="0">\n    <div class="jw-aspect jw-reset"></div>\n    <div class="jw-media jw-reset"></div>\n    <div class="jw-preview jw-reset"></div>\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset"></div>\n        <div class="jw-title-secondary jw-reset"></div>\n    </div>\n    <div class="jw-overlays jw-reset"></div>\n    <div class="jw-controls jw-reset"></div>\n</div>'},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({1:function(e,t,n,i,r){var o,a,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression;return'        <li class="jw-reset'+(null!=(o=n["if"].call(s,null!=t?t.featured:t,{name:"if",hash:{},fn:e.program(2,r,0),inverse:e.noop,data:r}))?o:"")+'">\n            <a href="'+c((a=null!=(a=n.link||(null!=t?t.link:t))?a:l,typeof a===u?a.call(s,{name:"link",hash:{},data:r}):a))+'" class="jw-reset" target="_top">\n'+(null!=(o=n["if"].call(s,null!=t?t.showLogo:t,{name:"if",hash:{},fn:e.program(4,r,0),inverse:e.noop,data:r}))?o:"")+"                "+c((a=null!=(a=n.title||(null!=t?t.title:t))?a:l,typeof a===u?a.call(s,{name:"title",hash:{},data:r}):a))+"\n            </a>\n        </li>\n"},2:function(e,t,n,i,r){return" jw-featured"},4:function(e,t,n,i,r){return'                <span class="jw-icon jw-rightclick-logo jw-reset"></span>\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o;return'<div class="jw-rightclick jw-reset">\n    <ul class="jw-reset">\n'+(null!=(o=n.each.call(null!=t?t:{},null!=t?t.items:t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r}))?o:"")+"    </ul>\n</div>"},useData:!0})},function(e,t,n){var i=n(11);e.exports=(i["default"]||i).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,i,r){var o,a=null!=t?t:{},s=n.helperMissing,l="function",u=e.escapeExpression;return'<div class="'+u((o=null!=(o=n.className||(null!=t?t.className:t))?o:s,typeof o===l?o.call(a,{name:"className",hash:{},data:r}):o))+" "+u((o=null!=(o=n.orientation||(null!=t?t.orientation:t))?o:s,typeof o===l?o.call(a,{name:"orientation",hash:{},data:r}):o))+' jw-reset" aria-hidden="true">\n    <div class="jw-slider-container jw-reset">\n        <div class="jw-rail jw-reset"></div>\n        <div class="jw-buffer jw-reset"></div>\n        <div class="jw-progress jw-reset"></div>\n        <div class="jw-knob jw-reset"></div>\n    </div>\n</div>'},useData:!0})},,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(){var e=new s.HandlebarsEnvironment;return h.extend(e,s),e.SafeString=u["default"],e.Exception=d["default"],e.Utils=h,e.escapeExpression=h.escapeExpression,e.VM=g,e.template=function(t){return g.template(t,e)},e}t.__esModule=!0;var a=n(66),s=r(a),l=n(161),u=i(l),c=n(22),d=i(c),p=n(13),h=r(p),f=n(160),g=r(f),m=n(159),w=i(m),v=o();v.create=o,w["default"](v),v["default"]=v,t["default"]=v,e.exports=t["default"]},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){a["default"](e)}t.__esModule=!0,t.registerDefaultDecorators=r;var o=n(149),a=i(o)},function(e,t,n){"use strict";t.__esModule=!0;var i=n(13);t["default"]=function(e){e.registerDecorator("inline",function(e,t,n,r){var o=e;return t.partials||(t.partials={},o=function(r,o){var a=n.partials;n.partials=i.extend({},a,t.partials);var s=e(r,o);return n.partials=a,s}),t.partials[r.args[0]]=r.fn,o})},e.exports=t["default"]},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){a["default"](e),l["default"](e),c["default"](e),p["default"](e),f["default"](e),m["default"](e),v["default"](e)}t.__esModule=!0,t.registerDefaultHelpers=r;var o=n(151),a=i(o),s=n(152),l=i(s),u=n(153),c=i(u),d=n(154),p=i(d),h=n(155),f=i(h),g=n(156),m=i(g),w=n(157),v=i(w)},function(e,t,n){"use strict";t.__esModule=!0;var i=n(13);t["default"]=function(e){e.registerHelper("blockHelperMissing",function(t,n){var r=n.inverse,o=n.fn;if(t===!0)return o(this);if(t===!1||null==t)return r(this);if(i.isArray(t))return t.length>0?(n.ids&&(n.ids=[n.name]),e.helpers.each(t,n)):r(this);if(n.data&&n.ids){var a=i.createFrame(n.data);a.contextPath=i.appendContextPath(n.data.contextPath,n.name),n={data:a}}return o(t,n)})},e.exports=t["default"]},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var r=n(13),o=n(22),a=i(o);t["default"]=function(e){e.registerHelper("each",function(e,t){function n(t,n,o){u&&(u.key=t,u.index=n,u.first=0===n,u.last=!!o,c&&(u.contextPath=c+t)),l+=i(e[t],{data:u,blockParams:r.blockParams([e[t],t],[c+t,null])})}if(!t)throw new a["default"]("Must pass iterator to #each");var i=t.fn,o=t.inverse,s=0,l="",u=void 0,c=void 0;if(t.data&&t.ids&&(c=r.appendContextPath(t.data.contextPath,t.ids[0])+"."),r.isFunction(e)&&(e=e.call(this)),t.data&&(u=r.createFrame(t.data)),e&&"object"==typeof e)if(r.isArray(e))for(var d=e.length;s<d;s++)s in e&&n(s,s,s===e.length-1);else{var p=void 0;for(var h in e)e.hasOwnProperty(h)&&(void 0!==p&&n(p,s-1),p=h,s++);void 0!==p&&n(p,s-1,!0)}return 0===s&&(l=o(this)),l})},e.exports=t["default"]},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var r=n(22),o=i(r);t["default"]=function(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new o["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')})},e.exports=t["default"]},function(e,t,n){"use strict";t.__esModule=!0;var i=n(13);t["default"]=function(e){e.registerHelper("if",function(e,t){return i.isFunction(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||i.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,n){return e.helpers["if"].call(this,t,{fn:n.inverse,inverse:n.fn,hash:n.hash})})},e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e){e.registerHelper("log",function(){for(var t=[void 0],n=arguments[arguments.length-1],i=0;i<arguments.length-1;i++)t.push(arguments[i]);var r=1;null!=n.hash.level?r=n.hash.level:n.data&&null!=n.data.level&&(r=n.data.level),t[0]=r,e.log.apply(e,t)})},e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e){e.registerHelper("lookup",function(e,t){return e&&e[t]})},e.exports=t["default"]},function(e,t,n){"use strict";t.__esModule=!0;var i=n(13);t["default"]=function(e){e.registerHelper("with",function(e,t){i.isFunction(e)&&(e=e.call(this));var n=t.fn;if(i.isEmpty(e))return t.inverse(this);var r=t.data;return t.data&&t.ids&&(r=i.createFrame(t.data),r.contextPath=i.appendContextPath(t.data.contextPath,t.ids[0])),n(e,{data:r,blockParams:i.blockParams([e],[r&&r.contextPath])})})},e.exports=t["default"]},function(e,t,n){"use strict";t.__esModule=!0;var i=n(13),r={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var t=i.indexOf(r.methodMap,e.toLowerCase());e=t>=0?t:parseInt(e,10)}return e},log:function(e){if(e=r.lookupLevel(e),"undefined"!=typeof console&&r.lookupLevel(r.level)<=e){var t=r.methodMap[e];console[t]||(t="log");for(var n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];console[t].apply(console,i)}}};t["default"]=r,e.exports=t["default"]},function(e,t){(function(n){"use strict";t.__esModule=!0,t["default"]=function(e){var t="undefined"!=typeof n?n:window,i=t.Handlebars;e.noConflict=function(){return t.Handlebars===e&&(t.Handlebars=i),e}},e.exports=t["default"]}).call(t,function(){return this}())},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(e){var t=e&&e[0]||1,n=w.COMPILER_REVISION;if(t!==n){if(t<n){var i=w.REVISION_CHANGES[n],r=w.REVISION_CHANGES[t];throw new m["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+i+") or downgrade your runtime to an older version ("+r+").")}throw new m["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function a(e,t){function n(n,i,r){r.hash&&(i=f.extend({},i,r.hash),r.ids&&(r.ids[0]=!0)),n=t.VM.resolvePartial.call(this,n,i,r);var o=t.VM.invokePartial.call(this,n,i,r);if(null==o&&t.compile&&(r.partials[r.name]=t.compile(n,e.compilerOptions,t),o=r.partials[r.name](i,r)),null!=o){if(r.indent){for(var a=o.split("\n"),s=0,l=a.length;s<l&&(a[s]||s+1!==l);s++)a[s]=r.indent+a[s];o=a.join("\n")}return o}throw new m["default"]("The partial "+r.name+" could not be compiled when running in runtime-only mode")}function i(t){function n(t){return""+e.main(r,t,r.helpers,r.partials,a,l,s)}var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=o.data;i._setup(o),!o.partial&&e.useData&&(a=d(t,a));var s=void 0,l=e.useBlockParams?[]:void 0;return e.useDepths&&(s=o.depths?t!==o.depths[0]?[t].concat(o.depths):o.depths:[t]),(n=p(e.main,n,r,o.depths||[],a,l))(t,o)}if(!t)throw new m["default"]("No environment passed to template");if(!e||!e.main)throw new m["default"]("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var r={strict:function(e,t){if(!(t in e))throw new m["default"]('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var n=e.length,i=0;i<n;i++)if(e[i]&&null!=e[i][t])return e[i][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:f.escapeExpression,invokePartial:n,fn:function(t){var n=e[t];return n.decorator=e[t+"_d"],n},programs:[],program:function(e,t,n,i,r){var o=this.programs[e],a=this.fn(e);return t||r||i||n?o=s(this,e,a,t,n,i,r):o||(o=this.programs[e]=s(this,e,a)),o},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var n=e||t;return e&&t&&e!==t&&(n=f.extend({},t,e)),n},noop:t.VM.noop,compilerInfo:e.compiler};return i.isTop=!0,i._setup=function(n){n.partial?(r.helpers=n.helpers,r.partials=n.partials,r.decorators=n.decorators):(r.helpers=r.merge(n.helpers,t.helpers),e.usePartial&&(r.partials=r.merge(n.partials,t.partials)),(e.usePartial||e.useDecorators)&&(r.decorators=r.merge(n.decorators,t.decorators)))},i._child=function(t,n,i,o){if(e.useBlockParams&&!i)throw new m["default"]("must pass block params");if(e.useDepths&&!o)throw new m["default"]("must pass parent depths");return s(r,t,e[t],n,0,i,o)},i}function s(e,t,n,i,r,o,a){function s(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=a;return a&&t!==a[0]&&(s=[t].concat(a)),n(e,t,e.helpers,e.partials,r.data||i,o&&[r.blockParams].concat(o),s)}return s=p(n,s,e,a,i,o),s.program=t,s.depth=a?a.length:0,s.blockParams=r||0,s}function l(e,t,n){return e?e.call||n.name||(n.name=e,e=n.partials[e]):e="@partial-block"===n.name?n.data["partial-block"]:n.partials[n.name],e}function u(e,t,n){n.partial=!0,n.ids&&(n.data.contextPath=n.ids[0]||n.data.contextPath);var i=void 0;if(n.fn&&n.fn!==c&&(n.data=w.createFrame(n.data),i=n.data["partial-block"]=n.fn,i.partials&&(n.partials=f.extend({},n.partials,i.partials))),void 0===e&&i&&(e=i),void 0===e)throw new m["default"]("The partial "+n.name+" could not be found");if(e instanceof Function)return e(t,n)}function c(){return""}function d(e,t){return t&&"root"in t||(t=t?w.createFrame(t):{},t.root=e),t}function p(e,t,n,i,r,o){if(e.decorator){var a={};t=e.decorator(t,a,n,i&&i[0],r,o,i),f.extend(t,a)}return t}t.__esModule=!0,t.checkRevision=o,t.template=a,t.wrapProgram=s,t.resolvePartial=l,t.invokePartial=u,t.noop=c;var h=n(13),f=r(h),g=n(22),m=i(g),w=n(66)},function(e,t){"use strict";function n(e){this.string=e}t.__esModule=!0,n.prototype.toString=n.prototype.toHTML=function(){return""+this.string},t["default"]=n,e.exports=t["default"]},function(e,t,n){var i,r;i=[n(25),n(1)],r=function(e,t){return function(n,i){var r=["seek","skipAd","stop","playlistNext","playlistPrev","playlistItem","resize","addButton","removeButton","registerPlugin","attachMedia","next"];t.each(r,function(e){n[e]=function(){return i[e].apply(i,arguments),n}}),n.registerPlugin=e.registerPlugin}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){return function(t,n){var i=["buffer","controls","position","duration","fullscreen","volume","mute","item","stretching","playlist","captions"];e.each(i,function(e){var i=e.slice(0,1).toUpperCase()+e.slice(1);t["get"+i]=function(){return n._model.get(e)}});var r=["getAudioTracks","getCaptionsList","getWidth","getHeight","getCurrentAudioTrack","setCurrentAudioTrack","getCurrentCaptions","setCurrentCaptions","getCurrentQuality","setCurrentQuality","getQualityLevels","getVisualQuality","getConfig","getState","getSafeRegion","isBeforeComplete","isBeforePlay","getProvider","detachMedia"],o=["setControls","setFullscreen","setVolume","setMute","setCues","setCaptions"];e.each(r,function(e){t[e]=function(){return n[e]?n[e].apply(n,arguments):null}}),e.each(o,function(e){t[e]=function(){return n[e].apply(n,arguments),t}}),t.getPlaylistIndex=t.getItem}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(4),n(6),n(3),n(2),n(82),n(1),n(217),n(162),n(163),n(165),n(29)],r=function(e,t,n,i,r,o,a,s,l,u,c){var d=function(d,p){var h,f=this,g=!1,m={};o.extend(this,n),this.utils=i,this._=o,this.Events=n,this.version=c,this.trigger=function(e,t){t=o.isObject(t)?o.extend({},t):{},t.type=e;var i=window.jwplayer;return i&&i.debug?n.trigger.call(f,e,t):n.triggerSafe.call(f,e,t)},this.dispatchEvent=this.trigger,this.removeEventListener=this.off.bind(this);var w=function(){h=new a(d),s(f,h),l(f,h),h.on(e.JWPLAYER_PLAYLIST_ITEM,function(){m={}}),h.on(e.JWPLAYER_MEDIA_META,function(e){o.extend(m,e.metadata)}),h.on(e.JWPLAYER_READY,function(e){g=!0,v.tick("ready"),e.setupTime=v.between("setup","ready")}),h.on("all",f.trigger)};w(),u(this),this.id=d.id;var v=this._qoe=new r;v.tick("init");var y=function(){g=!1,m={},f.off(),h&&h.off(),h&&h.playerDestroy&&h.playerDestroy()};return this.getPlugin=function(e){return f.plugins&&f.plugins[e]},this.addPlugin=function(e,t){this.plugins=this.plugins||{},this.plugins[e]=t,this.onReady(t.addToPlayer),t.resize&&this.onResize(t.resizeHandler)},this.setup=function(e){return v.tick("setup"),y(),w(),i.foreach(e.events,function(e,t){var n=f[e];"function"==typeof n&&n.call(f,t)}),e.id=f.id,h.setup(e,this),f},this.qoe=function(){var t=h.getItemQoe(),n=v.between("setup","ready"),i=t.between(e.JWPLAYER_MEDIA_PLAY_ATTEMPT,e.JWPLAYER_MEDIA_FIRST_FRAME);return{setupTime:n,firstFrame:i,player:v.dump(),item:t.dump()}},this.getContainer=function(){return h.getContainer?h.getContainer():d},this.getMeta=this.getItemMeta=function(){return m},this.getPlaylistItem=function(e){if(!i.exists(e))return h._model.get("playlistItem");var t=f.getPlaylist();return t?t[e]:null},this.getRenderingMode=function(){return"html5"},this.load=function(e){var t=this.getPlugin("vast")||this.getPlugin("googima")||this.getPlugin("freewheel");return t&&(h._model.set("preInstreamState","instream-idle"),t.destroy()),h.load(e),f},this.play=function(e,n){if(o.isBoolean(e)||(n=e),n||(n={reason:"external"}),e===!0)return h.play(n),f;if(e===!1)return h.pause(),f;switch(e=f.getState()){case t.PLAYING:case t.BUFFERING:h.pause();break;default:h.play(n)}return f},this.pause=function(e){return o.isBoolean(e)?this.play(!e):this.play()},this.createInstream=function(){return h.createInstream()},this.castToggle=function(){h&&h.castToggle&&h.castToggle()},this.playAd=this.pauseAd=i.noop,this.remove=function(){return p(f),f.trigger("remove"),y(),f},this};return d}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(4)],r=function(e,t){return function(n){var i={onBufferChange:t.JWPLAYER_MEDIA_BUFFER,onBufferFull:t.JWPLAYER_MEDIA_BUFFER_FULL,onError:t.JWPLAYER_ERROR,onSetupError:t.JWPLAYER_SETUP_ERROR,onFullscreen:t.JWPLAYER_FULLSCREEN,onMeta:t.JWPLAYER_MEDIA_META,onMute:t.JWPLAYER_MEDIA_MUTE,onPlaylist:t.JWPLAYER_PLAYLIST_LOADED,onPlaylistItem:t.JWPLAYER_PLAYLIST_ITEM,onPlaylistComplete:t.JWPLAYER_PLAYLIST_COMPLETE,onReady:t.JWPLAYER_READY,onResize:t.JWPLAYER_RESIZE,onComplete:t.JWPLAYER_MEDIA_COMPLETE,onSeek:t.JWPLAYER_MEDIA_SEEK,onTime:t.JWPLAYER_MEDIA_TIME,onVolume:t.JWPLAYER_MEDIA_VOLUME,onBeforePlay:t.JWPLAYER_MEDIA_BEFOREPLAY,onBeforeComplete:t.JWPLAYER_MEDIA_BEFORECOMPLETE,onDisplayClick:t.JWPLAYER_DISPLAY_CLICK,onControls:t.JWPLAYER_CONTROLS,onQualityLevels:t.JWPLAYER_MEDIA_LEVELS,onQualityChange:t.JWPLAYER_MEDIA_LEVEL_CHANGED,onCaptionsList:t.JWPLAYER_CAPTIONS_LIST,onCaptionsChange:t.JWPLAYER_CAPTIONS_CHANGED,onAdError:t.JWPLAYER_AD_ERROR,onAdClick:t.JWPLAYER_AD_CLICK,onAdImpression:t.JWPLAYER_AD_IMPRESSION,onAdTime:t.JWPLAYER_AD_TIME,onAdComplete:t.JWPLAYER_AD_COMPLETE,onAdCompanions:t.JWPLAYER_AD_COMPANIONS,onAdSkipped:t.JWPLAYER_AD_SKIPPED,onAdPlay:t.JWPLAYER_AD_PLAY,onAdPause:t.JWPLAYER_AD_PAUSE,onAdMeta:t.JWPLAYER_AD_META,onCast:t.JWPLAYER_CAST_SESSION,onAudioTrackChange:t.JWPLAYER_AUDIO_TRACK_CHANGED,onAudioTracks:t.JWPLAYER_AUDIO_TRACKS},r={onBuffer:"buffer",onPause:"pause",onPlay:"play",onIdle:"idle"};e.each(r,function(t,i){n[i]=e.partial(n.on,t,e)}),e.each(i,function(t,i){n[i]=e.partial(n.on,t,e)})}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(164),n(1),n(53),n(52),n(25)],r=function(e,t,n,i,r){var o=[],a=0,s=function(t){var n,i;return t?"string"==typeof t?(n=l(t),n||(i=document.getElementById(t))):"number"==typeof t?n=o[t]:t.nodeType&&(i=t,n=l(i.id)):n=o[0],n?n:i?u(new e(i,c)):{registerPlugin:r.registerPlugin}},l=function(e){for(var t=0;t<o.length;t++)if(o[t].id===e)return o[t];return null},u=function(e){return a++,e.uniqueId=a,o.push(e),e},c=function(e){for(var t=o.length;t--;)if(o[t].uniqueId===e.uniqueId){o.splice(t,1);break}},d={selectPlayer:s,registerProvider:n.registerProvider,availableProviders:i,registerPlugin:r.registerPlugin};return s.api=d,d}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(218),n(3),n(1),n(4)],r=function(e,t,n,i){var r=function(t,r,o,a){function s(){p("Setup Timeout Error","Setup took longer than "+m+" seconds to complete.")}function l(){n.each(g,function(e){e.complete!==!0&&e.running!==!0&&null!==t&&c(e.depends)&&(e.running=!0,u(e))})}function u(e){var n=function(t){t=t||{},d(e,t)};e.method(n,r,t,o,a)}function c(e){return n.all(e,function(e){return g[e].complete})}function d(e,t){"error"===t.type?p(t.msg,t.reason):"complete"===t.type?(clearTimeout(h),f.trigger(i.JWPLAYER_READY)):(e.complete=!0,l())}function p(e,t){clearTimeout(h),f.trigger(i.JWPLAYER_SETUP_ERROR,{message:e+": "+t}),f.destroy()}var h,f=this,g=e.getQueue(),m=30;this.start=function(){h=setTimeout(s,1e3*m),l()},this.destroy=function(){clearTimeout(h),this.off(),g.length=0,t=null,r=null,o=null}};return r.prototype=t,r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(23),n(16)],r=function(e,t,n){var i=function(i,r){function o(e){if(e.tracks.length){for(var t=e.tracks||[],n=0;n<t.length;n++){var i=t[n];v[i._id]||p(i)}var r=h();f(),this.setCaptionsList(r)}}function a(e,t){m=t,w=[],v={},y={},j=0}function s(e){a(r,e);var i=e.tracks,o=i&&i.length;if(!n.renderNatively(r.get("provider").name)&&o){var s,d;for(s=0;s<o;s++)d=i[s],l(d.kind)&&!v[d._id]&&(p(d),t.loadFile(d,u.bind(null,d),c))}var g=h();f(),this.setCaptionsList(g)}function l(e){return"subtitles"===e||"captions"===e}function u(e,t){e.data=t}function c(t){e.log("CAPTIONS("+t+")")}function d(e,t){var n=null;0!==t&&(n=w[t-1]),e.set("captionsTrack",n)}function p(e){if(e.data=e.data||[],e.name=e.label||e.name||e.language,e._id=n.createId(e,w.length),!e.name){var t=n.createLabel(e,j);e.name=t.label,j=t.unknownCount}w.push(e),v[e._id]=e}function h(){for(var e=[{id:"off",label:"Off"}],t=0;t<w.length;t++)e.push({id:w[t]._id,label:w[t].name||"Unknown CC"});return e}function f(){var e=0,t=r.get("captionLabel");if("Off"===t)return void r.set("captionsIndex",0);for(var n=0;n<w.length;n++){var i=w[n];if(t&&t===i.name){e=n+1;break}i["default"]||i.defaulttrack||"default"===i._id?e=n+1:i.autoselect}g(e)}function g(e){w.length?r.setVideoSubtitleTrack(e,w):r.set("captionsIndex",e)}r.on("change:playlistItem",a,this),r.on("change:captionsIndex",d,this),r.on("itemReady",s,this),r.mediaController.on("subtitlesTracks",o,this);var m={},w=[],v={},y={},j=0;this.getCurrentIndex=function(){return r.get("captionsIndex")},this.getCaptionsList=function(){return r.get("captionsList")},this.setCaptionsList=function(e){r.set("captionsList",e)}};return i}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(67),n(170),n(1),n(167),n(168),n(31),n(175),n(72),n(71),n(2),n(95),n(3),n(41),n(6),n(4),n(203)],r=function(e,t,n,i,r,o,a,s,l,u,c,d,p,h,f,g){function m(e){return function(){var t=Array.prototype.slice.call(arguments,0);this._model.getVideo()?this["_"+e].apply(this,t):this.eventsQueue.push([e,t])}}function w(e){return e===h.LOADING||e===h.STALLED?h.BUFFERING:e}var v=function(e){this.originalContainer=this.currentContainer=e,this.eventsQueue=[],n.extend(this,d),this._model=new o};return v.prototype={play:m("play"),pause:m("pause"),seek:m("seek"),stop:m("stop"),load:m("load"),playlistNext:m("next"),playlistPrev:m("prev"),playlistItem:m("item"),setCurrentCaptions:m("setCurrentCaptions"),setCurrentQuality:m("setCurrentQuality"),setFullscreen:m("setFullscreen"),setup:function(o,d){function g(e,t){oe.triggerAfterReady(e,t)}function m(){Z=null,Q.on("all",g,oe),oe.showView(Q.element()),n.defer(v)}function v(){oe.trigger(f.JWPLAYER_READY,{setupTime:0}),oe.triggerAfterReady=oe.trigger;for(var e=0;e<ue.length;e++){var t=ue[e];oe.trigger(t.type,t.args)}var n=d.getPlugin("related");n&&n.on("nextUp",ne.setNextUp,ne),ne.get("autostart")&&oe.play({reason:"autostart"})}function y(e){var t=ne.getProviders(),n=t.required(e,ne.get("primary"));return t.load(n).then(function(){oe.getProvider()||(ne.setProvider(ne.get("playlistItem")),j())})}function j(){for(;oe.eventsQueue.length>0;){var e=oe.eventsQueue.shift(),t=e[0],n=e[1]||[];oe["_"+t].apply(oe,n)}}function b(e){switch(ne.get("state")===h.ERROR&&ne.set("state",h.IDLE),_(!0),ne.get("autostart")&&ne.once("itemReady",A),typeof e){case"string":E(e);break;case"object":var t=R(e);t&&I(0);break;case"number":I(e)}}function E(e){var t=new l;t.on(f.JWPLAYER_PLAYLIST_LOADED,function(e){b(e.playlist)}),t.on(f.JWPLAYER_ERROR,function(e){e.message="Error loading playlist: "+e.message,this.triggerError(e)},this),t.load(e)}function k(){return oe._instreamAdapter&&oe._instreamAdapter.getState()}function x(){var e=k();return n.isString(e)?e:ne.get("state")}function A(e){var t;if(e&&ne.set("playReason",e.reason),ne.get("state")!==h.ERROR){var i=k();if(n.isString(i))return d.pauseAd(!1);if(ne.get("state")===h.COMPLETE&&(_(!0),I(0)),!ie&&(ie=!0,oe.trigger(f.JWPLAYER_MEDIA_BEFOREPLAY,{playReason:ne.get("playReason")}),ie=!1,te))return te=!1,void(ee=null);if(C()){if(0===ne.get("playlist").length)return!1;t=u.tryCatch(function(){ne.loadVideo()})}else ne.get("state")===h.PAUSED&&(t=u.tryCatch(function(){ne.playVideo()}));return!(t instanceof u.Error)||(oe.triggerError(t),ee=null,!1)}}function _(e){ne.off("itemReady",A);var t=!e;ee=null;var n=u.tryCatch(function(){ne.stopVideo()},oe);return n instanceof u.Error?(oe.triggerError(n),!1):(t&&(re=!0),ie&&(te=!0),!0)}function L(){ee=null;var e=k();if(n.isString(e))return d.pauseAd(!0);switch(ne.get("state")){case h.ERROR:return!1;case h.PLAYING:case h.BUFFERING:var t=u.tryCatch(function(){ae().pause()},this);if(t instanceof u.Error)return oe.triggerError(t),!1;break;default:ie&&(te=!0)}return!0}function C(){var e=ne.get("state");return e===h.IDLE||e===h.COMPLETE||e===h.ERROR}function T(e){ne.get("state")!==h.ERROR&&(ne.get("scrubbing")||ne.get("state")===h.PLAYING||A(!0),ae().seek(e))}function P(e,t){_(!0),ne.get("state")===h.ERROR&&ne.set("state",h.IDLE),I(e),A(t)}function R(e){var t=s(e);return t=s.filterPlaylist(t,ne.getProviders(),ne.get("androidhls"),ne.get("drm"),ne.get("preload"),ne.get("feedid"),ne.get("withCredentials")),ne.set("playlist",t),n.isArray(t)&&0!==t.length?(y(t),!0):(oe.triggerError({message:"Error loading playlist: No playable sources found"}),!1)}function I(e){ne.setItemIndex(e)}function M(e){P(ne.get("item")-1,e||{reason:"external"})}function S(e){P(ne.get("item")+1,e||{reason:"external"})}function O(){if(C()){if(re)return void(re=!1);ee=O;var e=ne.get("item");return e===ne.get("playlist").length-1?void(ne.get("repeat")?S({reason:"repeat"}):(ne.set("state",h.COMPLETE),oe.trigger(f.JWPLAYER_PLAYLIST_COMPLETE,{}))):void S({reason:"playlist"})}}function D(e){ae()&&(e=parseInt(e,10)||0,ae().setCurrentQuality(e))}function N(){return ae()?ae().getCurrentQuality():-1}function Y(){if(this._model)return this._model.getConfiguration()}function W(){if(this._model.mediaModel)return this._model.mediaModel.get("visualQuality");var e=F();if(e){var t=N(),i=e[t];if(i)return{level:n.extend({index:t},i),mode:"",reason:""}}return null}function F(){return ae()?ae().getQualityLevels():null}function J(e){ae()&&(e=parseInt(e,10)||0,ae().setCurrentAudioTrack(e))}function B(){return ae()?ae().getCurrentAudioTrack():-1}function V(){return ae()?ae().getAudioTracks():null}function z(e){e=parseInt(e,10)||0,ne.persistVideoSubtitleTrack(e),oe.trigger(f.JWPLAYER_CAPTIONS_CHANGED,{tracks:H(),track:e})}function U(){return $.getCurrentIndex()}function H(){return $.getCaptionsList()}function G(){var e=ne.getVideo();if(e){var t=e.detachMedia();if(t instanceof HTMLVideoElement)return t}return null}function K(){var e=u.tryCatch(function(){ne.getVideo().attachMedia()});return e instanceof u.Error?void u.log("Error calling _attachMedia",e):void("function"==typeof ee&&ee())}function X(e){n.isBoolean(e)||(e=!ne.get("fullscreen")),
ne.set("fullscreen",e),this._instreamAdapter&&this._instreamAdapter._adModel&&this._instreamAdapter._adModel.set("fullscreen",e)}function q(){var e=d.getPlugin("related");e&&e.next()}var Q,$,Z,ee,te,ne=this._model,ie=!1,re=!1,oe=this,ae=function(){return ne.getVideo()},se=new a;se.track(ne);var le=new e(o,se),ue=[];ne.setup(le,se),Q=this._view=new c(d,ne),Z=new i(d,ne,Q,R),Z.on(f.JWPLAYER_READY,m,this),Z.on(f.JWPLAYER_SETUP_ERROR,this.setupError,this),ne.mediaController.on("all",g,this),ne.mediaController.on(f.JWPLAYER_MEDIA_COMPLETE,function(){n.defer(O)}),ne.mediaController.on(f.JWPLAYER_MEDIA_ERROR,this.triggerError,this),ne.on("change:flashBlocked",function(e,t){if(!t)return void this._model.set("errorEvent",void 0);var n=!!e.get("flashThrottle"),i={message:n?"Click to run Flash":"Flash plugin failed to load"};n||this.trigger(f.JWPLAYER_ERROR,i),this._model.set("errorEvent",i)},this),ne.on("change:state",p,this),ne.on("change:castState",function(e,t){oe.trigger(f.JWPLAYER_CAST_SESSION,t)}),ne.on("change:fullscreen",function(e,t){oe.trigger(f.JWPLAYER_FULLSCREEN,{fullscreen:t})}),ne.on("itemReady",function(){oe.triggerAfterReady(f.JWPLAYER_PLAYLIST_ITEM,{index:ne.get("item"),item:ne.get("playlistItem")})}),ne.on("change:playlist",function(e,t){t.length&&oe.triggerAfterReady(f.JWPLAYER_PLAYLIST_LOADED,{playlist:t})}),ne.on("change:volume",function(e,t){oe.trigger(f.JWPLAYER_MEDIA_VOLUME,{volume:t})}),ne.on("change:mute",function(e,t){oe.trigger(f.JWPLAYER_MEDIA_MUTE,{mute:t})}),ne.on("change:controls",function(e,t){oe.trigger(f.JWPLAYER_CONTROLS,{controls:t})}),ne.on("change:scrubbing",function(e,t){t?L():A()}),ne.on("change:captionsList",function(e,t){try{oe.triggerAfterReady(f.JWPLAYER_CAPTIONS_LIST,{tracks:t,track:U()})}catch(n){u.log("Error with captionsList event:",n)}}),ne.on("change:mediaModel",function(e){e.mediaModel.on("change:state",function(t,n){var i=w(n);e.set("state",i)})}),$=new r(d,ne),this.triggerAfterReady=function(e,t){ue.push({type:e,args:t})},this._play=A,this._pause=L,this._seek=T,this._stop=_,this._load=b,this._next=S,this._prev=M,this._item=P,this._setCurrentCaptions=z,this._setCurrentQuality=D,this._setFullscreen=X,this.detachMedia=G,this.attachMedia=K,this.getCurrentQuality=N,this.getQualityLevels=F,this.setCurrentAudioTrack=J,this.getCurrentAudioTrack=B,this.getAudioTracks=V,this.getCurrentCaptions=U,this.getCaptionsList=H,this.getVisualQuality=W,this.getConfig=Y,this.getState=x,this.setVolume=ne.setVolume.bind(ne),this.setMute=ne.setMute.bind(ne),this.getProvider=function(){return ne.get("provider")},this.getWidth=function(){return ne.get("containerWidth")},this.getHeight=function(){return ne.get("containerHeight")},this.getContainer=function(){return this.currentContainer},this.resize=Q.resize,this.getSafeRegion=Q.getSafeRegion,this.setCues=Q.addCues,this.setCaptions=Q.setCaptions,this.next=q,this.addButton=function(e,t,i,r,o){var a={img:e,tooltip:t,callback:i,id:r,btnClass:o},s=ne.get("dock");s=s?s.slice(0):[],s=n.reject(s,n.matches({id:a.id})),s.push(a),ne.set("dock",s)},this.removeButton=function(e){var t=ne.get("dock")||[];t=n.reject(t,n.matches({id:e})),ne.set("dock",t)},this.checkBeforePlay=function(){return ie},this.getItemQoe=function(){return ne._qoeItem},this.setControls=function(e){n.isBoolean(e)||(e=!ne.get("controls")),ne.set("controls",e);var t=ne.getVideo();t&&t.setControls(e)},this.playerDestroy=function(){this.stop(),this.showView(this.originalContainer),Q&&Q.destroy(),ne&&ne.destroy(),Z&&(Z.destroy(),Z=null)},this.isBeforePlay=this.checkBeforePlay,this.isBeforeComplete=function(){return ne.getVideo().checkComplete()},this.createInstream=function(){return this.instreamDestroy(),this._instreamAdapter=new t(this,ne,Q),this._instreamAdapter},this.skipAd=function(){this._instreamAdapter&&this._instreamAdapter.skipAd()},this.instreamDestroy=function(){oe._instreamAdapter&&oe._instreamAdapter.destroy()},Z.start()},showView:function(e){(document.documentElement.contains(this.currentContainer)||(this.currentContainer=document.getElementById(this._model.get("id")),this.currentContainer))&&(this.currentContainer.parentElement&&this.currentContainer.parentElement.replaceChild(e,this.currentContainer),this.currentContainer=e)},triggerError:function(e){this._model.set("errorEvent",e),this._model.set("state",h.ERROR),this._model.once("change:state",function(){this._model.set("errorEvent",void 0)},this),this.trigger(f.JWPLAYER_ERROR,e)},setupError:function(e){var t=e.message,i=u.createElement(g(this._model.get("id"),this._model.get("skin"),t)),r=this._model.get("width"),o=this._model.get("height");u.style(i,{width:r.toString().indexOf("%")>0?r:r+"px",height:o.toString().indexOf("%")>0?o:o+"px"}),this.showView(i);var a=this;n.defer(function(){a.trigger(f.JWPLAYER_SETUP_ERROR,{message:t})})}},v}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(172),n(171),n(4),n(6),n(2),n(3),n(1)],r=function(e,t,n,i,r,o,a){function s(n){var i="",r=n.get("provider");return r&&(i=r.name),i.indexOf("flash")>=0?t:e}var l={skipoffset:null,tag:null},u=function(e,o,u){function c(){y._adModel.set("state","buffering"),o.set("skipButton",!1),j++;var e,t=h[j];f&&(e=f[j]),E.loadItem(t,e)}function d(e,t){"complete"!==e&&(t=t||{},b.tag&&!t.tag&&(t.tag=b.tag),this.trigger(e,t),"mediaError"!==e&&"error"!==e||h&&j+1<h.length&&c())}function p(e){y._adModel.set("duration",e.duration),y._adModel.set("position",e.position)}var h,f,g,m,w,v=s(o),y=new v(e,o),j=0,b={},E=this,k=a.bind(function(e){e=e||{},e.hasControls=!!o.get("controls"),this.trigger(n.JWPLAYER_INSTREAM_CLICK,e),y&&y._adModel&&(y._adModel.get("state")===i.PAUSED?e.hasControls&&y.instreamPlay():y.instreamPause())},this),x=a.bind(function(){y&&y._adModel&&y._adModel.get("state")===i.PAUSED&&o.get("controls")&&(e.setFullscreen(),e.play())},this);this.type="instream",this.init=function(){g=o.getVideo(),m=o.get("position"),w=o.get("playlist")[o.get("item")],y.on("all",d,this),y.on(n.JWPLAYER_MEDIA_TIME,p,this),y.on(n.JWPLAYER_MEDIA_COMPLETE,A,this),y.init(),g.detachMedia(),o.mediaModel.set("state",i.BUFFERING),e.checkBeforePlay()||0===m&&!g.checkComplete()?(m=0,o.set("preInstreamState","instream-preroll")):g&&g.checkComplete()||o.get("state")===i.COMPLETE?o.set("preInstreamState","instream-postroll"):o.set("preInstreamState","instream-midroll");var t=o.get("state");return t!==i.PLAYING&&t!==i.BUFFERING||g.pause(),u.setupInstream(y._adModel),y._adModel.set("state",i.BUFFERING),u.clickHandler().setAlternateClickHandlers(r.noop,null),this.setText(o.get("localization").loadingAd),this};var A=function(e){var t={};b.tag&&(t.tag=b.tag),h&&j+1<h.length?(this.trigger(n.JWPLAYER_MEDIA_COMPLETE,t),c()):(e.type===n.JWPLAYER_MEDIA_COMPLETE&&(this.trigger(n.JWPLAYER_MEDIA_COMPLETE,t),this.trigger(n.JWPLAYER_PLAYLIST_COMPLETE,{})),this.destroy())};this.loadItem=function(e,i){if(r.isAndroid(2.3))return void this.trigger({type:n.JWPLAYER_ERROR,message:"Error loading instream: Cannot play instream on Android 2.3"});var s=e;a.isArray(e)?(h=e,f=i,e=h[j],f&&(i=f[j])):s=[e];var u=this,c=o.getProviders(),d=v===t?"flash":void 0,p=c.required(s,d);o.set("hideAdsControls",!1),c.load(p).then(function(){if(null!==y){u.trigger(n.JWPLAYER_PLAYLIST_ITEM,{index:j,item:e}),b=a.extend({},l,i),y.load(e),u.addClickHandler();var t=e.skipoffset||b.skipoffset;t&&u.setupSkipButton(t,b)}})},this.setupSkipButton=function(e,t,n){o.set("skipButton",!1),n&&(A=n),y._adModel.set("skipMessage",t.skipMessage),y._adModel.set("skipText",t.skipText),y._adModel.set("skipOffset",e),o.set("skipButton",!0)},this.applyProviderListeners=function(e){y.applyProviderListeners(e),this.addClickHandler()},this.play=function(){y.instreamPlay()},this.pause=function(){y.instreamPause()},this.addClickHandler=function(){u.clickHandler().setAlternateClickHandlers(k,x),y.on(n.JWPLAYER_MEDIA_META,this.metaHandler,this)},this.skipAd=function(e){var t=n.JWPLAYER_AD_SKIPPED;this.trigger(t,e),A.call(this,{type:t})},this.metaHandler=function(e){e.width&&e.height&&u.resizeMedia()},this.destroy=function(){if(this.off(),o.set("skipButton",!1),y){u.clickHandler()&&u.clickHandler().revertAlternateClickHandlers(),o.off(null,null,y),y.instreamDestroy(),u.destroyInstream(),y=null,e.attachMedia();var t=o.get("preInstreamState");switch(t){case"instream-preroll":case"instream-midroll":var n=a.extend({},w);n.starttime=m,o.loadVideo(n),r.isMobile()&&o.mediaModel.get("state")===i.BUFFERING&&g.setState(i.BUFFERING),g.play();break;case"instream-postroll":case"instream-idle":g.stop()}}},this.getState=function(){return!(!y||!y._adModel)&&y._adModel.get("state")},this.setText=function(e){u.setAltText(e?e:"")},this.hide=function(){o.set("hideAdsControls",!0)}};return a.extend(u.prototype,o),u}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(3),n(31),n(41),n(4),n(6),n(2),n(1)],r=function(e,t,n,i,r,o,a){var s=function(e,i){this.model=i,this._adModel=(new t).setup({id:i.get("id"),volume:i.get("volume"),fullscreen:i.get("fullscreen"),mute:i.get("mute")}),this._adModel.on("change:state",n,this);var r=e.getContainer();this.swf=r.querySelector("object")};return s.prototype=a.extend({init:function(){if(o.isChrome()){var e=-1,t=!1;this.swf.on("throttle",function(n){if(clearTimeout(e),"resume"===n.state)t&&(t=!1,this.instreamPlay());else{var i=this;e=setTimeout(function(){i._adModel.get("state")===r.PLAYING&&(t=!0,i.instreamPause())},250)}},this)}this.swf.on("instream:state",this.stateHandler,this).on("instream:time",function(e){this._adModel.set("position",e.position),this._adModel.set("duration",e.duration),this.trigger(i.JWPLAYER_MEDIA_TIME,e)},this).on("instream:complete",function(e){this.trigger(i.JWPLAYER_MEDIA_COMPLETE,e)},this).on("instream:error",function(e){this.trigger(i.JWPLAYER_MEDIA_ERROR,e)},this),this.swf.triggerFlash("instream:init"),this.applyProviderListeners=function(e){this.model.on("change:volume",function(t,n){e.volume(n)},this),this.model.on("change:mute",function(t,n){e.mute(n)},this),e.volume(this.model.get("volume")),e.mute(this.model.get("mute")),e.off(),e.on(i.JWPLAYER_PLAYER_STATE,this.stateHandler,this),e.on(i.JWPLAYER_MEDIA_TIME,function(e){this.trigger(i.JWPLAYER_MEDIA_TIME,e)},this)}},stateHandler:function(e){switch(e.newstate){case r.PLAYING:case r.PAUSED:this._adModel.set("state",e.newstate)}},instreamDestroy:function(){this._adModel&&(this.off(),this.swf.off(null,null,this),this.swf.triggerFlash("instream:destroy"),this.swf=null,this._adModel.off(),this._adModel=null,this.model=null)},load:function(e){this.swf.triggerFlash("instream:load",e)},instreamPlay:function(){this.swf.triggerFlash("instream:play")},instreamPause:function(){this.swf.triggerFlash("instream:pause")}},e),s}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(3),n(41),n(4),n(6),n(31)],r=function(e,t,n,i,r,o){var a=function(a,s){function l(t){var r=t||p.getVideo();if(h!==r){if(h=r,!r)return;r.off(),r.on("all",function(t,n){n=e.extend({},n,{type:t}),this.trigger(t,n)},f),r.on(i.JWPLAYER_MEDIA_BUFFER_FULL,d),r.on(i.JWPLAYER_PLAYER_STATE,u),r.attachMedia(),r.volume(s.get("volume")),r.mute(s.get("mute")),p.on("change:state",n,f)}}function u(e){switch(e.newstate){case r.PLAYING:case r.PAUSED:p.set("state",e.newstate)}}function c(e){s.trigger(e.type,e),f.trigger(i.JWPLAYER_FULLSCREEN,{fullscreen:e.jwstate})}function d(){p.getVideo().play()}var p,h,f=e.extend(this,t);return a.on(i.JWPLAYER_FULLSCREEN,function(e){this.trigger(i.JWPLAYER_FULLSCREEN,e)},f),this.init=function(){p=(new o).setup({id:s.get("id"),volume:s.get("volume"),fullscreen:s.get("fullscreen"),mute:s.get("mute"),instreamMode:!0}),p.on("fullscreenchange",c),this._adModel=p},f.load=function(e){p.set("item",0),p.set("playlistItem",e),p.setActiveItem(e),l(),p.off(i.JWPLAYER_ERROR),p.on(i.JWPLAYER_ERROR,function(e){this.trigger(i.JWPLAYER_ERROR,e)},f),p.loadVideo(e)},f.applyProviderListeners=function(e){l(e),e.off(i.JWPLAYER_ERROR),e.on(i.JWPLAYER_ERROR,function(e){this.trigger(i.JWPLAYER_ERROR,e)},f),s.on("change:volume",function(e,t){h.volume(t)},f),s.on("change:mute",function(e,t){h.mute(t)},f)},this.instreamDestroy=function(){p&&(p.off(),this.off(),h&&(h.detachMedia(),h.off(),p.getVideo()&&h.destroy()),p=null,a.off(null,null,this),a=null)},f.instreamPlay=function(){p.getVideo()&&p.getVideo().play(!0)},f.instreamPause=function(){p.getVideo()&&p.getVideo().pause(!0)},f};return a}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(82),n(4),n(1)],r=function(e,t,n){function i(e){e.mediaController.off(t.JWPLAYER_MEDIA_PLAY_ATTEMPT,e._onPlayAttempt),e.mediaController.off(t.JWPLAYER_PROVIDER_FIRST_FRAME,e._triggerFirstFrame),e.mediaController.off(t.JWPLAYER_MEDIA_TIME,e._onTime)}function r(e){i(e),e._triggerFirstFrame=n.once(function(){var n=e._qoeItem;n.tick(t.JWPLAYER_MEDIA_FIRST_FRAME);var r=n.between(t.JWPLAYER_MEDIA_PLAY_ATTEMPT,t.JWPLAYER_MEDIA_FIRST_FRAME);e.mediaController.trigger(t.JWPLAYER_MEDIA_FIRST_FRAME,{loadTime:r}),i(e)}),e._onTime=a(e._triggerFirstFrame),e._onPlayAttempt=function(){e._qoeItem.tick(t.JWPLAYER_MEDIA_PLAY_ATTEMPT)},e.mediaController.on(t.JWPLAYER_MEDIA_PLAY_ATTEMPT,e._onPlayAttempt),e.mediaController.once(t.JWPLAYER_PROVIDER_FIRST_FRAME,e._triggerFirstFrame),e.mediaController.on(t.JWPLAYER_MEDIA_TIME,e._onTime)}function o(n){function i(n,i,o){n._qoeItem&&o&&n._qoeItem.end(o.get("state")),n._qoeItem=new e,n._qoeItem.tick(t.JWPLAYER_PLAYLIST_ITEM),n._qoeItem.start(i.get("state")),r(n),i.on("change:state",function(e,t,i){n._qoeItem.end(i),n._qoeItem.start(t)})}n.on("change:mediaModel",i)}var a=function(e){var t=0;return function(n){var i=n.position;i>t&&e(),t=i}};return{model:o}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(25),n(71),n(19),n(27),n(1),n(2),n(4)],r=function(e,t,i,r,o,a,s){function l(){var e={LOAD_PROMISE_POLYFILL:{method:u,depends:[]},LOAD_BASE64_POLYFILL:{method:c,depends:[]},LOADED_POLYFILLS:{method:d,depends:["LOAD_PROMISE_POLYFILL","LOAD_BASE64_POLYFILL"]},LOAD_PLUGINS:{method:p,depends:["LOADED_POLYFILLS"]},INIT_PLUGINS:{method:h,depends:["LOAD_PLUGINS","SETUP_VIEW"]},LOAD_SKIN:{method:j,depends:["LOADED_POLYFILLS"]},LOAD_PLAYLIST:{method:g,depends:["LOADED_POLYFILLS"]},FILTER_PLAYLIST:{method:m,depends:["LOAD_PLAYLIST"]},SETUP_VIEW:{method:b,depends:["LOAD_SKIN"]},SET_ITEM:{method:E,depends:["INIT_PLUGINS","FILTER_PLAYLIST"]},SEND_READY:{method:k,depends:["SETUP_VIEW","SET_ITEM"]}};return e}function u(e){window.Promise?e():n.e(8,function(require){n(76),e()})}function c(e){window.btoa&&window.atob?e():n.e(9,function(require){n(75),e()})}function d(e){e()}function p(t,n){window.jwplayerPluginJsonp=e.registerPlugin,A=e.loadPlugins(n.get("id"),n.get("plugins")),A.on(s.COMPLETE,t),A.on(s.ERROR,o.partial(f,t)),A.load()}function h(e,t,n){delete window.jwplayerPluginJsonp,A.setupPlugins(n,t),e()}function f(e,t){x(e,"Could not load plugin",t.message)}function g(e,n){var i=n.get("playlist");o.isString(i)?(_=new t,_.on(s.JWPLAYER_PLAYLIST_LOADED,function(t){n.set("playlist",t.playlist),n.set("feedid",t.feedid),e()}),_.on(s.JWPLAYER_ERROR,o.partial(w,e)),_.load(i)):e()}function m(e,t,n,i,r){var o=t.get("playlist"),a=r(o);a?e():w(e)}function w(e,t){t&&t.message?x(e,"Error loading playlist",t.message):x(e,"Error loading player","No playable sources found")}function v(e,t){if(o.contains(r.SkinsLoadable,e))return t+"skins/"+e+".css"}function y(e){for(var t=document.styleSheets,n=0,i=t.length;n<i;n++)if(t[n].href===e)return!0;return!1}function j(e,t){var n=t.get("skin"),a=t.get("skinUrl");if(o.contains(r.SkinsIncluded,n))return void e();if(a||(a=v(n,t.get("base"))),o.isString(a)&&!y(a)){t.set("skin-loading",!0);var l=!0,u=new i(a,l);u.addEventListener(s.COMPLETE,function(){t.set("skin-loading",!1)}),u.addEventListener(s.ERROR,function(){t.set("skin","seven"),t.set("skin-loading",!1)}),u.load()}o.defer(function(){e()})}function b(e,t,n,i){i.setup(),e()}function E(e,t){t.once("itemReady",e),t.setItemIndex(t.get("item"))}function k(e){e({type:"complete"})}function x(e,t,n){e({type:"error",msg:t,reason:n})}var A,_;return{getQueue:l,error:x}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(2)],r=function(e,t){function n(e){return"jwplayer."+e}function i(){return e.reduce(this.persistItems,function(e,i){var r=l[n(i)];return r&&(e[i]=t.serialize(r)),e},{})}function r(e,t){try{l[n(e)]=t}catch(i){var r=window.jwplayer;r&&r.debug&&console.error(i)}}function o(){e.each(this.persistItems,function(e){l.removeItem(n(e))})}function a(){this.persistItems=["volume","mute","captionLabel","qualityLabel"]}function s(t){e.each(this.persistItems,function(e){t.on("change:"+e,function(t,n){r(e,n)})})}var l={removeItem:t.noop};try{l=window.localStorage}catch(u){}return e.extend(a.prototype,{getAllItems:i,track:s,clear:o}),a}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(88),n(2)],r=function(e,t){return n.p=t.loadFrom(),e.selectPlayer}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(8)],r=function(e){function t(e){e||n()}function n(){throw new Error("Invalid DFXP file")}var i=e.seconds;return function(r){t(r);var o=[],a=r.getElementsByTagName("p"),s=30,l=r.getElementsByTagName("tt");if(l&&l[0]){var u=parseFloat(l[0].getAttribute("ttp:frameRate"));isNaN(u)||(s=u)}t(a),a.length||(a=r.getElementsByTagName("tt:p"),a.length||(a=r.getElementsByTagName("tts:p")));for(var c=0;c<a.length;c++){for(var d=a[c],p=d.getElementsByTagName("br"),h=0;h<p.length;h++){var f=p[h];f.parentNode.replaceChild(r.createTextNode("\r\n"),f)}var g=d.innerHTML||d.textContent||d.text||"",m=e.trim(g).replace(/>\s+</g,"><").replace(/(<\/?)tts?:/g,"$1").replace(/<br.*?\/>/g,"\r\n");if(m){var w=d.getAttribute("begin"),v=d.getAttribute("dur"),y=d.getAttribute("end"),j={begin:i(w,s),text:m};y?j.end=i(y,s):v&&(j.end=j.begin+i(v,s)),o.push(j)}}return o.length||n(),o}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(24),n(8),n(2)],r=function(e,t,n){var i="jwplayer",r=function(r,o){for(var a=[],s=[],l=t.xmlAttribute,u="default",c="label",d="file",p="type",h=0;h<r.childNodes.length;h++){var f=r.childNodes[h];if(f.prefix===i){var g=e.localName(f);"source"===g?(delete o.sources,a.push({file:l(f,d),"default":l(f,u),label:l(f,c),type:l(f,p)})):"track"===g?(delete o.tracks,s.push({file:l(f,d),"default":l(f,u),kind:l(f,"kind"),label:l(f,c)})):(o[g]=n.serialize(e.textContent(f)),"file"===g&&o.sources&&delete o.sources)}o[d]||(o[d]=o.link)}if(a.length)for(o.sources=[],h=0;h<a.length;h++)a[h].file.length>0&&(a[h][u]="true"===a[h][u],a[h].label.length||delete a[h].label,o.sources.push(a[h]));if(s.length)for(o.tracks=[],h=0;h<s.length;h++)s[h].file.length>0&&(s[h][u]="true"===s[h][u],s[h].kind=s[h].kind.length?s[h].kind:"captions",s[h].label.length||delete s[h].label,o.tracks.push(s[h]));return o};return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(24),n(8),n(2)],r=function(e,t,n){function i(e){for(var t=[],n=0;n<s(e);n++){var i=e.childNodes[n];"jwplayer"===i.prefix&&"mediatypes"===o(i).toLowerCase()&&t.push(a(i))}return t}var r=t.xmlAttribute,o=e.localName,a=e.textContent,s=e.numChildren,l="media",u=function(e,t){function c(e){var t={zh:"Chinese",nl:"Dutch",en:"English",fr:"French",de:"German",it:"Italian",ja:"Japanese",pt:"Portuguese",ru:"Russian",es:"Spanish"};return t[e]?t[e]:e}var d,p,h="tracks",f=[];for(p=0;p<s(e);p++)if(d=e.childNodes[p],d.prefix===l){if(!o(d))continue;switch(o(d).toLowerCase()){case"content":if(r(d,"duration")&&(t.duration=n.seconds(r(d,"duration"))),r(d,"url")){t.sources||(t.sources=[]);var g={file:r(d,"url"),type:r(d,"type"),width:r(d,"width"),label:r(d,"label")},m=i(d);m.length&&(g.mediaTypes=m),t.sources.push(g)}s(d)>0&&(t=u(d,t));break;case"title":t.title=a(d);break;case"description":t.description=a(d);break;case"guid":t.mediaid=a(d);break;case"thumbnail":t.image||(t.image=r(d,"url"));break;case"player":break;case"group":u(d,t);break;case"subtitle":var w={};w.file=r(d,"url"),w.kind="captions",r(d,"lang").length>0&&(w.label=c(r(d,"lang"))),f.push(w)}}for(t.hasOwnProperty(h)||(t[h]=[]),p=0;p<f.length;p++)t[h].push(f[p]);return t};return u}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1)],r=function(e){var t={kind:"captions","default":!1},n=function(n){if(n&&n.file)return e.extend({},t,n)};return n}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(32),n(2),n(4),n(3),n(1),n(19)],r=function(e,t,n,i,r,o){function a(e,t,n){return function(){var i=e.getContainer().getElementsByClassName("jw-overlays")[0];i&&(i.appendChild(n),n.left=i.style.left,n.top=i.style.top,t.displayArea=i)}}function s(e){function t(){var t=e.displayArea;t&&e.resize(t.clientWidth,t.clientHeight)}return function(){t(),setTimeout(t,400)}}var l=function(l,u){function c(){m||(m=!0,g=o.loaderstatus.COMPLETE,f.trigger(n.COMPLETE))}function d(){if(!v&&(u&&0!==r.keys(u).length||c(),!m)){var i=l.getPlugins();h=r.after(w,c),r.each(u,function(r,a){var s=e.getPluginName(a),l=i[s],u=l.getJS(),c=l.getTarget(),d=l.getStatus();d!==o.loaderstatus.LOADING&&d!==o.loaderstatus.NEW&&(u&&!t.versionCheck(c)&&f.trigger(n.ERROR,{message:"Incompatible player version"}),h())})}}function p(e){if(!v){var i="File not found";e.url&&t.log(i,e.url),this.off(),this.trigger(n.ERROR,{message:i}),d()}}var h,f=r.extend(this,i),g=o.loaderstatus.NEW,m=!1,w=r.size(u),v=!1;this.setupPlugins=function(n,i){var o=[],u=l.getPlugins(),c=i.get("plugins");r.each(c,function(i,l){var d=e.getPluginName(l),p=u[d],h=p.getFlashPath(),f=p.getJS(),g=p.getURL();if(h){var m=r.extend({name:d,swf:h,pluginmode:p.getPluginmode()},i);o.push(m)}var w=t.tryCatch(function(){if(f){var e=c[g];if(!e)return void t.log("JW Plugin already loaded",d,g);var i=document.createElement("div");i.id=n.id+"_"+d,i.className="jw-plugin jw-reset";var o=r.extend({},e),l=p.getNewInstance(n,o,i);l.addToPlayer=a(n,l,i),l.resizeHandler=s(l),n.addPlugin(d,l,i)}});w instanceof t.Error&&t.log("ERROR: Failed to load "+d+".")}),i.set("flashPlugins",o)},this.load=function(){if(t.exists(u)&&"object"!==t.typeOf(u))return void d();g=o.loaderstatus.LOADING,r.each(u,function(e,i){if(t.exists(i)){var r=l.addPlugin(i);r.on(n.COMPLETE,d),r.on(n.ERROR,p)}});var e=l.getPlugins();r.each(e,function(e){e.load()}),d()},this.destroy=function(){v=!0,this.off()},this.getStatus=function(){return g}};return l}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(32),n(74)],r=function(e,t){var n=function(n){this.addPlugin=function(i){var r=e.getPluginName(i);return n[r]||(n[r]=new t(i)),n[r]},this.getPlugins=function(){return n}};return n}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){var i,r;i=[],r=function(){return{}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(1),n(83)],r=function(e,t,n){function i(t){if("hls"===t.type)if(t.androidhls!==!1){var n=e.isAndroidNative;if(n(2)||n(3)||n("4.0"))return!1;if(e.isAndroid())return!0}else if(e.isAndroid())return!1;return null}var r=[{name:"youtube",supports:function(t){return e.isYouTube(t.file,t.type)}},{name:"html5",supports:function(t){var r={aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"},o=t.file,a=t.type,s=i(t);if(null!==s)return s;if(e.isRtmp(o,a))return!1;if(!r[a])return!1;if(n.canPlayType){var l=n.canPlayType(r[a]);return!!l}return!1}},{name:"flash",supports:function(n){var i={flv:"video",f4v:"video",mov:"video",m4a:"video",m4v:"video",mp4:"video",aac:"video",f4a:"video",mp3:"sound",mpeg:"sound",smil:"rtmp"},r=t.keys(i);if(!e.isFlashSupported())return!1;var o=n.file,a=n.type;return!!e.isRtmp(o,a)||t.contains(r,a)}}];return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(17),n(52),n(184),n(1)],r=function(e,t,i,r){function o(e){this.config=e||{},this.providers=this.reorderProviders(this.config.primary)}o.loaders={html5:function(e){n.e(4,function(require){var t=n(91);a(t),e(t)})},flash:function(e){n.e(5,function(require){var t=n(78);a(t),e(t)})},youtube:function(e){n.e(6,function(require){var t=n(79);a(t),e(t)})}};var a=o.registerProvider=function(n){var o=n.getName().name;if(!i[o]){if(!r.find(t,r.matches({name:o}))){if(!r.isFunction(n.supports))throw{message:"Tried to register a provider with an invalid object"};t.unshift({name:o,supports:n.supports})}var a=function(){};a.prototype=e,n.prototype=new a,i[o]=n}};return r.extend(o.prototype,{load:function(e){return Promise.all(r.map(e,function(e){return new Promise(function(t){var n=o.loaders[e.name];n?n(t):t()})}))},reorderProviders:function(e){var n=r.clone(t);if("flash"===e){var i=r.indexOf(n,r.findWhere(n,{name:"flash"})),o=n.splice(i,1)[0],a=r.indexOf(n,r.findWhere(n,{name:"html5"}));n.splice(a,0,o)}return n},providerSupports:function(e,t){return e.supports(t)},required:function(e,t){var n=this,i=this.reorderProviders(t);return e=e.slice(),r.compact(r.map(i,function(t){for(var i=!1,r=e.length;r--;){var o=e[r],a=n.providerSupports(t,o.sources[0]);a&&e.splice(r,1),i=i||a}if(i)return t}))},choose:function(e){e=r.isObject(e)?e:{};for(var t=this.providers.length,n=0;n<t;n++){var o=this.providers[n];if(this.providerSupports(o,e)){var a=t-n-1;return{priority:a,name:o.name,type:e.type,providerToCheck:o,provider:i[o.name]}}}return null}}),o}.apply(t,i),!(void 0!==r&&(e.exports=r))},,function(e,t,n){var i,r;i=[],r=function(){return{hasClass:function(e,t){var n=" "+t+" ";return 1===e.nodeType&&(" "+e.className+" ").replace(/[\t\r\n\f]/g," ").indexOf(n)>=0}}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(3)],r=function(e,t){var n=e.extend({get:function(e){return this.attributes=this.attributes||{},this.attributes[e]},set:function(e,t){if(this.attributes=this.attributes||{},this.attributes[e]!==t){var n=this.attributes[e];this.attributes[e]=t,this.trigger("change:"+e,this,t,n)}},clone:function(){return e.clone(this.attributes)}},t);return n}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){var e=function(e,n,i){n=n||this,i=i||[];var r=window.jwplayer;if(r&&r.debug)return e.apply(n,i);try{return e.apply(n,i)}catch(o){return new t(e.name,o)}},t=function(e,t){this.name=e,this.message=t.message||t.toString(),this.error=t};return{tryCatch:e,Error:t}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(1)],r=function(e){return function(t,n,i){var r="jw-breakpoint-",o=n,a=i;r+=o>=1280?"7":o>=960?"6":o>=800?"5":o>=640?"4":o>=540?"3":o>=420?"2":o>=320?"1":"0",e.replaceClass(t,/jw-breakpoint-\d+/,r),e.toggleClass(t,"jw-orientation-portrait",a>o)}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(28),n(6),n(1),n(16)],r=function(e,t,i,r,o){var a=t.style,s={back:!0,fontSize:14,fontFamily:"Arial,sans-serif",fontOpacity:100,color:"#FFF",backgroundColor:"#000",backgroundOpacity:100,edgeStyle:null,windowColor:"#FFF",windowOpacity:0,preprocessor:r.identity},l=function(l){function u(e,n,i){if(t.css("#"+e+" .jw-text-track-display",n,e),t.css("#"+e+" .jw-text-track-cue",i,e),t.css("#"+e+" .jw-video::-webkit-media-text-track-display",n,e),t.css("#"+e+" .jw-video::cue",i,e),i.backgroundColor){var r="{background-color: "+i.backgroundColor+" !important;}";t.css("#"+e+" .jw-video::-webkit-media-text-track-display-backdrop",r,e)}}function c(e,n,i){var r=t.hexToRgba("#000000",i);"dropshadow"===e?n.textShadow="0 2px 1px "+r:"raised"===e?n.textShadow="0 0 5px "+r+", 0 1px 5px "+r+", 0 2px 5px "+r:"depressed"===e?n.textShadow="0 -2px 1px "+r:"uniform"===e&&(n.textShadow="-2px 0 1px "+r+",2px 0 1px "+r+",0 -2px 1px "+r+",0 2px 1px "+r+",-1px 1px 1px "+r+",1px 1px 1px "+r+",1px -1px 1px "+r+",1px 1px 1px "+r)}function d(e){g=e,this.selectCues(h,g)}function p(){o.renderNatively(l.get("provider").name)||n.e(7,function(require){y=n(77)})}var h,f,g,m,w,v,y,j={};m=document.createElement("div"),m.className="jw-captions jw-reset",this.show=function(){m.className="jw-captions jw-captions-enabled jw-reset"},this.hide=function(){m.className="jw-captions jw-reset"},this.populate=function(e){return f=[],h=e,e?void this.selectCues(e,g):(f=[],void this.renderCues())},this.resize=function(){var e=m.clientWidth,t=Math.pow(e/400,.6);if(t){var n=j.fontSize*t;a(m,{fontSize:Math.floor(2*n)/2+"px"})}this.renderCues(!0)},this.renderCues=function(e){e=!!e,y&&y.WebVTT.processCues(window,f,m,e)},this.selectCues=function(e,t){var n,i;e&&e.data&&t&&(i=this.getAlignmentPosition(e,t),i!==!1&&(n=this.getCurrentCues(e.data,i),this.updateCurrentCues(n),this.renderCues(!0)))},this.getCurrentCues=function(e,t){return r.filter(e,function(e){return t>=e.startTime&&(!e.endTime||t<=e.endTime)})},this.updateCurrentCues=function(e){return e.length?r.difference(e,f).length&&(w.className="jw-captions-window jw-reset jw-captions-window-active",f=e):f=[],f},this.getAlignmentPosition=function(e,t){var n=e.source,i=t.metadata;return n?!(!i||!r.isNumber(i[n]))&&i[n]:e.embedded&&t.duration<0?t.position-t.duration:t.position},this.clear=function(){e.empty(m)},this.setContainerHeight=function(e){a(m,{height:e})},this.setup=function(e,n){w=document.createElement("div"),v=document.createElement("span"),w.className="jw-captions-window jw-reset",v.className="jw-captions-text jw-reset",j=r.extend({},s,n);var i=j.fontOpacity,o=j.windowOpacity,d=j.edgeStyle,p=j.backgroundColor,h={},f={color:t.hexToRgba(j.color,i),fontFamily:j.fontFamily,fontStyle:j.fontStyle,fontWeight:j.fontWeight,textDecoration:j.textDecoration};o&&(h.backgroundColor=t.hexToRgba(j.windowColor,o)),c(d,f,i),j.back?f.backgroundColor=t.hexToRgba(p,j.backgroundOpacity):null===d&&c("uniform",f),a(w,h),a(v,f),u(e,h,f),w.appendChild(v),m.appendChild(w),this.populate(l.get("captionsTrack")),l.set("captions",j)},this.element=function(){return m},l.on("change:playlistItem",function(){g=null,f=[]},this),l.on("change:captionsTrack",function(e,t){this.populate(t)},this),l.mediaController.on("seek",function(){f=[]},this),l.mediaController.on("time seek",d,this),l.mediaController.on("subtitlesTrackData",function(){this.selectCues(h,g)},this),l.on("change:state",function(e,t){switch(t){case i.IDLE:case i.ERROR:case i.COMPLETE:this.hide();break;default:this.show()}},this),l.on("itemReady",p,this)};return l}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(9),n(4),n(3),n(1)],r=function(e,t,n,i){var r=function(r,o,a){function s(e){if(!r.get("flashBlocked"))return c?void c(e):void f.trigger(e.type===t.touchEvents.CLICK?"click":"tap")}function l(){return d?void d():void f.trigger("doubleClick")}var u,c,d,p={enableDoubleTap:!0,useMove:!0};i.extend(this,n),u=o,this.element=function(){return u};var h=new e(u,i.extend(p,a));h.on("click tap",s),h.on("doubleClick doubleTap",l),h.on("move",function(){f.trigger("move")}),h.on("over",function(){f.trigger("over")}),h.on("out",function(){f.trigger("out")}),this.clickHandler=s;var f=this;this.setAlternateClickHandlers=function(e,t){c=e,d=t||null},this.revertAlternateClickHandlers=function(){c=null,d=null}};return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(2),n(42)],r=function(e,t,n){function i(e,t){this.time=e,this.text=t,this.el=document.createElement("div"),this.el.className="jw-cue jw-reset"}e.extend(i.prototype,{align:function(e){if("%"===this.time.toString().slice(-1))this.pct=this.time;else{var t=this.time/e*100;this.pct=t+"%"}this.el.style.left=this.pct}});var r={loadChapters:function(e){t.ajax(e,this.chaptersLoaded.bind(this),this.chaptersFailed,{plainText:!0})},chaptersLoaded:function(t){var i=n(t.responseText);e.isArray(i)&&(e.each(i,this.addCue,this),this.drawCues())},chaptersFailed:function(){},addCue:function(e){this.cues.push(new i(e.begin,e.text))},drawCues:function(){var t=this._model.mediaModel.get("duration");if(!t||t<=0)return void this._model.mediaModel.once("change:duration",this.drawCues,this);
var n=this;e.each(this.cues,function(e){e.align(t),e.el.addEventListener("mouseover",function(){n.activeCue=e}),e.el.addEventListener("mouseout",function(){n.activeCue=null}),n.elementRail.appendChild(e.el)})},resetChapters:function(){e.each(this.cues,function(e){e.el.parentNode&&e.el.parentNode.removeChild(e.el)},this),this.cues=[]}};return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(49),n(2),n(1),n(9),n(141)],r=function(e,t,n,i,r){var o=e.extend({setup:function(e,o,a){a=a||{},this.iconUI||(this.iconUI=new i(this.el,{useHover:!0,directSelect:!0}),this.toggleValueListener=this.toggleValue.bind(this),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this),this.selectListener=this.select.bind(this)),this.reset(),e=n.isArray(e)?e:[],t.toggleClass(this.el,"jw-hidden",e.length<2);var s=e.length>2||2===e.length&&a&&a.toggle===!1,l=!s&&2===e.length;if(t.toggleClass(this.el,"jw-toggle",l||!!a.isToggle),t.toggleClass(this.el,"jw-button-color",!l),this.isActive=s||l,s){t.removeClass(this.el,"jw-off"),this.iconUI.on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener);var u=r(e),c=t.createElement(u);this.addContent(c),this.contentUI=new i(this.content).on("click tap",this.selectListener)}else l&&this.iconUI.on("click tap",this.toggleValueListener);this.selectItem(o)},toggleValue:function(){this.trigger("toggleValue")},select:function(e){if(e.target.parentElement===this.content){var i=t.classList(e.target),r=n.find(i,function(e){return 0===e.indexOf("jw-item")});r&&(this.trigger("select",parseInt(r.split("-")[2])),this.closeTooltipListener())}},selectItem:function(e){if(this.content)for(var n=0;n<this.content.children.length;n++)t.toggleClass(this.content.children[n],"jw-active-option",e===n);t.toggleClass(this.el,"jw-off",0===e)},reset:function(){t.addClass(this.el,"jw-off"),this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(45),n(9),n(1),n(2),n(142)],r=function(e,t,n,i,r){var o=function(e,t,n){this._model=e,this._api=t,this._nextButton=n,this.nextUpText=e.get("localization").nextUp,this.state="tooltip"};return n.extend(o.prototype,{setup:function(){this.container=document.createElement("div"),this.container.className="jw-nextup-container jw-reset";var e=i.createElement(r());this.addContent(e),this.closeButton=this.content.querySelector(".jw-nextup-close"),this.tooltip=this.content.querySelector(".jw-nextup-tooltip"),this.showNextUp=!1,this.streamType=void 0,this._model.on("change:mediaModel",this.onMediaModel,this),this._model.on("change:streamType",this.onStreamType,this),this._model.on("change:nextUp",this.onNextUp,this),this._model.on("change:duration",this.onDuration,this),this._model.on("change:position",this.onElapsed,this),this.onMediaModel(this._model,this._model.get("mediaModel")),new t(this.closeButton,{directSelect:!0}).on("click tap",this.hide,this),new t(this.tooltip).on("click tap",this.click,this),new t(this._nextButton.element(),{useHover:!0,directSelect:!0}).on("click tap",this.click,this).on("over",this.show,this).on("out",this.hoverOut,this)},loadThumbnail:function(e){return this.nextUpImage=new Image,this.nextUpImage.onload=function(){this.nextUpImage.onload=null}.bind(this),this.nextUpImage.src=e,{backgroundImage:'url("'+e+'")'}},click:function(){this.state="tooltip",this._api.next(),this.hide()},show:function(){"opened"===this.state||this.hideToolTip||e.addClass(this.container,"jw-nextup-container-visible")},hide:function(){e.removeClass(this.container,"jw-nextup-container-visible"),e.removeClass(this.container,"jw-nextup-sticky"),"opened"===this.state&&(this.state="closed")},hoverOut:function(){"opened"!==this.state&&this.hide()},showTilEnd:function(){"opened"!==this.state&&"closed"!==this.state&&(e.addClass(this.container,"jw-nextup-sticky"),this.show(),this.state="opened")},setNextUpItem:function(t){var n=this;setTimeout(function(){if(n.hideToolTip=!(t.title||t.image),!n.hideToolTip){if(n.thumbnail=n.content.querySelector(".jw-nextup-thumbnail"),e.toggleClass(n.thumbnail,"jw-nextup-thumbnail-visible",!!t.image),t.image){var r=n.loadThumbnail(t.image);i.style(n.thumbnail,r)}n.header=n.content.querySelector(".jw-nextup-header"),n.header.innerText=n.nextUpText,n.title=n.content.querySelector(".jw-nextup-title");var o=t.title;n.title.innerText=o?i.createElement(o).textContent:""}},500)},onNextUp:function(e,t){return t?(this.showNextUp=!0,this._nextButton.toggle(!0),void this.setNextUpItem(t)):(this._nextButton.toggle(!1),void(this.showNextUp=!1))},onDuration:function(e,t){if(t){var n=i.seconds(e.get("nextupoffset")||-10);n<0&&(n+=t),this.offset=n}},onMediaModel:function(e,t){t.on("change:state",function(e,t){"complete"===t&&(this.state="tooltip",this.hide())},this)},onElapsed:function(e,t){"VOD"===this.streamType&&this.showNextUp&&t>=this.offset?this.showTilEnd():"opened"!==this.state&&"closed"!==this.state||(this.state="tooltip",this.hide())},onStreamType:function(e,t){this.streamType=t},element:function(){return this.container},addContent:function(e){this.content&&this.removeContent(),this.content=e,this.container.appendChild(e)},removeContent:function(){this.content&&(this.container.removeChild(this.content),this.content=null)}}),o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(2),n(42)],r=function(e,t,n){function i(e){this.begin=e.begin,this.end=e.end,this.img=e.text}var r={loadThumbnails:function(e){e&&(this.vttPath=e.split("?")[0].split("/").slice(0,-1).join("/"),this.individualImage=null,t.ajax(e,this.thumbnailsLoaded.bind(this),this.thumbnailsFailed.bind(this),{plainText:!0}))},thumbnailsLoaded:function(t){var r=n(t.responseText);e.isArray(r)&&(e.each(r,function(e){this.thumbnails.push(new i(e))},this),this.drawCues())},thumbnailsFailed:function(){},chooseThumbnail:function(t){var n=e.sortedIndex(this.thumbnails,{end:t},e.property("end"));n>=this.thumbnails.length&&(n=this.thumbnails.length-1);var i=this.thumbnails[n].img;return i.indexOf("://")<0&&(i=this.vttPath?this.vttPath+"/"+i:i),i},loadThumbnail:function(t){var n=this.chooseThumbnail(t),i={display:"block",margin:"0 auto",backgroundPosition:"0 0"},r=n.indexOf("#xywh");if(r>0)try{var o=/(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(n);n=o[1],i.backgroundPosition=o[2]*-1+"px "+o[3]*-1+"px",i.width=o[4],i.height=o[5]}catch(a){return}else this.individualImage||(this.individualImage=new Image,this.individualImage.onload=e.bind(function(){this.individualImage.onload=null,this.timeTip.image({width:this.individualImage.width,height:this.individualImage.height})},this),this.individualImage.src=n);return i.backgroundImage='url("'+n+'")',i},showThumbnail:function(e){this.thumbnails.length<1||this.timeTip.image(this.loadThumbnail(e))},resetThumbnails:function(){this.timeTip.image({backgroundImage:"",width:0,height:0}),this.thumbnails=[]}};return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(2),n(27),n(48),n(49),n(194),n(197)],r=function(e,t,n,i,r,o,a){var s=r.extend({setup:function(){this.text=document.createElement("span"),this.text.className="jw-text jw-reset",this.img=document.createElement("div"),this.img.className="jw-reset";var e=document.createElement("div");e.className="jw-time-tip jw-background-color jw-reset",e.appendChild(this.img),e.appendChild(this.text),t.removeClass(this.el,"jw-hidden"),this.addContent(e)},image:function(e){t.style(this.img,e)},update:function(e){this.text.innerHTML=e}}),l=i.extend({constructor:function(t,n){this._model=t,this._api=n,this.timeTip=new s("jw-tooltip-time"),this.timeTip.setup(),this.cues=[],this.seekThrottled=e.throttle(this.performSeek,400),this._model.on("change:playlistItem",this.onPlaylistItem,this).on("change:position",this.onPosition,this).on("change:duration",this.onDuration,this).on("change:buffer",this.onBuffer,this),i.call(this,"jw-slider-time","horizontal")},setup:function(){i.prototype.setup.apply(this,arguments),this._model.get("playlistItem")&&this.onPlaylistItem(this._model,this._model.get("playlistItem")),this.elementRail.appendChild(this.timeTip.element()),this.el.addEventListener("mousemove",this.showTimeTooltip.bind(this),!1),this.el.addEventListener("mouseout",this.hideTimeTooltip.bind(this),!1)},limit:function(t){if(this.activeCue&&e.isNumber(this.activeCue.pct))return this.activeCue.pct;var i=this._model.get("duration"),r=this._model.get("streamType");if("DVR"===r){var o=(1-t/100)*i,a=this._model.get("position"),s=Math.min(o,Math.max(n.dvrSeekLimit,a)),l=100*s/i;return 100-l}return t},update:function(e){this.seekTo=e,this.seekThrottled(),i.prototype.update.apply(this,arguments)},dragStart:function(){this._model.set("scrubbing",!0),i.prototype.dragStart.apply(this,arguments)},dragEnd:function(){i.prototype.dragEnd.apply(this,arguments),this._model.set("scrubbing",!1)},onSeeked:function(){this._model.get("scrubbing")&&this.performSeek()},onBuffer:function(e,t){this.updateBuffer(t)},onPosition:function(e,t){this.updateTime(t,e.get("duration"))},onDuration:function(e,t){this.updateTime(e.get("position"),t)},updateTime:function(e,t){var n=0;if(t){var i=this._model.get("streamType");"DVR"===i?n=(t-e)/t*100:"VOD"===i&&(n=e/t*100)}this.render(n)},onPlaylistItem:function(t,n){this.reset(),t.mediaModel.on("seeked",this.onSeeked,this);var i=n.tracks;e.each(i,function(e){e&&e.kind&&"thumbnails"===e.kind.toLowerCase()?this.loadThumbnails(e.file):e&&e.kind&&"chapters"===e.kind.toLowerCase()&&this.loadChapters(e.file)},this)},performSeek:function(){var e,t=this.seekTo,n=this._model.get("duration"),i=this._model.get("streamType");0===n?this._api.play():"DVR"===i?(e=(100-t)/100*n,this._api.seek(e)):(e=t/100*n,this._api.seek(Math.min(e,n-.25)))},showTimeTooltip:function(e){var i=this._model.get("duration");if(0!==i){var r=t.bounds(this.elementRail),o=e.pageX?e.pageX-r.left:e.x;o=t.between(o,0,r.width);var a=o/r.width,s=i*a;i<0&&(s=i-s);var l;if(this.activeCue)l=this.activeCue.text;else{var u=!0;l=t.timeFormat(s,u),i<0&&s>n.dvrSeekLimit&&(l="Live")}this.timeTip.update(l),this.showThumbnail(s),t.addClass(this.timeTip.el,"jw-open"),this.timeTip.el.style.left=100*a+"%"}},hideTimeTooltip:function(){t.removeClass(this.timeTip.el,"jw-open")},reset:function(){this.resetChapters(),this.resetThumbnails()}});return e.extend(l.prototype,o,a),l}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(49),n(48),n(9),n(2)],r=function(e,t,n,i){var r=e.extend({constructor:function(r,o,a){this._model=r,e.call(this,o,a,!0),this.volumeSlider=new t("jw-slider-volume jw-volume-tip","vertical"),this.addContent(this.volumeSlider.element()),this.volumeSlider.on("update",function(e){this.trigger("update",e)},this),i.removeClass(this.el,"jw-hidden"),new n(this.el,{useHover:!0,directSelect:!0}).on("click",this.toggleValue,this).on("tap",this.toggleOpenState,this).on("over",this.openTooltip,this).on("out",this.closeTooltip,this),this._model.on("change:volume",this.onVolume,this)},toggleValue:function(){this.trigger("toggleValue")}});return r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(1),n(3),n(27),n(9),n(48),n(198),n(195),n(199)],r=function(e,t,n,i,r,o,a,s,l){function u(e,t,n){var i=document.createElement("div");return i.className="jw-icon jw-icon-inline jw-button-color jw-reset "+e,i.setAttribute("role","button"),i.setAttribute("tabindex","0"),n&&i.setAttribute("aria-label",n),i.style.display="none",t&&new r(i).on("click tap",function(){t()}),{element:function(){return i},toggle:function(e){e?this.show():this.hide()},show:function(){i.style.display=""},hide:function(){i.style.display="none"}}}function c(e,t){var n=document.createElement("span");return n.className="jw-text jw-reset "+e,t&&n.setAttribute("role",t),n}function d(e,t){var n=new s(e,t);return n}function p(e,n){var i=document.createElement("div");return i.className="jw-group jw-controlbar-"+e+"-group jw-reset",t.each(n,function(e){e.element&&(e=e.element()),i.appendChild(e)}),i}function h(t,n){this._api=t,this._model=n,this._isMobile=e.isMobile(),this._localization=this._model.get("localization"),this.setup()}return t.extend(h.prototype,n,{setup:function(){this.build(),this.initialize()},build:function(){var e,n,i,r=new a(this._model,this._api),s=this._localization.play,h=this._localization.next,f=this._localization.volume,g=this._localization.rewind;this._isMobile||(i=u("jw-icon-volume",this._api.setMute,f),e=new o("jw-slider-volume","horizontal"),n=new l(this._model,"jw-icon-volume",f)),this.elements={alt:c("jw-text-alt","status"),play:u("jw-icon-playback",this._api.play.bind(this,{reason:"interaction"}),s),rewind:u("jw-icon-rewind",this.rewind.bind(this),g),next:u("jw-icon-next",null,h),elapsed:c("jw-text-elapsed","timer"),time:r,duration:c("jw-text-duration","timer"),hd:d("jw-icon-hd",this._localization.hd),cc:d("jw-icon-cc",this._localization.cc),audiotracks:d("jw-icon-audio-tracks",this._localization.audioTracks),mute:i,volume:e,volumetooltip:n,cast:u("jw-icon-cast jw-off",this._api.castToggle,this._localization.cast),fullscreen:u("jw-icon-fullscreen",this._api.setFullscreen,this._localization.fullscreen)},this.layout={left:[this.elements.play,this.elements.rewind,this.elements.elapsed],center:[this.elements.time,this.elements.alt],right:[this.elements.duration,this.elements.next,this.elements.hd,this.elements.cc,this.elements.audiotracks,this.elements.mute,this.elements.cast,this.elements.volume,this.elements.volumetooltip,this.elements.fullscreen]},this.menus=t.compact([this.elements.hd,this.elements.cc,this.elements.audiotracks,this.elements.volumetooltip]),this.layout.left=t.compact(this.layout.left),this.layout.center=t.compact(this.layout.center),this.layout.right=t.compact(this.layout.right),this.el=document.createElement("div"),this.el.className="jw-controlbar jw-background-color jw-reset",this.elements.left=p("left",this.layout.left),this.elements.center=p("center",this.layout.center),this.elements.right=p("right",this.layout.right),this.el.appendChild(this.elements.left),this.el.appendChild(this.elements.center),this.el.appendChild(this.elements.right)},initialize:function(){this.elements.play.show(),this.elements.fullscreen.show(),this.elements.mute&&this.elements.mute.show(),this.onVolume(this._model,this._model.get("volume")),this.onPlaylistItem(),this.onMediaModel(this._model,this._model.get("mediaModel")),this.onCastAvailable(this._model,this._model.get("castAvailable")),this.onCastActive(this._model,this._model.get("castActive")),this.onCaptionsList(this._model,this._model.get("captionsList")),this._model.on("change:volume",this.onVolume,this),this._model.on("change:mute",this.onMute,this),this._model.on("change:playlistItem",this.onPlaylistItem,this),this._model.on("change:mediaModel",this.onMediaModel,this),this._model.on("change:castAvailable",this.onCastAvailable,this),this._model.on("change:castActive",this.onCastActive,this),this._model.on("change:duration",this.onDuration,this),this._model.on("change:position",this.onElapsed,this),this._model.on("change:fullscreen",this.onFullscreen,this),this._model.on("change:captionsList",this.onCaptionsList,this),this._model.on("change:captionsIndex",this.onCaptionsIndex,this),this._model.on("change:streamType",this.onStreamTypeChange,this),this.elements.volume&&this.elements.volume.on("update",function(e){var t=e.percentage;this._api.setVolume(t)},this),this.elements.volumetooltip&&(this.elements.volumetooltip.on("update",function(e){var t=e.percentage;this._api.setVolume(t)},this),this.elements.volumetooltip.on("toggleValue",function(){this._api.setMute()},this)),this.elements.hd.on("select",function(e){this._model.getVideo().setCurrentQuality(e)},this),this.elements.hd.on("toggleValue",function(){this._model.getVideo().setCurrentQuality(0===this._model.getVideo().getCurrentQuality()?1:0)},this),this.elements.cc.on("select",function(e){this._api.setCurrentCaptions(e)},this),this.elements.cc.on("toggleValue",function(){var e=this._model.get("captionsIndex");this._api.setCurrentCaptions(e?0:1)},this),this.elements.audiotracks.on("select",function(e){this._model.getVideo().setCurrentAudioTrack(e)},this),new r(this.elements.duration).on("click tap",function(){if("DVR"===this._model.get("streamType")){var e=this._model.get("position");this._api.seek(Math.max(i.dvrSeekLimit,e))}},this),new r(this.el).on("click tap drag",function(){this.trigger("userAction")},this),t.each(this.menus,function(e){e.on("open-tooltip",this.closeMenus,this)},this)},onCaptionsList:function(e,t){var n=e.get("captionsIndex");this.elements.cc.setup(t,n,{isToggle:!0})},onCaptionsIndex:function(e,t){this.elements.cc.selectItem(t)},onPlaylistItem:function(){this.elements.time.updateBuffer(0),this.elements.time.render(0),this.elements.duration.innerHTML="00:00",this.elements.elapsed.innerHTML="00:00",this.elements.audiotracks.setup()},onMediaModel:function(e,n){n.on("change:levels",function(e,t){this.elements.hd.setup(t,e.get("currentLevel"))},this),n.on("change:currentLevel",function(e,t){this.elements.hd.selectItem(t)},this),n.on("change:audioTracks",function(e,n){var i=t.map(n,function(e){return{label:e.name}});this.elements.audiotracks.setup(i,e.get("currentAudioTrack"),{toggle:!1})},this),n.on("change:currentAudioTrack",function(e,t){this.elements.audiotracks.selectItem(t)},this)},onVolume:function(e,t){this.renderVolume(e.get("mute"),t)},onMute:function(e,t){this.renderVolume(t,e.get("volume"))},renderVolume:function(t,n){this.elements.mute&&e.toggleClass(this.elements.mute.element(),"jw-off",t),this.elements.volume&&this.elements.volume.render(t?0:n),this.elements.volumetooltip&&(this.elements.volumetooltip.volumeSlider.render(t?0:n),e.toggleClass(this.elements.volumetooltip.element(),"jw-off",t))},onCastAvailable:function(e,t){this.elements.cast.toggle(t)},onCastActive:function(t,n){e.toggleClass(this.elements.cast.element(),"jw-off",!n)},onElapsed:function(t,n){var i,r=t.get("duration");i="DVR"===t.get("streamType")?"-"+e.timeFormat(-r):e.timeFormat(n),this.elements.elapsed.innerHTML=i},onDuration:function(t,n){var i;i="DVR"===t.get("streamType")?"Live":e.timeFormat(n),this.elements.duration.innerHTML=i},onFullscreen:function(t,n){e.toggleClass(this.elements.fullscreen.element(),"jw-off",n)},element:function(){return this.el},setAltText:function(e){this.elements.alt.innerHTML=e},addCues:function(e){this.elements.time&&(t.each(e,function(e){this.elements.time.addCue(e)},this),this.elements.time.drawCues())},closeMenus:function(e){t.each(this.menus,function(t){e&&e.target===t.el||t.closeTooltip(e)})},hideComponents:function(){this.closeMenus()},rewind:function(){var e=this._model.get("position"),t=this._model.get("duration"),n=e-10,i=0;"DVR"===this._model.get("streamType")&&(i=t),this._api.seek(Math.max(n,i))},onStreamTypeChange:function(e){this.elements.rewind.toggle("LIVE"!==e.get("streamType"))}}),h}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(3),n(9),n(137),n(1)],r=function(e,t,n,i,r){var o=function(o){r.extend(this,t),this.model=o,this.el=e.createElement(i({ariaLabel:this.model.get("localization").playback}));var a=this;this.iconUI=new n(this.el).on("click tap",function(e){a.trigger(e.type)}),this.model.on("change:state",function(e,t){var n=a.el.getElementsByClassName("jw-icon-display");if(n.length){var i=a.model.get("localization"),r=i.playback;switch(t){case"buffering":r=i.buffer;break;case"playing":r=i.pause;break;case"complete":r=i.replay;break;case"error":r=""}""===r?n[0].removeAttribute("aria-label"):n[0].setAttribute("aria-label",r)}})};return r.extend(o.prototype,{element:function(){return this.el}}),o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(138),n(2),n(1),n(9)],r=function(e,t,n,i){var r=function(e){this.model=e,this.setup(),this.model.on("change:dock",this.render,this)};return n.extend(r.prototype,{setup:function(){var n=this.model.get("dock"),r=this.click.bind(this),o=e(n);this.el=t.createElement(o),new i(this.el).on("click tap",r)},getDockButton:function(e){return t.hasClass(e.target,"jw-dock-button")?e.target:t.hasClass(e.target,"jw-dock-text")?e.target.parentElement.parentElement:e.target.parentElement},click:function(e){var t=this.getDockButton(e),i=t.getAttribute("button"),r=this.model.get("dock"),o=n.findWhere(r,{id:i});o&&o.callback&&o.callback(e)},render:function(){var n=this.model.get("dock"),i=e(n),r=t.createElement(i);this.el.innerHTML=r.innerHTML},element:function(){return this.el}}),r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(139)],r=function(e){function t(t,n,i,r){return e({id:t,skin:n,title:i,body:r})}return t}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(9),n(2),n(4),n(1),n(3),n(140)],r=function(e,t,n,i,r,o){var a=t.style,s={linktarget:"_blank",margin:8,hide:!1,position:"top-right"},l=function(l){var u,c,d=new Image,p=i.extend({},l.get("logo"));return i.extend(this,r),this.setup=function(r){if(c=i.extend({},s,p),c.hide="true"===c.hide.toString(),u=t.createElement(o()),c.file){c.hide&&t.addClass(u,"jw-hide"),t.addClass(u,"jw-logo-"+(c.position||s.position)),"top-right"===c.position&&(l.on("change:dock",this.topRight,this),l.on("change:controls",this.topRight,this),this.topRight(l)),l.set("logo",c),d.onload=function(){var e={backgroundImage:'url("'+this.src+'")',width:this.width,height:this.height};if(c.margin!==s.margin){var t=/(\w+)-(\w+)/.exec(c.position);3===t.length&&(e["margin-"+t[1]]=c.margin,e["margin-"+t[2]]=c.margin)}a(u,e),l.set("logoWidth",e.width)},d.src=c.file;var h=new e(u);h.on("click tap",function(e){t.exists(e)&&e.stopPropagation&&e.stopPropagation(),this.trigger(n.JWPLAYER_LOGO_CLICK,{link:c.link,linktarget:c.linktarget})},this),r.appendChild(u)}},this.topRight=function(e){var t=e.get("controls"),n=e.get("dock"),i=t&&(n&&n.length||e.get("sharing")||e.get("related"));a(u,{top:i?"3.5em":0})},this.element=function(){return u},this.position=function(){return c.position},this.destroy=function(){d.onload=null},this};return l}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(2)],r=function(e,t){function n(e,t){t.off("change:mediaType",null,this),t.on("change:mediaType",function(t,n){"audio"===n&&this.setImage(e.get("playlistItem").image)},this)}function i(e,n){var i=e.get("autostart")&&!t.isMobile()||e.get("item")>0;return i?(this.setImage(null),e.off("change:state",null,this),void e.on("change:state",function(e,t){"complete"!==t&&"idle"!==t&&"error"!==t||(this.setImage(n.image),this.resize(null,null,e.get("stretching")))},this)):void this.setImage(n.image)}var r=function(e){this.model=e,e.on("change:playlistItem",i,this),e.on("change:mediaModel",n,this)};return e.extend(r.prototype,{setup:function(e){this.el=e;var t=this.model.get("playlistItem");t&&this.setImage(t.image)},setImage:function(n){var i=this.image;i&&(i.onload=null,this.image=null),this.model.off("change:state",null,this);var r="";e.isString(n)&&(r='url("'+n+'")',i=this.image=new Image,i.src=n),t.style(this.el,{backgroundImage:r})},resize:function(e,n,i){if("uniform"===i){if(e&&(this.playerAspectRatio=e/n),!this.playerAspectRatio)return;var r=this.image,o=null;if(r){if(0===r.width){var a=this;return void(r.onload=function(){a.resize(e,n,i)})}var s=r.width/r.height;Math.abs(this.playerAspectRatio-s)<.09&&(o="cover")}t.style(this.el,{backgroundSize:o})}},element:function(){return this.el}}),r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(144),n(1),n(9),n(29)],r=function(e,t,n,i,r){var o=function(){};return n.extend(o.prototype,{buildArray:function(){var t=r.split("+"),n=t[0],i={items:[{title:"Powered by JW Player "+n,featured:!0,showLogo:!0,link:"https://jwplayer.com/learn-more"}]},o=n.indexOf("-")>0,a=t[1];if(o&&a){var s=a.split(".");i.items.push({title:"build: ("+s[0]+"."+s[1]+")",link:"#"})}var l=this.model.get("provider");if(l&&l.name.indexOf("flash")>=0){var u="Flash Version "+e.flashVersion();i.items.push({title:u,link:"http://www.adobe.com/software/flash/about/"})}return i},buildMenu:function(){var n=this.buildArray();return e.createElement(t(n))},updateHtml:function(){this.el.innerHTML=this.buildMenu().innerHTML},rightClick:function(e){return this.lazySetup(),!this.mouseOverContext&&(this.hideMenu(),this.showMenu(e),!1)},getOffset:function(e){for(var t=e.target,n=e.offsetX||e.layerX,i=e.offsetY||e.layerY;t!==this.playerElement;)n+=t.offsetLeft,i+=t.offsetTop,t=t.parentNode;return{x:n,y:i}},showMenu:function(t){var n=this.getOffset(t);return this.el.style.left=n.x+"px",this.el.style.top=n.y+"px",e.addClass(this.playerElement,"jw-flag-rightclick-open"),e.addClass(this.el,"jw-open"),clearTimeout(this._menuTimeout),this._menuTimeout=setTimeout(this.hideMenu.bind(this),3e3),!1},hideMenu:function(){return this.elementUI.off("out",this.hideMenu,this),this.mouseOverContext?void this.elementUI.on("out",this.hideMenu,this):(e.removeClass(this.playerElement,"jw-flag-rightclick-open"),void e.removeClass(this.el,"jw-open"))},lazySetup:function(){this.el||(this.el=this.buildMenu(),this.layer.appendChild(this.el),this.hideMenuHandler=this.hideMenu.bind(this),this.addOffListener(this.playerElement),this.addOffListener(document),this.model.on("change:provider",this.updateHtml,this),this.elementUI=new i(this.el,{useHover:!0}).on("over",function(){this.mouseOverContext=!0},this).on("out",function(){this.mouseOverContext=!1},this))},setup:function(e,t,n){this.playerElement=t,this.model=e,this.mouseOverContext=!1,this.layer=n,t.oncontextmenu=this.rightClick.bind(this)},addOffListener:function(e){e.addEventListener("mousedown",this.hideMenuHandler),e.addEventListener("touchstart",this.hideMenuHandler),e.addEventListener("pointerdown",this.hideMenuHandler)},removeOffListener:function(e){e.removeEventListener("mousedown",this.hideMenuHandler),e.removeEventListener("touchstart",this.hideMenuHandler),e.removeEventListener("pointerdown",this.hideMenuHandler)},destroy:function(){clearTimeout(this._menuTimeout),this.el&&(this.hideMenu(),this.elementUI.off(),this.removeOffListener(this.playerElement),this.removeOffListener(document),this.hideMenuHandler=null,this.el=null),this.playerElement&&(this.playerElement.oncontextmenu=null,this.playerElement=null),this.model&&(this.model.off("change:provider",this.updateHtml),this.model=null)}}),o}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(1),n(2)],r=function(e,t){var n=function(e){this.model=e,this.model.on("change:playlistItem",this.playlistItem,this)};return e.extend(n.prototype,{hide:function(){this.el.style.display="none"},show:function(){this.el.style.display=""},setup:function(e){this.el=e;var t=this.el.getElementsByTagName("div");this.title=t[0],this.description=t[1],this.model.get("playlistItem")&&this.playlistItem(this.model,this.model.get("playlistItem")),this.model.on("change:logoWidth",this.update,this),this.model.on("change:dock",this.update,this)},update:function(e){var n={paddingLeft:0,paddingRight:0},i=e.get("controls"),r=e.get("dock"),o=e.get("logo");if(o){var a=1*(""+o.margin).replace("px",""),s=e.get("logoWidth")+(isNaN(a)?0:a);"top-left"===o.position?n.paddingLeft=s:"top-right"===o.position&&(n.paddingRight=s)}if(i&&r&&r.length){var l=56*r.length;n.paddingRight=Math.max(n.paddingRight,l)}t.style(this.el,n)},playlistItem:function(e,t){if(e.get("displaytitle")||e.get("displaydescription")){var n="",i="";t.title&&e.get("displaytitle")&&(n=t.title),t.description&&e.get("displaydescription")&&(i=t.description),this.updateText(n,i)}else this.hide()},updateText:function(e,t){this.title.innerHTML=e,this.description.innerHTML=t,this.title.firstChild||this.description.firstChild?this.show():this.hide()},element:function(){return this.el}}),n}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(4),n(3),n(27),n(6),n(192),n(193),n(201),n(202),n(204),n(200),n(205),n(222),n(207),n(196),n(1),n(143),n(191)],r=function(e,t,i,r,o,a,s,l,u,c,d,p,h,f,g,m,w,v){var y=e.style,j=e.bounds,b=e.isMobile(),E=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],k=function(k,x){function A(t){var n=0,i=x.get("duration"),o=x.get("position");"DVR"===x.get("streamType")&&(n=i,i=Math.max(o,r.dvrSeekLimit));var a=e.between(o+t,n,i);k.seek(a)}function _(t){var n=e.between(x.get("volume")+t,0,100);k.setVolume(n)}function L(e){return!e.ctrlKey&&!e.metaKey&&!!x.get("controls")}function C(e){if(!L(e))return!0;switch(We||ie(),e.keyCode){case 27:k.setFullscreen(!1);break;case 13:case 32:k.play({reason:"interaction"});break;case 37:We||A(-5);break;case 39:We||A(5);break;case 38:_(10);break;case 40:_(-10);break;case 67:var t=k.getCaptionsList(),n=t.length;if(n){var i=(k.getCurrentCaptions()+1)%n;k.setCurrentCaptions(i)}break;case 77:k.setMute();break;case 70:k.setFullscreen();break;default:if(e.keyCode>=48&&e.keyCode<=59){var r=e.keyCode-48,o=r/10*x.get("duration");k.seek(o)}}return/13|32|37|38|39|40/.test(e.keyCode)?(e.preventDefault(),!1):void 0}function T(){Ge=!1,e.removeClass(ge,"jw-no-focus")}function P(e){e.target&&e.target.blur&&e.target.blur()}function R(){Ge=!0,e.addClass(ge,"jw-no-focus")}function I(){Ge||T(),We||ie()}function M(){var e=j(ge),n=Math.round(e.width),i=Math.round(e.height);ze(Be),n&&i&&(n!==ve||i!==ye)&&(ve=n,ye=i,clearTimeout(Je),Je=setTimeout($,50),x.set("containerWidth",n),x.set("containerHeight",i),v(ge,n,i),Ke.trigger(t.JWPLAYER_RESIZE,{width:n,height:i}))}function S(){document.body.contains(ge)&&(ze(Be),Be=Ve(M))}function O(t,n,i){var r={color:t,borderColor:t,stroke:t},o={color:n,borderColor:n,stroke:n};e.css("#"+i+" .jw-color-active",r,i),e.css("#"+i+" .jw-color-active-hover:hover",r,i),e.css("#"+i+" .jw-color-inactive",o,i),e.css("#"+i+" .jw-color-inactive-hover:hover",o,i)}function D(t,n){n=n||!1,e.toggleClass(ge,"jw-flag-casting",n)}function N(t,n){e.toggleClass(ge,"jw-flag-cast-available",n),e.toggleClass(me,"jw-flag-cast-available",n)}function Y(t,n){e.replaceClass(ge,/jw-stretch-\S+/,"jw-stretch-"+n)}function W(e){e&&!b&&(e.element().addEventListener("mousemove",B,!1),e.element().addEventListener("mouseout",V,!1))}function F(){x.get("state")!==o.IDLE&&x.get("state")!==o.COMPLETE&&x.get("state")!==o.PAUSED||!x.get("controls")||k.play({reason:"interaction"}),Fe?ne():ie()}function J(e){e.link?(k.pause(!0),k.setFullscreen(!1),window.open(e.link,e.linktarget)):x.get("controls")&&k.play({reason:"interaction"})}function B(){clearTimeout(De)}function V(){ie()}function z(e){Ke.trigger(e.type,e)}function U(t,n){n?(Re&&Re.destroy(),e.addClass(ge,"jw-flag-flash-blocked")):(Re&&Re.setup(x,ge,ge),e.removeClass(ge,"jw-flag-flash-blocked"))}function H(){x.get("controls")&&k.setFullscreen()}function G(){var n=ge.getElementsByClassName("jw-overlays")[0];n.addEventListener("mousemove",ie),ke=new s(x,we,{useHover:!0}),ke.on("click",function(){z({type:t.JWPLAYER_DISPLAY_CLICK}),x.get("controls")&&k.play({reason:"interaction"})}),ke.on("tap",function(){z({type:t.JWPLAYER_DISPLAY_CLICK}),F()}),ke.on("doubleClick",H),ke.on("move",ie),ke.on("over",ie);var i=new l(x);i.on("click",function(){z({type:t.JWPLAYER_DISPLAY_CLICK}),k.play({reason:"interaction"})}),i.on("tap",function(){z({type:t.JWPLAYER_DISPLAY_CLICK}),F()}),e.isChrome()&&!e.isMobile()&&i.el.addEventListener("mousedown",function(){var e=x.getVideo(),t=e&&0===e.getName().name.indexOf("flash");if(t){var n=function(){document.removeEventListener("mouseup",n),i.el.style.pointerEvents="auto"};this.style.pointerEvents="none",document.addEventListener("mouseup",n)}}),me.appendChild(i.element()),Ae=new u(x),_e=new c(x),_e.on(t.JWPLAYER_LOGO_CLICK,J);var r=document.createElement("div");r.className="jw-controls-right jw-reset",_e.setup(r),r.appendChild(Ae.element()),me.appendChild(r),Te=new a(x),Te.setup(ge.id,x.get("captions")),me.parentNode.insertBefore(Te.element(),Le.element());
var o=x.get("height");b&&("string"==typeof o||o>=1.5*Ye)?e.addClass(ge,"jw-flag-touch"):(Re=new h,Re.setup(x,ge,ge)),be=new d(k,x),be.on(t.JWPLAYER_USER_ACTION,ie),x.on("change:scrubbing",he),Ce=new g(x,k,be.elements.next),Ce.setup(),me.appendChild(Ce.element()),me.appendChild(be.element()),ge.addEventListener("focus",I),ge.addEventListener("blur",T),ge.addEventListener("keydown",C),ge.onmousedown=R,ge.onmouseup=P}function K(t,n,i){var r,o=ge.className;i=!!i,i&&(o=o.replace(/\s*aspectMode/,""),ge.className!==o&&(ge.className=o),y(ge,{display:"block"},i)),e.exists(t)&&e.exists(n)&&(x.set("width",t),x.set("height",n)),r={width:t},e.hasClass(ge,"jw-flag-aspect-mode")||(r.height=n),x.get("aspectratio")&&fe(),y(ge,r,!0),X(n),$(t,n)}function X(t){if(Pe=q(t),be&&!Pe){var n=We?je:x;de(n,n.get("state"))}e.toggleClass(ge,"jw-flag-audio-player",Pe)}function q(e){if(x.get("aspectratio"))return!1;if(m.isString(e)&&e.indexOf("%")>-1)return!1;var t=m.isNumber(e)?e:x.get("containerHeight");return Q(t)}function Q(e){return e&&e<=Ye*(b?1.75:1)}function $(t,n){if(!t||isNaN(Number(t))){if(!we)return;t=we.clientWidth}if(!n||isNaN(Number(n))){if(!we)return;n=we.clientHeight}Ee&&Ee.resize(t,n,x.get("stretching")),e.isMSIE(9)&&document.all&&!window.atob&&(t=n="100%");var i=x.getVideo();if(i){var r=i.resize(t,n,x.get("stretching"));r&&(clearTimeout(Je),Je=setTimeout($,250)),x.get("aspectratio")&&fe(),Te.resize()}}function Z(){if(He){var e=document.fullscreenElement||document.webkitCurrentFullScreenElement||document.mozFullScreenElement||document.msFullscreenElement;return!(!e||e.id!==x.get("id"))}return We?je.getVideo().getFullScreen():x.getVideo().getFullScreen()}function ee(e){var t=x.get("fullscreen"),n=void 0!==e.jwstate?e.jwstate:Z();t!==n&&x.set("fullscreen",n),clearTimeout(Je),Je=setTimeout($,200)}function te(t,n){n?(e.addClass(t,"jw-flag-fullscreen"),y(document.body,{"overflow-y":"hidden"}),ie()):(e.removeClass(t,"jw-flag-fullscreen"),y(document.body,{"overflow-y":""})),$()}function ne(){Fe=!1,clearTimeout(De),be.hideComponents(),e.addClass(ge,"jw-flag-user-inactive"),Te.renderCues(!0)}function ie(){Fe||(e.removeClass(ge,"jw-flag-user-inactive"),Te.renderCues(!0)),Fe=!0,clearTimeout(De),De=setTimeout(ne,Ne)}function re(){k.setFullscreen(!1)}function oe(){xe&&xe.setState(x.get("state")),ae(x,x.mediaModel.get("mediaType")),x.mediaModel.on("change:mediaType",ae,this)}function ae(t,n){var i="audio"===n,r=x.getVideo(),o=r&&0===r.getName().name.indexOf("flash");e.toggleClass(ge,"jw-flag-media-audio",i),i&&!o?ge.insertBefore(Ee.el,we):ge.insertBefore(Ee.el,Te.element())}function se(t,n){var i=t.get("minDvrWindow"),r=e.streamType(n,i),o="LIVE"===r;t.set("streamType",r),e.toggleClass(ge,"jw-flag-live",o),Ke.setAltText(o?t.get("localization").liveBroadcast:"")}function le(e,t){return t?void(t.name?Le.updateText(t.name,t.message):Le.updateText(t.message,"")):void Le.playlistItem(e,e.get("playlistItem"))}function ue(){var e=x.getVideo();return!!e&&e.isCaster}function ce(){e.replaceClass(ge,/jw-state-\S+/,"jw-state-"+Ie)}function de(e,t){Ie=t,clearTimeout(Ue),t===o.PLAYING?pe(e,t):Ue=setTimeout(function(){pe(e,t)},33)}function pe(t,n){if(e.toggleClass(ge,"jw-flag-dragging",t.get("scrubbing")),ce(),ue())return void e.addClass(we,"jw-media-show");switch(n){case o.PLAYING:$();break;case o.PAUSED:ie()}}function he(e){de(e,e.get("state"))}function fe(){var e=ge.getElementsByClassName("jw-aspect")[0];Te.setContainerHeight(e.offsetHeight)}var ge,me,we,ve,ye,je,be,Ee,ke,xe,Ae,_e,Le,Ce,Te,Pe,Re,Ie,Me,Se,Oe,De=-1,Ne=b?4e3:2e3,Ye=40,We=!1,Fe=!1,Je=-1,Be=-1,Ve=window.requestAnimationFrame||function(e){return window.setTimeout(e,17)},ze=window.cancelAnimationFrame||window.clearTimeout,Ue=-1,He=!1,Ge=!1,Ke=m.extend(this,i);window.webpackJsonpjwplayer&&n(211),this.model=x,this.api=k,ge=e.createElement(w({id:x.get("id")})),e.isIE()&&e.addClass(ge,"jw-ie");var Xe=x.get("width"),qe=x.get("height");y(ge,{width:Xe.toString().indexOf("%")>0?Xe:Xe+"px",height:qe.toString().indexOf("%")>0?qe:qe+"px"}),Se=ge.requestFullscreen||ge.webkitRequestFullscreen||ge.webkitRequestFullScreen||ge.mozRequestFullScreen||ge.msRequestFullscreen,Oe=document.exitFullscreen||document.webkitExitFullscreen||document.webkitCancelFullScreen||document.mozCancelFullScreen||document.msExitFullscreen,He=Se&&Oe,this.onChangeSkin=function(t,n){e.replaceClass(ge,/jw-skin-\S+/,n?"jw-skin-"+n:"")},this.handleColorOverrides=function(){function t(t,i,r){if(r){t=e.prefix(t,"#"+n+" ");var o={};o[i]=r,e.css(t.join(", "),o,n)}}var n=x.get("id"),i=x.get("skinColorActive"),r=x.get("skinColorInactive"),o=x.get("skinColorBackground");t([".jw-toggle",".jw-button-color:hover"],"color",i),t([".jw-active-option",".jw-progress"],"background",i),t([".jw-text",".jw-option",".jw-button-color",".jw-toggle.jw-off",".jw-tooltip-title",".jw-skip .jw-skip-icon"],"color",r),t([".jw-cue",".jw-knob"],"background",r),t([".jw-background-color",".jw-tooltip-title"],"background",o),O(i,r,n)},this.setup=function(){this.handleColorOverrides(),x.get("skin-loading")===!0&&(e.addClass(ge,"jw-flag-skin-loading"),x.once("change:skin-loading",function(){e.removeClass(ge,"jw-flag-skin-loading")})),this.onChangeSkin(x,x.get("skin"),""),x.on("change:skin",this.onChangeSkin,this),we=ge.getElementsByClassName("jw-media")[0],me=ge.getElementsByClassName("jw-controls")[0];var n=ge.getElementsByClassName("jw-preview")[0];Ee=new p(x),Ee.setup(n);var i=ge.getElementsByClassName("jw-title")[0];Le=new f(x),Le.setup(i),G(),ie(),x.set("mediaContainer",we),x.mediaController.on("fullscreenchange",ee);for(var r=E.length;r--;)document.addEventListener(E[r],ee,!1);window.removeEventListener("resize",S),window.addEventListener("resize",S,!1),b&&(window.removeEventListener("orientationchange",S),window.addEventListener("orientationchange",S,!1)),x.on("change:errorEvent",le),x.on("change:controls",Qe),Qe(x,x.get("controls")),x.on("change:state",de),x.on("change:duration",se,this),x.on("change:flashBlocked",U),U(x,x.get("flashBlocked")),k.onPlaylistComplete(re),k.onPlaylistItem(oe),x.on("change:castAvailable",N),N(x,x.get("castAvailable")),x.on("change:castActive",D),D(x,x.get("castActive")),x.on("change:hideAdsControls",function(t,n){e.toggleClass(ge,"jw-flag-ads-hide-controls",n)}),x.get("stretching")&&Y(x,x.get("stretching")),x.on("change:stretching",Y),de(x,o.IDLE),x.on("change:fullscreen",$e),W(be),W(_e);var a=x.get("aspectratio");if(a){e.addClass(ge,"jw-flag-aspect-mode");var s=ge.getElementsByClassName("jw-aspect")[0];y(s,{paddingTop:a})}k.on(t.JWPLAYER_READY,function(){M(),K(x.get("width"),x.get("height"))})};var Qe=function(t,n){if(n){var i=We?je.get("state"):x.get("state");de(t,i)}e.toggleClass(ge,"jw-flag-controls-disabled",!n)},$e=function(t,n){var i=x.getVideo();He?(n?Se.apply(ge):Oe.apply(document),te(ge,n)):e.isIE()?te(ge,n):(je&&je.getVideo()&&je.getVideo().setFullscreen(n),i.setFullscreen(n)),i&&0===i.getName().name.indexOf("flash")&&i.setFullscreen(n)};this.resize=function(e,t){var n=!0;K(e,t,n),M()},this.resizeMedia=$,this.reset=function(){document.contains(ge)&&ge.parentNode.replaceChild(Me,ge),e.emptyElement(ge)},this.setupInstream=function(t){this.instreamModel=je=t,je.on("change:controls",Qe,this),je.on("change:state",de,this),We=!0,e.addClass(ge,"jw-flag-ads"),ie()},this.setAltText=function(e){be.setAltText(e)},this.destroyInstream=function(){if(We=!1,je&&(je.off(null,null,this),je=null),this.setAltText(""),e.removeClass(ge,["jw-flag-ads","jw-flag-ads-hide-controls"]),x.set("hideAdsControls",!1),x.getVideo){var t=x.getVideo();t.setContainer(we)}se(x,x.get("duration")),ke.revertAlternateClickHandlers()},this.addCues=function(e){be&&be.addCues(e)},this.clickHandler=function(){return ke},this.controlsContainer=function(){return me},this.getContainer=this.element=function(){return ge},this.getSafeRegion=function(t){var n={x:0,y:0,width:x.get("containerWidth")||0,height:x.get("containerHeight")||0},i=x.get("dock");return i&&i.length&&x.get("controls")&&(n.y=Ae.element().clientHeight,n.height-=n.y),t=t||!e.exists(t),t&&x.get("controls")&&(n.height-=be.element().clientHeight),n},this.setCaptions=function(e){Te.clear(),Te.setup(x.get("id"),e),Te.resize()},this.destroy=function(){clearTimeout(Ue),clearTimeout(Je),clearTimeout(De),window.removeEventListener("resize",S),window.removeEventListener("orientationchange",S);for(var t=E.length;t--;)document.removeEventListener(E[t],ee,!1);x.mediaController&&x.mediaController.off("fullscreenchange",ee),ge.removeEventListener("keydown",C,!1),Re&&Re.destroy(),xe&&(x.off("change:state",xe.statusDelegate),xe.destroy(),xe=null),We&&this.destroyInstream(),_e&&_e.destroy(),e.clearCss(x.get("id"))}};return k}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,function(e,t,n){var i=n(132);"string"==typeof i&&(i=[["all-players",i,""]]),n(86).style(i,"all-players"),i.locals&&(e.exports=i.locals)},function(e,t,n){var i,r;i=[n(88),n(1),n(29),n(2),n(8),n(9),n(93),n(19),n(94),n(83),n(4),n(6),n(72),n(43),n(33),n(70),n(25)],r=function(e,t,n,i,r,o,a,s,l,u,c,d,p,h,f,g,m){var w={};return w.api=e,w._=t,w.version=n,w.utils=t.extend(i,r,{canCast:f.available,key:a,extend:t.extend,scriptloader:s,rssparser:g,tea:l,UI:o}),w.utils.css.style=w.utils.style,w.vid=u,w.events=t.extend({},c,{state:d}),w.playlist=t.extend({},p,{item:h}),w.plugins=m,w.cast=f,w}.apply(t,i),!(void 0!==r&&(e.exports=r))},,,,,function(e,t,n){var i,r;i=[n(169),n(20),n(220)],r=function(e,t,i){var r=e.prototype.setup;return e.prototype.setup=function(e,o){e.analytics&&(e.sdkplatform=e.sdkplatform||e.analytics.sdkplatform),r.apply(this,arguments);var a=this._model.get("edition"),s=t(a),l=this._model.get("cast"),u=this;s("casting")&&l&&l.appid&&n.e(3,function(require){var e=n(89);u._castController=new e(u,u._model),u.castToggle=u._castController.castToggle.bind(u._castController)});var c=i.setup();this.once("ready",c.onReady,this),o.getAdBlock=c.checkAdBlock},e}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(93),n(20),n(1),n(2),n(81),n(174),n(51)],r=function(e,t,i,r,o,a,s){function l(e,t,n){if(t){var i=t.client;delete t.client,/\.(js|swf)$/.test(i||"")||(i=o.repo()+n),e[i]=t}}function u(e,n){var r=i.clone(n.get("plugins"))||{},a=n.get("edition"),s=t(a),u=/^(vast|googima|freewheel)$/,c=/\.(js|swf)$/,d=o.repo(),p=i.clone(n.get("advertising"));if(s("ads")&&p&&(c.test(p.client)?r[p.client]=p:u.test(p.client)&&(r[d+p.client+".js"]=p),delete p.client),s("jwpsrv")){var h=n.get("analytics");i.isObject(h)||(h={}),l(r,h,"jwpsrv.js")}l(r,n.get("ga"),"gapro.js"),l(r,n.get("sharing"),"sharing.js");var f=n.get("related"),g=i.isObject(f),m=n.get("visualplaylist")!==!1||g;g||(f={disableRelated:!0}),f.showDockButton=m,l(r,f,"related.js"),n.set("plugins",r),e()}function c(t,i){var s=i.get("key")||window.jwplayer&&window.jwplayer.key,l=new e(s),u=l.edition();if(i.set("key",s),i.set("edition",u),"unlimited"===u){var c=r.getScriptPath("jwplayer.js");if(!c)return void a.error(t,"Error setting up player","Could not locate jwplayer.js script tag");n.p=c,r.repo=o.repo=o.loadFrom=function(){return c}}i.updateProviders(),"invalid"===u?a.error(t,"Error setting up player",(void 0===s?"Missing":"Invalid")+" license key"):t()}function d(e,t){s.containsDrm(t)?s.probe(e,t.get("edition")):e()}function p(){var e=a.getQueue();return e.CHECK_KEY={method:c,depends:["LOADED_POLYFILLS"]},e.PROBE_DRM_SUPPORT={method:d,depends:["CHECK_KEY"]},e.FILTER_PLUGINS={method:u,depends:["CHECK_KEY"]},e.FILTER_PLAYLIST.depends.push("PROBE_DRM_SUPPORT"),e.LOAD_PLUGINS.depends.push("FILTER_PLUGINS"),e.SETUP_VIEW.depends.push("CHECK_KEY"),e}return{getQueue:p}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(176),n(212),n(1)],r=function(e,t,n){var i=window,r=n.extend(e,t);return"function"==typeof i.define&&i.define.amd&&i.define([],function(){return r}),i.jwplayer?i.jwplayer:r}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[],r=function(){function e(){var e=document.createElement("div");return e.className=n,e.innerHTML="&nbsp;",e.style.width="1px",e.style.height="1px",e.style.position="absolute",e.style.background="transparent",e}function t(){function t(){var e=this,t=e._view.element();t.appendChild(a),r=!0,i()&&e.trigger("adBlock")}function i(){return!!r&&(!!o||(""!==a.innerHTML&&a.className===n&&null!==a.offsetParent&&0!==a.clientHeight||(o=!0),o))}var r=!1,o=!1,a=e();return{onReady:t,checkAdBlock:i}}var n="afs_ads";return{setup:t}}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(2),n(4),n(9),n(3),n(1),n(136)],r=function(e,t,n,i,r,o){var a=function(e){this.model=e,this.setup()};return r.extend(a.prototype,i,{setup:function(){this.destroy(),this.skipMessage=this.model.get("skipText"),this.skipMessageCountdown=this.model.get("skipMessage"),this.setWaitTime(this.model.get("skipOffset"));var t=o();this.el=e.createElement(t),this.skiptext=this.el.getElementsByClassName("jw-skiptext")[0],this.skipAdOnce=r.once(this.skipAd.bind(this)),new n(this.el).on("click tap",r.bind(function(){this.skippable&&this.skipAdOnce()},this)),this.model.on("change:duration",this.onChangeDuration,this),this.model.on("change:position",this.onChangePosition,this),this.onChangeDuration(this.model,this.model.get("duration")),this.onChangePosition(this.model,this.model.get("position"))},updateMessage:function(e){this.skiptext.innerHTML=e},updateCountdown:function(e){this.updateMessage(this.skipMessageCountdown.replace(/xx/gi,Math.ceil(this.waitTime-e)))},onChangeDuration:function(t,n){if(n){if(this.waitPercentage){if(!n)return;this.itemDuration=n,this.setWaitTime(this.waitPercentage),delete this.waitPercentage}e.removeClass(this.el,"jw-hidden")}},onChangePosition:function(t,n){this.waitTime-n>0?this.updateCountdown(n):(this.updateMessage(this.skipMessage),this.skippable=!0,e.addClass(this.el,"jw-skippable"))},element:function(){return this.el},setWaitTime:function(t){if(r.isString(t)&&"%"===t.slice(-1)){var n=parseFloat(t);return void(this.itemDuration&&!isNaN(n)?this.waitTime=this.itemDuration*n/100:this.waitPercentage=t)}r.isNumber(t)?this.waitTime=t:"string"===e.typeOf(t)?this.waitTime=e.seconds(t):isNaN(Number(t))?this.waitTime=0:this.waitTime=Number(t)},skipAd:function(){this.trigger(t.JWPLAYER_AD_SKIPPED)},destroy:function(){this.el&&(this.el.removeEventListener("click",this.skipAdOnce),this.el.parentElement&&this.el.parentElement.removeChild(this.el)),delete this.skippable,delete this.itemDuration,delete this.waitPercentage}}),a}.apply(t,i),!(void 0!==r&&(e.exports=r))},function(e,t,n){var i,r;i=[n(206),n(1)],r=function(e,t){var n=function(){};return t.extend(n.prototype,e.prototype,{buildArray:function(){var t=e.prototype.buildArray.apply(this,arguments);if(this.model.get("abouttext")){t.items[0].showLogo=!1,t.items.push(t.items.shift());var n={title:this.model.get("abouttext"),link:this.model.get("aboutlink")||t.items[0].link};t.items.unshift(n)}return t}}),n}.apply(t,i),!(void 0!==r&&(e.exports=r))}]);
document.addEventListener("turbolinks:load", function(){

$(".channels.show").ready(function(){

console.log('video_player.js');

	function resize(){
		// make video size based on screen size
		// also adjust chat height while we're at it

		var full = window.matchMedia("(min-width: 1660px)");
		var memium = window.matchMedia("(min-width: 1350px)");
		var low = window.matchMedia("(min-width: 1030px)");

		if(full.matches){
			// full settings
			var w = 1280;
			$('#chat').css("height","720px");
			$('#comments').css("height","650px");
		}else if(memium.matches){
			// medium settings
			var w = 960;
			$('#chat').css("height","540px");
			$('#comments').css("height","470px");
		}else if(low.matches){
			// low settings
			var w = 640;
			$('#chat').css("height","360px");
			$('#comments').css("height","290px");
		}else{
			// chat collapses below, let's make it bigger then?
			var w = 640;
			$('#chat').css("height","520px");
			$('#chat').css("margin-bottom","50px");
			$('#comments').css("height","450px");
		}

		var secret = $('#secret').val();

		// the jwplayer player
		var playerInstance = jwplayer("stream");

		playerInstance.setup({
			file: `rtmp://192.168.1.28:1935/live/flv:${secret}`,
			width: w,
			height: w*9/16,
			primary: "flash",
			autostart: true,
			controls: true,
			stretching: "exactfit",
		}); 
	}

	// on window resize we can change the video player and chat size
	$(window).resize(function(){
		console.log('window is being resized');
		resize();
	})
	
	resize();

});

});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (https://getbootstrap.com/customize/?id=a32e0919bfd9d23820be83f072055678)
 * Config saved to config.json and https://gist.github.com/a32e0919bfd9d23820be83f072055678
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.alert");n||i.data("bs.alert",n=new o(this)),"string"==typeof e&&n[e].call(i)})}var i='[data-dismiss="alert"]',o=function(e){t(e).on("click",i,this.close)};o.VERSION="3.3.7",o.TRANSITION_DURATION=150,o.prototype.close=function(e){function i(){a.detach().trigger("closed.bs.alert").remove()}var n=t(this),s=n.attr("data-target");s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var a=t("#"===s?[]:s);e&&e.preventDefault(),a.length||(a=n.closest(".alert")),a.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(a.removeClass("in"),t.support.transition&&a.hasClass("fade")?a.one("bsTransitionEnd",i).emulateTransitionEnd(o.TRANSITION_DURATION):i())};var n=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=o,t.fn.alert.noConflict=function(){return t.fn.alert=n,this},t(document).on("click.bs.alert.data-api",i,o.prototype.close)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.button"),s="object"==typeof e&&e;n||o.data("bs.button",n=new i(this,s)),"toggle"==e?n.toggle():e&&n.setState(e)})}var i=function(e,o){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,o),this.isLoading=!1};i.VERSION="3.3.7",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(e){var i="disabled",o=this.$element,n=o.is("input")?"val":"html",s=o.data();e+="Text",null==s.resetText&&o.data("resetText",o[n]()),setTimeout(t.proxy(function(){o[n](null==s[e]?this.options[e]:s[e]),"loadingText"==e?(this.isLoading=!0,o.addClass(i).attr(i,i).prop(i,!0)):this.isLoading&&(this.isLoading=!1,o.removeClass(i).removeAttr(i).prop(i,!1))},this),0)},i.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var o=t.fn.button;t.fn.button=e,t.fn.button.Constructor=i,t.fn.button.noConflict=function(){return t.fn.button=o,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var o=t(i.target).closest(".btn");e.call(o,"toggle"),t(i.target).is('input[type="radio"], input[type="checkbox"]')||(i.preventDefault(),o.is("input,button")?o.trigger("focus"):o.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.carousel"),s=t.extend({},i.DEFAULTS,o.data(),"object"==typeof e&&e),a="string"==typeof e?e:s.slide;n||o.data("bs.carousel",n=new i(this,s)),"number"==typeof e?n.to(e):a?n[a]():s.interval&&n.pause().cycle()})}var i=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=600,i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},i.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e),o="prev"==t&&0===i||"next"==t&&i==this.$items.length-1;if(o&&!this.options.wrap)return e;var n="prev"==t?-1:1,s=(i+n)%this.$items.length;return this.$items.eq(s)},i.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",this.$items.eq(t))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function(){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,o){var n=this.$element.find(".item.active"),s=o||this.getItemForDirection(e,n),a=this.interval,r="next"==e?"left":"right",l=this;if(s.hasClass("active"))return this.sliding=!1;var h=s[0],d=t.Event("slide.bs.carousel",{relatedTarget:h,direction:r});if(this.$element.trigger(d),!d.isDefaultPrevented()){if(this.sliding=!0,a&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var p=t(this.$indicators.children()[this.getItemIndex(s)]);p&&p.addClass("active")}var c=t.Event("slid.bs.carousel",{relatedTarget:h,direction:r});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,n.addClass(r),s.addClass(r),n.one("bsTransitionEnd",function(){s.removeClass([e,r].join(" ")).addClass("active"),n.removeClass(["active",r].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(c)},0)}).emulateTransitionEnd(i.TRANSITION_DURATION)):(n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(c)),a&&this.cycle(),this}};var o=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function(){return t.fn.carousel=o,this};var n=function(i){var o,n=t(this),s=t(n.attr("data-target")||(o=n.attr("href"))&&o.replace(/.*(?=#[^\s]+$)/,""));if(s.hasClass("carousel")){var a=t.extend({},s.data(),n.data()),r=n.attr("data-slide-to");r&&(a.interval=!1),e.call(s,a),r&&s.data("bs.carousel").to(r),i.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",n).on("click.bs.carousel.data-api","[data-slide-to]",n),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var i=t(this);e.call(i,i.data())})})}(jQuery),+function(t){"use strict";function e(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var o=i&&t(i);return o&&o.length?o:e.parent()}function i(i){i&&3===i.which||(t(n).remove(),t(s).each(function(){var o=t(this),n=e(o),s={relatedTarget:this};n.hasClass("open")&&(i&&"click"==i.type&&/input|textarea/i.test(i.target.tagName)&&t.contains(n[0],i.target)||(n.trigger(i=t.Event("hide.bs.dropdown",s)),i.isDefaultPrevented()||(o.attr("aria-expanded","false"),n.removeClass("open").trigger(t.Event("hidden.bs.dropdown",s)))))}))}function o(e){return this.each(function(){var i=t(this),o=i.data("bs.dropdown");o||i.data("bs.dropdown",o=new a(this)),"string"==typeof e&&o[e].call(i)})}var n=".dropdown-backdrop",s='[data-toggle="dropdown"]',a=function(e){t(e).on("click.bs.dropdown",this.toggle)};a.VERSION="3.3.7",a.prototype.toggle=function(o){var n=t(this);if(!n.is(".disabled, :disabled")){var s=e(n),a=s.hasClass("open");if(i(),!a){"ontouchstart"in document.documentElement&&!s.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",i);var r={relatedTarget:this};if(s.trigger(o=t.Event("show.bs.dropdown",r)),o.isDefaultPrevented())return;n.trigger("focus").attr("aria-expanded","true"),s.toggleClass("open").trigger(t.Event("shown.bs.dropdown",r))}return!1}},a.prototype.keydown=function(i){if(/(38|40|27|32)/.test(i.which)&&!/input|textarea/i.test(i.target.tagName)){var o=t(this);if(i.preventDefault(),i.stopPropagation(),!o.is(".disabled, :disabled")){var n=e(o),a=n.hasClass("open");if(!a&&27!=i.which||a&&27==i.which)return 27==i.which&&n.find(s).trigger("focus"),o.trigger("click");var r=" li:not(.disabled):visible a",l=n.find(".dropdown-menu"+r);if(l.length){var h=l.index(i.target);38==i.which&&h>0&&h--,40==i.which&&h<l.length-1&&h++,~h||(h=0),l.eq(h).trigger("focus")}}}};var r=t.fn.dropdown;t.fn.dropdown=o,t.fn.dropdown.Constructor=a,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=r,this},t(document).on("click.bs.dropdown.data-api",i).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,a.prototype.toggle).on("keydown.bs.dropdown.data-api",s,a.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",a.prototype.keydown)}(jQuery),+function(t){"use strict";function e(e,o){return this.each(function(){var n=t(this),s=n.data("bs.modal"),a=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);s||n.data("bs.modal",s=new i(this,a)),"string"==typeof e?s[e](o):a.show&&s.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),n&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});n?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger("focus").trigger(s)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var o=t(this),n=o.attr("href"),s=t(o.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),a=s.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},s.data(),o.data());o.is("a")&&i.preventDefault(),s.one("show.bs.modal",function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",function(){o.is(":visible")&&o.trigger("focus")})}),e.call(s,a,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.tooltip"),s="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||o.data("bs.tooltip",n=new i(this,s)),"string"==typeof e&&n[e]())})}var i=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};i.VERSION="3.3.7",i.TRANSITION_DURATION=150,i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,o){if(this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(o),this.$viewport=this.options.viewport&&t(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),s=n.length;s--;){var a=n[s];if("click"==a)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=a){var r="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,o){i[t]!=o&&(e[t]=o)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusin"==e.type?"focus":"hover"]=!0),i.tip().hasClass("in")||"in"==i.hoverState?void(i.hoverState="in"):(clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show())},i.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusout"==e.type?"focus":"hover"]=!1),i.isInStateTrue()?void 0:(clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide())},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var o=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!o)return;var n=this,s=this.tip(),a=this.getUID(this.type);this.setContent(),s.attr("id",a),this.$element.attr("aria-describedby",a),this.options.animation&&s.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(r);h&&(r=r.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var d=this.getPosition(),p=s[0].offsetWidth,c=s[0].offsetHeight;if(h){var f=r,u=this.getPosition(this.$viewport);r="bottom"==r&&d.bottom+c>u.bottom?"top":"top"==r&&d.top-c<u.top?"bottom":"right"==r&&d.right+p>u.width?"left":"left"==r&&d.left-p<u.left?"right":r,s.removeClass(f).addClass(r)}var g=this.getCalculatedOffset(r,d,p,c);this.applyPlacement(g,r);var v=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",v).emulateTransitionEnd(i.TRANSITION_DURATION):v()}},i.prototype.applyPlacement=function(e,i){var o=this.tip(),n=o[0].offsetWidth,s=o[0].offsetHeight,a=parseInt(o.css("margin-top"),10),r=parseInt(o.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(r)&&(r=0),e.top+=a,e.left+=r,t.offset.setOffset(o[0],t.extend({using:function(t){o.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),o.addClass("in");var l=o[0].offsetWidth,h=o[0].offsetHeight;"top"==i&&h!=s&&(e.top=e.top+s-h);var d=this.getViewportAdjustedDelta(i,e,l,h);d.left?e.left+=d.left:e.top+=d.top;var p=/top|bottom/.test(i),c=p?2*d.left-n+l:2*d.top-s+h,f=p?"offsetWidth":"offsetHeight";o.offset(e),this.replaceArrow(c,o[0][f],p)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(e){function o(){"in"!=n.hoverState&&s.detach(),n.$element&&n.$element.removeAttr("aria-describedby").trigger("hidden.bs."+n.type),e&&e()}var n=this,s=t(this.$tip),a=t.Event("hide.bs."+this.type);return this.$element.trigger(a),a.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",o).emulateTransitionEnd(i.TRANSITION_DURATION):o(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],o="BODY"==i.tagName,n=i.getBoundingClientRect();null==n.width&&(n=t.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var s=window.SVGElement&&i instanceof window.SVGElement,a=o?{top:0,left:0}:s?null:e.offset(),r={scroll:o?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},l=o?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},n,r,l,a)},i.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},i.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),e?(i.inState.click=!i.inState.click,i.isInStateTrue()?i.enter(i):i.leave(i)):i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var o=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=o,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.popover"),s="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||o.data("bs.popover",n=new i(this,s)),"string"==typeof e&&n[e]())})}var i=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");i.VERSION="3.3.7",i.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),i.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),i.prototype.constructor=i,i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},i.prototype.hasContent=function(){return this.getTitle()||this.getContent()},i.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var o=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=i,t.fn.popover.noConflict=function(){return t.fn.popover=o,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.tab");n||o.data("bs.tab",n=new i(this)),"string"==typeof e&&n[e]()})}var i=function(e){this.element=t(e)};i.VERSION="3.3.7",i.TRANSITION_DURATION=150,i.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),o=e.data("target");if(o||(o=e.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=i.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),a=t.Event("show.bs.tab",{relatedTarget:n[0]});if(n.trigger(s),e.trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){var r=t(o);this.activate(e.closest("li"),i),this.activate(r,r.parent(),function(){n.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:n[0]})})}}},i.prototype.activate=function(e,o,n){function s(){a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var a=o.find("> .active"),r=n&&t.support.transition&&(a.length&&a.hasClass("fade")||!!o.find("> .fade").length);a.length&&r?a.one("bsTransitionEnd",s).emulateTransitionEnd(i.TRANSITION_DURATION):s(),a.removeClass("in")};var o=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=i,t.fn.tab.noConflict=function(){return t.fn.tab=o,this};var n=function(i){i.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',n).on("click.bs.tab.data-api",'[data-toggle="pill"]',n)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.affix"),s="object"==typeof e&&e;n||o.data("bs.affix",n=new i(this,s)),"string"==typeof e&&n[e]()})}var i=function(e,o){this.options=t.extend({},i.DEFAULTS,o),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};i.VERSION="3.3.7",i.RESET="affix affix-top affix-bottom",i.DEFAULTS={offset:0,target:window},i.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return i>n?"top":!1;if("bottom"==this.affixed)return null!=i?n+this.unpin<=s.top?!1:"bottom":t-o>=n+a?!1:"bottom";var r=null==this.affixed,l=r?n:s.top,h=r?a:e;return null!=i&&i>=n?"top":null!=o&&l+h>=t-o?"bottom":!1},i.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(i.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},i.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},i.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=this.$element.height(),o=this.options.offset,n=o.top,s=o.bottom,a=Math.max(t(document).height(),t(document.body).height());"object"!=typeof o&&(s=n=o),"function"==typeof n&&(n=o.top(this.$element)),"function"==typeof s&&(s=o.bottom(this.$element));var r=this.getState(a,e,n,s);if(this.affixed!=r){null!=this.unpin&&this.$element.css("top","");var l="affix"+(r?"-"+r:""),h=t.Event(l+".bs.affix");if(this.$element.trigger(h),h.isDefaultPrevented())return;this.affixed=r,this.unpin="bottom"==r?this.getPinnedOffset():null,this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==r&&this.$element.offset({top:a-e-s})}};var o=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=i,t.fn.affix.noConflict=function(){return t.fn.affix=o,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var i=t(this),o=i.data();o.offset=o.offset||{},null!=o.offsetBottom&&(o.offset.bottom=o.offsetBottom),null!=o.offsetTop&&(o.offset.top=o.offsetTop),e.call(i,o)})})}(jQuery),+function(t){"use strict";function e(e){var i,o=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(o)}function i(e){return this.each(function(){var i=t(this),n=i.data("bs.collapse"),s=t.extend({},o.DEFAULTS,i.data(),"object"==typeof e&&e);!n&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),n||i.data("bs.collapse",n=new o(this,s)),"string"==typeof e&&n[e]()})}var o=function(e,i){this.$element=t(e),this.options=t.extend({},o.DEFAULTS,i),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};o.VERSION="3.3.7",o.TRANSITION_DURATION=350,o.DEFAULTS={toggle:!0},o.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},o.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,n=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(n&&n.length&&(e=n.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){n&&n.length&&(i.call(n,"hide"),e||n.data("bs.collapse",null));var a=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[a](""),this.transitioning=0,
this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return r.call(this);var l=t.camelCase(["scroll",a].join("-"));this.$element.one("bsTransitionEnd",t.proxy(r,this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l])}}}},o.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(o.TRANSITION_DURATION):n.call(this)}}},o.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},o.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(i,o){var n=t(o);this.addAriaAndCollapsedClass(e(n),n)},this)).end()},o.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var n=t.fn.collapse;t.fn.collapse=i,t.fn.collapse.Constructor=o,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(o){var n=t(this);n.attr("data-target")||o.preventDefault();var s=e(n),a=s.data("bs.collapse"),r=a?"toggle":n.data();i.call(s,r)})}(jQuery),+function(t){"use strict";function e(i,o){this.$body=t(document.body),this.$scrollElement=t(t(i).is(document.body)?window:i),this.options=t.extend({},e.DEFAULTS,o),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function i(i){return this.each(function(){var o=t(this),n=o.data("bs.scrollspy"),s="object"==typeof i&&i;n||o.data("bs.scrollspy",n=new e(this,s)),"string"==typeof i&&n[i]()})}e.VERSION="3.3.7",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,i="offset",o=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(i="position",o=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),n=e.data("target")||e.attr("href"),s=/^#./.test(n)&&t(n);return s&&s.length&&s.is(":visible")&&[[s[i]().top+o,n]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=o)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(void 0===n[t+1]||e<n[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',o=t(i).parents("li").addClass("active");o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var o=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=o,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one("bsTransitionEnd",function(){i=!0});var n=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(n,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//








;
