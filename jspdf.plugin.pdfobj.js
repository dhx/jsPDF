/** ==================================================================== 
 * jsPDF pdfobj plugin
 * Copyright (c) 2012 Daniel Haag contact [AT] dhx.at
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */

(function(jsPDFAPI) {
'use strict'

jsPDFAPI.pdfObj = function(objcode,x,y,scalex,scaley) {
	'use strict'

    var out = this.internal.write
    , f3 = function(number) { return number.toFixed(3); }
    , k = this.internal.scaleFactor;

    out('q'); // Save current graphic state 

    out(      // first translate to x/y
        '1 0 0 1' 
      , f3(x*k)
      , f3(y*k)
      , 'cm'
    );

    out(      // then scale by scalex/scaley
        f3(scalex)
      , '0 0'
      , f3(scaley)
      , '0 0'
    );

    out(objcode);

    out('Q'); // restore previous graphic state
    

	// it is good practice to return ref to jsPDF instance to make 
	// the calls chainable. 
	return this 
}

})(jsPDF.API)
