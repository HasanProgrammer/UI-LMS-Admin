"use strict";

$("#swal-1").click(function() {
	swal('نمایه شما با موفقیت تغییر یافت.');
});

$("#swal-2").click(function() {
	swal('پروفایل', 'نمایه شما با موفقیت تغییر یافت.', 'success');
});

$("#swal-3").click(function() {
	swal('پروفایل', 'شما باید عکس نمایه خود را تغییر دهید.', 'warning');
});

$("#swal-4").click(function() {
	swal('پروفایل', 'می توانید اطلاعات خود را در نمایه خود بررسی کنید.', 'info');
});

$("#swal-5").click(function() {
	swal('پروفایل', 'اشتباه وجود دارد', 'warning');
});

$("#swal-6").click(function() {
  swal({
      title: 'مطمئنی؟',
      text: 'پس از حذف ، دیگر قادر به بازیابی این پرونده نخواهید بود!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
      swal('پرونده شما حذف شده است!', {
        icon: 'success',
      });
      } else {
      swal('پرونده شما ایمن است!');
      }
    });
});

$("#swal-7").click(function() {
  swal({
    title: 'لطفا نام خود را پر کنید؟',
    content: {
    element: 'input',
    attributes: {
      placeholder: 'نام کاربری',
      type: 'text',
    },
    },
  }).then((data) => {
    swal('سلام, ' + data + '!');
  });
});

$("#swal-8").click(function() {
  swal('این مدال به زودی پنهان خواهد شد!', {
    buttons: false,
    timer: 3000,
  });
});