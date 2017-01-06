module.exports = {
    getStrokeFromCode: function(code) {
    let stroke = '';
    switch(code) {
      case '1': stroke = 'Free'; break;
      case '2': stroke = 'Back'; break;
      case '3': stroke = 'Breast'; break;
      case '4': stroke = 'Fly'; break;
      case '5': stroke = 'IM'; break;
      case '6': stroke = 'Free Relay'; break;
      case '7': stroke = 'Medley Relay'; break;
      default: break;
    }
    return stroke;
  },

  timeDiff: function(time1, time2) {
    if(time1.includes('NT') || time2.includes('NT') || time2.includes('NS') || time1.includes('NS') )
        return "";

    const t1 = time1.split(':');
    const t2 = time2.split(':');

    let t1Total = 0;
    let t2Total = 0;

    if(t1.length > 1)
        t1Total = parseFloat(t1[1]) + parseFloat(t1[0]*60);
    else 
        t1Total = parseFloat(t1[0]);

    if(t2.length > 1)
        t2Total = parseFloat(t2[1]) + parseFloat(t2[0]*60);
    else 
        t2Total = parseFloat(t2[0]);

    const timeDiff = (t2Total - t1Total).toFixed(2);
    if( isNaN(timeDiff) )
        return '';

    return timeDiff;    
  },

  guid: function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}