/** ==================================================================== 
 * jsPDF relative_position plugin
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

    var pos = { x : 0, y : 0 };

    jsPDFAPI.getX = function() { return pos.x; }

    jsPDFAPI.setX = function(argx) { 
        'use strict'
        pos.x = argx>0 ? argx : this.internal.pageSize.width + argx; 
        return this;
    }

    jsPDFAPI.getY = function() { return pos.y; }

    jsPDFAPI.setY = function(argy) {
        'use strict'
        pos.y = argy>0 ? argy : this.internal.pageSize.width + argy;
        return this;
    }

})(jsPDF.API);

(function(jsPDFAPI) {

    var  margin=28.35
       , lMargin=margin/10
       , rMargin=margin/10
       , last_row_height = 8


    jsPDFAPI.ln = function(h) {
        this.setX(lMargin);
        if(!isNaN(h)) {
            last_row_height = h;
        }
        this.setY( this.getY() + last_row_height );
    }



})(jsPDF.API);







