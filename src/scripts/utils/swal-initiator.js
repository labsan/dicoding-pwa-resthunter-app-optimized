import Swal from 'sweetalert2';

const INIT_SWAL_SUCCESS = (title) => {
  Swal.fire({
    title,
    toast: true,
    icon: 'success',
    confirmButtonText: 'Ok',
  });
};

const INIT_SWAL_ERROR = (title) => {
  Swal.fire({
    title,
    toast: true,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
};

export {INIT_SWAL_SUCCESS, INIT_SWAL_ERROR};
