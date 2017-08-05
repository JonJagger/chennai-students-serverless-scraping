$(document).ready(function() {

  let ipAddress = function() {
    // https://github.com/JonJagger/chennai-students-server
    return 'http://104.197.157.118';
  };

  let image = function(filename) {
    return $('<img>', {
      'class':'student',
      'title':filename.substring(0,filename.indexOf('.')),
      'src':`${ipAddress()}/img/${filename}`
     });
  };

  let tipped = function(node) {
    return node.tooltip({
      position: {
        my: 'center bottom-20',
        at: 'center top',
        using: function(position,feedback) {
          $(this).css(position);
          $('<div>')
            .addClass('arrow')
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
        }
      }
    });
  };

  $('#shuffle').click(function() {
    window.location.reload();
  });

  $.ajax({
    url: `${ipAddress()}/images/index?shuffled=true`,
    success: function(html){
      $(html).find('li').each(function() {
        let filename = $(this).text();
        let student = image(filename);
        $('students').append(tipped(student));
      });
    },
    error:function(xhr, textStatus, errorThrown) {
      alert('textStatus:'+textStatus);
    }
  });

});
