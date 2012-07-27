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

var  rtl=false
   , cellMargin=2.835
   , lineWidth=0.57
   , rowHeight=6;
 

// inspired by fpdf/tcpdf
jsPDFAPI.cell = function(args) {
	'use strict'

    var a = {}
        , k = this.internal.scaleFactor;

    a.width = args.width || 0;
    a.height = args.height || 0;
    a.txt = args.txt || '';
    a.border = args.border || 0;
    a.ln = args.ln || 0;
    a.align = args.align || '';
    a.fill = args.fill || 0;
    a.link = args.link || '';
    a.stretch = args.stretch || 0;
    a.fontSize = args.fontSize || this.internal.getFontSize();
    
    if (a.width === 0) { // if the width is 0 we set the width to the rest of the page
        if(rtl) {
            a.width = this.getX() - lMargin;
        } else {
            a.width = this.internal.pageSize.width - rMargin - this.getX();
        }
    }

    if (a.fill == 1 || a.border == 1) {
        var style = [];
        if (a.fill == 1) {
            style.push('F');
        }
        if (a.border == 1) {
            style.push('D')
        }
        var xk = this.getX();
        if(rtl) {
            xk = xk - a.width;
        }
        this.rect( xk, this.getY(), a.width, a.height, style.join('') )
    }

    if (a.border !== 0) {

        if (typeof(a.border) == "string") {
            a.border = {};
            a.border[a.border] = 1;
        }

        var bcn = '';
        for (bcn in a.border) {
            var bci = '';
            this.setLineWidth(lineWidth/k * a.border[bcn]);
            for (bci in bcn) {
                var cpos = ({'T':0,'R':1,'B':2,'L':3})[bci];
                this.line(this.getX()+(((cpos+1)%4)>1?a.width:0)
                        , this.getY()+(((cpos+0)%4)>1?a.height:0)
                        , this.getX()+(((cpos+2)%4)>1?a.width:0)
                        , this.getY()+(((cpos+1)%4)>1?a.height:0)
                )
            }
        }
        this.setLineWidth(lineWidth/k);
    }

    if ( a.txt && typeof(a.txt) == typeof(" ") && a.txt.length > 0 ) {
        var width = a.fontSize * this.getStringUnitWidth(a.txt) / k
        // ratio between cell lenght and text lenght
          , ratio = (a.width - (2 * cellMargin/k)) / width
          , dx = (
            function(align) {
                return align == 'C' && (a.width - width)/2
                    || align == 'L' && cellMargin/k
                    || align == 'R' && a.width - width - cellMargin/k
                    || align == 'J' && cellMargin/k
                    || 0
            })(a.align);

        if (rtl) {
            dx = a.width - width - dx;
        }

        console.log([this.getX(),dx,a.txt]);
        this.text( this.getX() + dx , this.getY() + (a.height/2) + (.36 * this.internal.getFontSize()), a.txt );

    }
    this.setX(this.getX() + a.width);

	return this 
}

jsPDFAPI.dataTable = function(columns, data, options) {

    var that = this;

    options = options || {};
    options = {
        rowheight: options.rowheight || 6
    }

    columns.forEach(function(col) {

        col.h = options.rowheight;

        function c() {this.txt = col.title};
        c.prototype = col;
        that.cell(new c());
    });
    that.ln();

    data.forEach(function(row) {
        columns.forEach(function(col) {
            var c = function() {};
            c.prototype = col;
        
            var ci = new c();


            if ( 'value' in col ) {
                ci.txt = row[col.value] || ci.txt || '';
            }

            that.cell(ci);
        });
        that.ln();
    });

}


})(jsPDF.API)
