// implementing code splitting

const INIT_SWAL_SUCCESS = (title) => {
  import('sweetalert2')
      .then((module) => module.default)
      .then((swal) => {
        swal.fire({
          title,
          toast: true,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      })
      .catch((err) => console.error(err));
};

const INIT_SWAL_ERROR = (title) => {
  import('sweetalert2')
      .then((module) => module.default)
      .then((swal) => {
        swal.fire({
          title,
          toast: true,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      })
      .catch((err) => console.error(err));
};

export {INIT_SWAL_SUCCESS, INIT_SWAL_ERROR};
