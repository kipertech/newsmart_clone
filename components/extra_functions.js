/* Shuffle all items in array randomly */
export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* Get the size of an object array */
export function getObjSize(_obj)
{
    //Calculate the size of the object
    var size = 0, key;
    for (key in _obj) {
        if (_obj.hasOwnProperty(key)) size++;
    }

    return size;
}

/* Compare 2 arrays */
export function compareArrays(a1, a2)
{
	// if the other array is a falsy value, return
    if (!a1 || !a2)
        return false;

    // compare lengths - can save a lot of time 
    if (a1.length != a2.length) 
        return false;

    for (var i = 0; i < a1.length; ++i) 
	{
        // Check if we have nested arrays
        if (a1[i] instanceof Array && a2[i] instanceof Array) 
		{
            // recurse into the nested arrays
            if (!a1[i].equals(a2[i]))
                return false;       
        }           
        else if (a1[i] != a2[i]) 
		{ 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
