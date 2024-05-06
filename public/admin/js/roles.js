///roles
const buttonDeleteRole = document.querySelectorAll("[button-delete]");
if (buttonDeleteRole.length > 0) {
  buttonDeleteRole.forEach((button) => {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có muốn xóa sản phẩm này ko");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonPermission = document.querySelector("[button-submit]");
  buttonPermission.addEventListener("click", () => {
    let permission = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");

      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;

          permission.push({ id: id, permission: [] });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permission[index].permission.push(name);
          }
        });
      }
    });
    if (permission.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permissions"
      );

      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']"
      );
      inputPermissions.value = JSON.stringify(permission);
      formChangePermissions.submit();
    }
  });
}

const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");
  records.forEach((records, index) => {
    const permission = records.permissions;
    permission.forEach((permission) => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
