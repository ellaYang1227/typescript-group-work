import Swal from "sweetalert2";

export const swalWithButtons = Swal.mixin({
  customClass: {
    confirmButton: "baseButton isStylePrimary",
    cancelButton: "baseButton isStyleSecondary",
  },
  buttonsStyling: false,
});
