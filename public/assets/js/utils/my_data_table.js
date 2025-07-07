/**
 * Example usage:
 *   MyDataTable('#roomTypeTable', 10, {
 *     searchContainer: '#roomTypeTableSearchControls',
 *     paginationContainer: '#roomTypeTablePaginationControls',
 *   });
 */
function MyDataTable(tableId, pageLength = 10, options = {}) {
    const $table = $(tableId);
    if (!$table.length) return null;

    if ($.fn.DataTable.isDataTable($table[0])) {
        $table.DataTable().clear().destroy();
    }

    return $table.DataTable({
        info: false,
        lengthChange: false,
        pageLength: pageLength,
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        language: {
            emptyTable: "Không có dữ liệu",
            paginate: {
                previous: "<i class='fas fa-arrow-left'></i>",
                next: "<i class='fas fa-arrow-right'></i>",
            },
        },
        initComplete: function () {
            const wrapper = $table.closest('.dataTables_wrapper');

            if (options.searchContainer) {
                const searchControls = wrapper.find('.dataTables_filter');
                $(options.searchContainer).empty().append(searchControls).css({
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: '12px',
                    width: '100%',
                });
            }

            if (options.paginationContainer) {
                const paginationControls = wrapper.find('.dataTables_paginate');
                $(options.paginationContainer).empty().append(paginationControls).css({
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: '12px',
                    width: '100%',
                });
            }
        },
    });
}
