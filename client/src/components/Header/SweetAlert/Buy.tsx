import "./Buy.css"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content';
import { useCart } from "../../Context";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);

export const Buy = () => {
  const { t } = useTranslation();
    const context = useCart();
    const swalWithBootstrapButtons = MySwal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
        //   buttonsStyling: false,
    });

    const sweetHandler = () => {
        swalWithBootstrapButtons.fire({
            title: t("AreYouSure"),
            text: t("YouConfirm"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("OfCourse"),
            cancelButtonText: t("Cancel"),
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: t("Completed"),
                text: t("Successfully"),
                icon: "success"
              });
              context?.removeAllProducts();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: t("Cancelled"),
                text: t("NotCompleted"),
                icon: "error"
              });
            }
          });
    }
  return (
    <div>
      <button className="button" onClick={sweetHandler}>{t("BuyProducts")}</button>
    </div>
  )
}
