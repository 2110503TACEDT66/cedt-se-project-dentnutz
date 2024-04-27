import Swal from "sweetalert2";

export const sweetAlert = (
<<<<<<< HEAD
  title: string,
  message: string,
  icon: "success" | "error" | "warning" | "info" | "question" = "success"
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    confirmButtonText: "👍 OK!",
  });
};

export const footerAlert = (
  title: string,
  message: string,
  icon: "success" | "error" | "warning" | "info" | "question" = "success",
  footer: string
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    footer: footer,
    confirmButtonText: "👍 OK!",
  });
};

export const confirmAlert = (
  title: string,
  message: string,
  icon: "success" | "error" | "warning" | "info" | "question" = "success",
  confirmMessage: string,
  confirmFunction: () => {}
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Confirm",
    cancelButtonText: "No, Cancel",
    preConfirm: confirmFunction,
  }).then((result) => {
    if (result.isConfirmed) {
      sweetAlert("Successfully", confirmMessage, "success");
    }
  });
};
=======
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success"
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: '👍 OK!',
    });
};

export const footerAlert = (
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success",
    footer: string,
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        footer: footer,
        confirmButtonText: '👍 OK!'
    })
}

export const confirmAlert = (
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success",
    confirmMessage: string,
    confirmFunction: () => {}
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm",
        cancelButtonText: "No, Cancel",
        preConfirm: confirmFunction
    }).then((result) => {
        if (result.isConfirmed) {
            sweetAlert("Successfully", confirmMessage, "success");
        }
    })
}
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
