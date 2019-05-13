
function showHideRow(row) {
    var x = document.getElementById(row.id);
    var node = x.closest(".labels").nextElementSibling;
    if (node.style.display === "none") {
        node.style.display = "table-row-group";
    } else {
        node.style.display = "none";
    }
}