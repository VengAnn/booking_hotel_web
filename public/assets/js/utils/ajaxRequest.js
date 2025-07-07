function ajaxRequest({ url, method = 'POST', data = {}, headers = {}, success, error }) {
    const isFormData = data instanceof FormData;

    $.ajax({
        url: url,
        method: method.toUpperCase(),
        data: isFormData ? data : JSON.stringify(data),
        contentType: isFormData ? false : 'application/json',
        processData: !isFormData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            ...headers
        },
        success: function (res) {
            if (typeof success === 'function') success(res);
        },
        error: function (xhr) {
            let message = "Lỗi máy chủ hoặc không xác định.";

            if (xhr.responseJSON) {
                message = xhr.responseJSON.message || message;
                // Laravel validation errors
                if (xhr.responseJSON.errors) {
                    const errorList = Object.values(xhr.responseJSON.errors).flat();
                    message = errorList.join('\n');
                }
            } else if (xhr.responseText) {
                message = xhr.responseText;
            }

            console.error('AJAX Error:', message);
            if (typeof error === 'function') error({ message, raw: xhr });
        }
    });
}
