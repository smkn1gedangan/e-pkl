import Swal from "sweetalert2";

export const AlertConfirm = (text, icon, cb, confirmBtn) => {
    Swal.fire({
        title: "Apakah Yakin?",
        text: `${text}!`,
        icon: `${icon}`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmBtn ?? "Ya, Hapus!",
    }).then((result) => {
        if (result.isConfirmed) {
            cb();
        }
    });
};

export const Alert = (text, icon, timer) => {
    Swal.fire({
        position: "top-end",
        icon: icon ? icon : "success",
        text: text,
        showConfirmButton: false,
        timer: timer ?? 2000,
        draggable: true,
        showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
        },
    });
};
