const successAlert = () => {
  const alert =  Swal.fire({
        title: title,
        icon: "success"
      });
      return alert;
}
export default successAlert