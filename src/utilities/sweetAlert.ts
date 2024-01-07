import Swal from "sweetalert2";

export const swalWithButtons = Swal.mixin({
  customClass: {
    confirmButton: "baseButton isStylePrimary",
    cancelButton: "baseButton isStyleSecondary",
  },
  confirmButtonText: "確定",
  cancelButtonText: "取消",
  buttonsStyling: false,
});


export const swalWithCheckButtons = Swal.mixin({
  customClass: {
    confirmButton: "baseButton isStylePrimary",
    cancelButton: "baseButton isStyleSecondary",
    actions: 'check-actions'
  },
  confirmButtonText: "確定",
  cancelButtonText: "取消",
  buttonsStyling: false,
});
