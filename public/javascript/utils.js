(function($) {
  $.fn.initBsTable = function(options) {
    var settings = $.extend(
      {
        url: "",
        method: "get",
        toolbar: "#toolbar",
        striped: true,
        cache: false,
        pagination: true,
        sortable: true,
        sortOrder: "asc",
        queryParams: function(params) {
          return {
            limit: params.limit,
            offset: params.offset,
            order: params.order,
            sort: params.sort || "id"
          };
        },
        sidePagination: "client",
        pageNumber: 1,
        pageSize: 50,
        pageList: [20, 50, 100],
        search: false,
        strictSearch: true,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        clickToSelect: true,
        uniqueId: "",
        // showToggle: true,
        cardView: false,
        detailView: false,
        showPaginationSwitch: false,
        resizable: true,
        columns: ""
      },
      options
    );
    var $this = $(this);
    $this.bootstrapTable(settings);
  };

  $.formSubmit = function(form, url) {
    var $form = $(form);
    $.ajax({
      type: $form.attr("method"),
      url: $form.attr("action"),
      data: $form.serialize(),
      timeout: 30000,
      success: function(data) {
        toastr.success("Success");
        setTimeout(function() {
          window.location = url;
        }, 800);
      },
      error: function(err) {
        if(err.responseJSON.msg){
          toastr.error(err.responseJSON.msg);
        }
        else{
          toastr.error("Failure");
        }
      }
    });
  };

  $.FileUpload = function(options) {
    var settings = $.extend(
      {
        formData: "",
        url: "",
        cb: function() {}
      },
      options
    );
    $.ajax({
      type: "POST",
      url: settings.url,
      data: settings.formData,
      // async: false,
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function() {
        toastr.info("Uploading...");
      },
      success: function(data) {
        toastr.success("Success");
        settings.cb();
        setTimeout(function() {
          window.location.reload();
        }, 800);
      },
      error: function(err) {
        toastr.error("Failure");
        toastr.remove();
      }
    });
  };

  $.getURL = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  };

  $.throttle = function(fun) {
    if (fun.timeoutId) {
      clearTimeout(fun.timeoutId);
    }
    fun.timeoutId = setTimeout(function() {
      fun();
      fun.timeoutId = null;
    }, 1000);
  };
  
  $.fn.bindSelect = function(options) {
    var $this = $(this);
    var settings = $.extend(
      {
        url: "",
        init: "",
        multiple: false,
        allowClear: false
      },
      options
    );
    $this.select2({
      selectOnClose: false,
      closeOnSelect: true,
      multiple: settings.multiple,
      allowClear: settings.allowClear,
      templateResult: function(data) {
        return data.text;
      },
      templateSelection: function(data) {
        return data.text;
      },
      escapeMarkup: function(markup) {
        return markup;
      }
    });
    $.getJSON(settings.url, function(data) {
      $this.empty();
      settings.init($this, data);
    });
  };

  $.fn.initPicker = function() {
    var $this = $(this);
    $this.daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      locale: {
        format: "YYYY-MM-DD"
      },
      drops: "up"
    });
  };
})(jQuery);
