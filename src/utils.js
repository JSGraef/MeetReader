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
  }

}