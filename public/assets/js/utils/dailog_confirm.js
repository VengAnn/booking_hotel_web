function showConfirmDialog(options) {
    const sizeClass = {
        small: 'col-md-4',
        medium: 'col-md-6',
        large: 'col-md-8',
        full: 'col-md-12'
    };

    let countdown = options.autoCloseAfter || 0;
    let originalTitle = options.title || 'Xác nhận';

    const dialog = $.confirm({
        title: originalTitle,
        content: options.content || 'Bạn có chắc chắn thực hiện hành động này?',
        type: options.type || 'orange',
        icon: options.icon || 'fa fa-question-circle',
        columnClass: sizeClass[options.size] || 'col-md-6',
        draggable: options.draggable !== false, // default true
        closeIcon: options.closeIcon !== false, // default true
        backgroundDismiss: options.backgroundDismiss || false,

        buttons: {
            confirm: {
                text: options.confirmText || 'Đồng ý',
                btnClass: options.confirmBtnClass || 'btn-success',
                action: function () {
                    if (typeof options.onConfirm === 'function') {
                        return options.onConfirm.call(this); // support return false
                    }
                }
            },
            cancel: {
                text: options.cancelText || 'Hủy bỏ',
                btnClass: options.cancelBtnClass || 'btn-secondary',
                action: function () {
                    if (typeof options.onCancel === 'function') {
                        return options.onCancel.call(this);
                    }
                }
            }
        },

        onOpenBefore: function () {
            if (typeof options.onOpenBefore === 'function') {
                options.onOpenBefore.call(this);
            }
        },

        onOpen: function () {
            if (typeof options.onOpen === 'function') {
                options.onOpen.call(this);
            }
        },

        onContentReady: function () {
            if (typeof options.onContentReady === 'function') {
                options.onContentReady.call(this);
            }

            // Built-in countdown timer
            if (countdown > 0) {
                const interval = setInterval(() => {
                    countdown--;
                    this.setTitle(`${originalTitle} (${countdown}s)`);
                    if (countdown <= 0) {
                        clearInterval(interval);
                        this.close();
                    }
                }, 1000);
            }
        },

        onClose: function () {
            if (typeof options.onClose === 'function') {
                options.onClose.call(this);
            }
        },

        onDestroy: function () {
            if (typeof options.onDestroy === 'function') {
                options.onDestroy.call(this);
            }
        }
    });

    return dialog;
}
