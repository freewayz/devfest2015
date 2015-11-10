

(function(){


  var elem,
      // data-fn
      dataFn = $('[data-fn="contacts"]'),
      // data-url
      thisUrl = dataFn.data('url');


  if (typeof $.table_of_contacts == 'undefined')

    $.table_of_contacts = {};

  $.table_of_contacts.get = {

    init: function() {
      if(dataFn){
        this.getJson();
      }else{
        dataFn.html('No data found.');
      }
    },

    /* = Get data
    ------------------------*/
    getJson: function(url){

      var self = this;

      // loading data before
      dataFn.html('<span class="loading_table">'+
                  'Loading Please Wait ....'+
                  '</span>');

      // No ajax cache
      $.ajaxSetup({ cache: false });

      // Get json
      $.getJSON(thisUrl,function(data){

        // load template
        var out_html = self.tpl();

        $.each(data,function(i,obj){
          // load inner template
          out_html += self.tpl_inner(obj);

        });
        // close tag
        out_html += '</tbody>';
        // render templates
        dataFn.html(out_html);
        // error
      }).error(function(j,t,e){
        // render error.
        dataFn.html('<span class="error_table">'+
                    'Error = '+e+
                    '</span>');

      });
    },

    // head table template
    tpl: function(){
      var html = '<thead>'+
          '<tr>'+
          '<th>Speaker</th>'+
          '<th>Topic</th>'+
          '<th>From</th>'+
          '<th>To</th>'+
          '<th>Duration</th>'+
          '<th>Names</th>'+
          '</tr>'+
          '</thead>'+
          '<tbody >';
      return html;
    },
    // inner template
    tpl_inner: function(obj){

      var  html= '<tr>'+
          '<td class="user-photo">'+
          '<img class="user-tumb" src="'+obj.photo+'"/>'+
          '</td>'+
          '<td>'+obj.topic+'</td>'+
          '<td>'+obj.from+'</td>'+
          '<td>'+obj.to+'</td>'+
          '<td>'+obj.duration+'</td>'+
          '<td>'+obj.names +'<br/>'+obj.name2 +'</td>'+
          '</tr>';
      return html;
    }

  };

  // on ready render data
  $(document).ready(function() {
    $.table_of_contacts.get.init();
  });
})().call(this);