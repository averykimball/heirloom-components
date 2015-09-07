# heirloom-components
Treasured React components passed down through the generations.

TextProgress - A text-based progress indicator.
* scale - The number of characters to use for representation. The ratio is normalized against this.
* numerator - Numerical representation of the progress made.
* denominator - Numerical representation of progress remaining to be made.
* fulfilledStyle - A style object passed to the span containing the numerator-derived string.
* unfulfilledStyle - A style object passed to the span containing the denomenator-derived string.
* partialStyle - A style object passed to the span containing the remainder string.
* charset - The characters with which to represent the different parts of the progress indicator:
* -- fulfilled: A string that will portray a normalized portion of progress.
* -- unfulfilled: A string that will portray a normalized portion of remaining progress to be made.
* -- partial: A string that will portray the non-integer remainder of progress after normalizing against scale.

TextProgress has reasonable defaults- you could get some use out of it simply by manipulating the numerator property.
