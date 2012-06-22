/** ==================================================================== 
 * jsPDF table plugin
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

var  x=0
   , y=0
   , w
   , h
   , lMargin=0
   , rMargin=0
   , lasth=8
   , rtl=false
   , lineWidth=0.57/this.internal.scaleFactor;
 

jsPDFAPI.ln = function(h) {
    x = lMargin
    if(isNaN(h)) {
        y = y+lasth
    } else {
        y = y+h
    }
}

jsPDFAPI.getX = function() { return x; }

jsPDFAPI.setX = function(argx) { 
	'use strict'
    x = argx>0 ? argx : w+argx; 
    return this;
}

jsPDFAPI.getY = function() { return y; }

jsPDFAPI.setY = function(argy) {
	'use strict'
    y = argy>0 ? argy : h+argy;
    return this;
}


// inspired by fpdf/tcpdf
jsPDFAPI.cell = function(args) {
	'use strict'
    
    var a = {}
        , s = []
        , k = this.internal.scaleFactor
        , coord = this.internal.getCoordinateString
        , vcoord = this.internal.getVerticalCoordinateString
        , f2 = function(number) { return number.toFixed(2) };

    a.w = args.w || 0;
    a.h = args.h || 0;
    a.txt = args.txt || '';
    a.border = args.border || 0;
    a.ln = args.ln || 0;
    a.align = args.align || '';
    a.fill = args.fill || 0;
    a.link = args.link || '';
    a.stretch = args.stretch || 0;

    
    if (a.w == 0) { // if the width is 0 we set the width to the rest of the page
        if(rtl) {
            a.w = x - lMargin;
        } else {
            a.w = w - rMargin - x;
        }
    }

    if (a.fill == 1 || a.border == 1) {
        let style = [];
        if (a.fill == 1) {
            style.push('F');
        }
        if (a.border == 1) {
            style.push('D')
        }
        let xk = x;
        if(rtl) {
            xk = x - a.w;
        }
        this.rect(xk, y, a.w, a.h,style.join(''))
    }

    if (a.border !== 0) {

        if (typeof(a.border) == "string") {
            a.border = { a.border: 1 };
        }

        let bcn = '';
        for (bcn in a.border) {
            let bci = '';
            this.setLineWidth(lineWidth * a.border[bcn]);
            for (bci in bcn) {
                let cpos = ({'T':0,'R':1,'B':2,'L':3})[bci];
                this.line(x+(((cpos+1)%4)>1?a.w:0)
                        , y+(((cpos+0)%4)>1?a.h:0)
                        , x+(((cpos+2)%4)>1?a.w:0)
                        , y+(((cpos+1)%4)>1?a.h:0)
                )
            }
        }
        this.setLineWidth(lineWidth);
    }

	return this 
}



})(jsPDF.API)
